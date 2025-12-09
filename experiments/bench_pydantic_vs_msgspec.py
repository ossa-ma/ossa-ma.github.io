"""
Benchmark: msgspec vs Pydantic V2

Comparing performance for a typical web API scenario:
1. Simple flat model (User)
2. Nested complex model (E-commerce Order)

We test:
- msgspec (Structs)
- Pydantic V2 (BaseModel)
- Pydantic V2 Optimized (TypedDict + TypeAdapter)
"""

import datetime
import json
import random
import string
import timeit
import uuid
from typing import List
from typing_extensions import TypedDict

import msgspec
import pydantic


# --- Data Generators ---


def make_order_data():
    """Simulates a nested e-commerce order payload."""
    UTC = datetime.timezone.utc

    rand = random.Random(42)

    def randstr(min_len=5, max_len=10):
        length = rand.randint(min_len, max_len)
        return "".join(rand.choices(string.ascii_letters, k=length))

    def make_address():
        return {
            "street": f"{rand.randint(1, 999)} {randstr()} St",
            "city": randstr(),
            "state": randstr(2, 2).upper(),
            "zip": f"{rand.randint(10000, 99999)}",
        }

    def make_item():
        return {
            "id": str(uuid.uuid4()),
            "name": randstr(10, 20),
            "price": round(rand.uniform(10.0, 500.0), 2),
            "quantity": rand.randint(1, 5),
        }

    num_items = rand.randint(1, 10)

    return {
        "id": str(uuid.uuid4()),
        "created_at": datetime.datetime.now(UTC).isoformat(),
        "user": {"id": str(uuid.uuid4()), "name": randstr(), "email": f"{randstr()}@example.com"},
        "shipping_address": make_address(),
        "billing_address": make_address(),
        "items": [make_item() for _ in range(num_items)],
    }


def make_simple_data():
    """Simulates a simple flat user payload."""
    rand = random.Random(42)

    def randstr(min_len=5, max_len=10):
        length = rand.randint(min_len, max_len)
        return "".join(rand.choices(string.ascii_letters, k=length))

    return {"id": str(uuid.uuid4()), "name": randstr(), "email": f"{randstr()}@example.com"}


def bench(name, raw_data, dumps, loads, convert):
    # Setup: convert raw dict to the target object type (if needed)
    msg = convert(raw_data)

    # Verify roundtrip works (sanity check)
    json_data = dumps(msg)
    _ = loads(json_data)

    # Measure Encoding (Serialization)
    # Simulates sending a response
    timer = timeit.Timer("func(data)", setup="", globals={"func": dumps, "data": msg})
    n, t = timer.autorange()
    dumps_time = t / n

    # Measure Decoding (Validation)
    # Simulates parsing a request
    timer = timeit.Timer("func(data)", setup="", globals={"func": loads, "data": json_data})
    n, t = timer.autorange()
    loads_time = t / n

    return dumps_time, loads_time


# --- 1. msgspec ---


class AddressStruct(msgspec.Struct):
    street: str
    city: str
    state: str
    zip: str


class UserStruct(msgspec.Struct):
    id: uuid.UUID
    name: str
    email: str


class ItemStruct(msgspec.Struct):
    id: uuid.UUID
    name: str
    price: float
    quantity: int


class OrderStruct(msgspec.Struct):
    id: uuid.UUID
    created_at: datetime.datetime
    user: UserStruct
    shipping_address: AddressStruct
    billing_address: AddressStruct
    items: List[ItemStruct]


def bench_msgspec(data):
    enc = msgspec.json.Encoder()
    dec = msgspec.json.Decoder(OrderStruct)

    # msgspec needs Structs, not dicts
    def convert(data):
        return msgspec.convert(data, OrderStruct)

    return bench("msgspec (nested)", data, enc.encode, dec.decode, convert)


def bench_msgspec_simple(data):
    enc = msgspec.json.Encoder()
    dec = msgspec.json.Decoder(UserStruct)

    def convert(data):
        return msgspec.convert(data, UserStruct)

    return bench("msgspec (simple)", data, enc.encode, dec.decode, convert)


# --- 2. Pydantic V2 (Standard) ---


class AddressModel(pydantic.BaseModel):
    street: str
    city: str
    state: str
    zip: str


class UserModel(pydantic.BaseModel):
    id: uuid.UUID
    name: str
    email: pydantic.EmailStr


class SimpleUserModel(pydantic.BaseModel):
    id: uuid.UUID
    name: str
    email: str


class ItemModel(pydantic.BaseModel):
    id: uuid.UUID
    name: str
    price: float
    quantity: int


class OrderModel(pydantic.BaseModel):
    id: uuid.UUID
    created_at: datetime.datetime
    user: UserModel
    shipping_address: AddressModel
    billing_address: AddressModel
    items: List[ItemModel]


def bench_pydantic_v2(data):
    return bench(
        "pydantic v2 (nested)",
        data,
        lambda p: p.model_dump_json(),
        OrderModel.model_validate_json,
        lambda data: OrderModel(**data),
    )


def bench_pydantic_v2_simple(data):
    return bench(
        "pydantic v2 (simple)",
        data,
        lambda p: p.model_dump_json(),
        SimpleUserModel.model_validate_json,
        lambda data: SimpleUserModel(**data),
    )


# --- 3. Pydantic V2 Optimized (TypedDict + TypeAdapter) ---
# This is the "fast path" often recommended for Pydantic


class AddressDict(TypedDict):
    street: str
    city: str
    state: str
    zip: str


class UserDict(TypedDict):
    id: uuid.UUID
    name: str
    email: pydantic.EmailStr


class SimpleUserDict(TypedDict):
    id: uuid.UUID
    name: str
    email: str


class ItemDict(TypedDict):
    id: uuid.UUID
    name: str
    price: float
    quantity: int


class OrderDict(TypedDict):
    id: uuid.UUID
    created_at: datetime.datetime
    user: UserDict
    shipping_address: AddressDict
    billing_address: AddressDict
    items: List[ItemDict]


order_adapter = pydantic.TypeAdapter(OrderDict)
user_adapter = pydantic.TypeAdapter(SimpleUserDict)


def bench_pydantic_optimized(data):
    # For TypedDict, we need to simulate the "validated" state
    # by running validation once first.
    def convert(data):
        json_str = json.dumps(data).encode("utf-8")
        return order_adapter.validate_json(json_str)

    return bench(
        "pydantic v2 (opt, nested)",
        data,
        lambda d: order_adapter.dump_json(d),
        order_adapter.validate_json,
        convert,
    )


def bench_pydantic_optimized_simple(data):
    def convert(data):
        json_str = json.dumps(data).encode("utf-8")
        return user_adapter.validate_json(json_str)

    return bench(
        "pydantic v2 (opt, simple)",
        data,
        lambda d: user_adapter.dump_json(d),
        user_adapter.validate_json,
        convert,
    )


if __name__ == "__main__":
    print("Generating test data...")
    nested_data = make_order_data()
    simple_data = make_simple_data()

    print("\nRunning benchmarks (1000 iterations)...")
    results = []

    # Simple Tests
    print("\n--- Simple Structure (Flat User) ---")
    results.append(bench_msgspec_simple(simple_data))
    results.append(bench_pydantic_v2_simple(simple_data))
    results.append(bench_pydantic_optimized_simple(simple_data))

    # Nested Tests
    print("\n--- Nested Structure (Order) ---")
    results.append(bench_msgspec(nested_data))
    results.append(bench_pydantic_v2(nested_data))
    results.append(bench_pydantic_optimized(nested_data))

    # Format Results
    print(
        f"\n{'Library':<30} | {'Encode (us)':<12} | {'Decode (us)':<12} | {'Total (us)':<12} | {'vs msgspec':<10}"
    )
    print("-" * 90)

    # We know the order:
    # 0-2 are Simple (msgspec, pydantic, pydantic-opt)
    # 3-5 are Nested (msgspec, pydantic, pydantic-opt)

    names = [
        "msgspec (simple)",
        "pydantic v2 (simple)",
        "pydantic v2 (opt, simple)",
        "msgspec (nested)",
        "pydantic v2 (nested)",
        "pydantic v2 (opt, nested)",
    ]

    simple_baseline = results[0][0] + results[0][1]
    nested_baseline = results[3][0] + results[3][1]

    for i, (dumps, loads) in enumerate(results):
        name = names[i]
        total = dumps + loads

        baseline = simple_baseline if "simple" in name else nested_baseline
        factor = total / baseline

        print(
            f"{name:<30} | {dumps * 1e6:<12.2f} | {loads * 1e6:<12.2f} | {total * 1e6:<12.2f} | {factor:.1f}x"
        )
