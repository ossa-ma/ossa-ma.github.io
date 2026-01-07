import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'CV',
    description: 'Ossama Chaib - Software Engineer CV',
}

export default function CVPage() {
    return (
        <section>
            <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tighter mb-2">Ossama Chaib</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                    <a href="mailto:ossamachaib.cs@gmail.com" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
                        ossamachaib.cs@gmail.com
                    </a>
                    <span className="text-neutral-300 dark:text-neutral-700 select-none">•</span>
                    <a href="https://github.com/ossa-ma" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">
                        github.com/ossa-ma
                    </a>
                </div>
            </div>

            <div className="max-w-none">

                {/* Summary */}
                <div className="mb-8">
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                        Open to opportunities in software engineering and AI: from deep research roles to forward deployed engineering and customer facing roles. I genuinely believe I can do it all. Bonus experience in technical writing, research, and open source contribution, and an enthusiasm for product growth and user-centric development.
                    </p>
                </div>

                {/* Education */}
                <h3 className="font-medium text-lg mb-4 tracking-tight text-neutral-900 dark:text-neutral-100">Education</h3>
                <div className="mb-8">
                    <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Imperial College London</h4>
                        <span className="text-sm text-neutral-500 font-mono">June 2022</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">Master of Engineering (MEng) Computing - First-Class Honours</p>
                </div>

                {/* Experience */}
                <h3 className="font-medium text-lg mb-4 tracking-tight text-neutral-900 dark:text-neutral-100">Experience</h3>
                <div className="space-y-8 mb-8">

                    <div className='mb-2'>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Software Engineer</h4>
                            <span className="text-sm text-neutral-500 font-mono">Apr 2023 - May 2025</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">Fitch Group</p>
                        <ul className="list-disc list-outside ml-4 text-neutral-600 dark:text-neutral-300 space-y-1 text-sm">
                            <li>Led the design and development of Alpha, a Python-based asynchronous microservices system on AWS for large-scale model processing.</li>
                            <li>Enabled parallel processing of complex financial models across 1000+ concurrent tasks, scaling capacity by 5X, reducing computation from hours to minutes while cutting infrastructure costs.</li>
                            <li>Developed a robust API with FastAPI, handling bulk/streamed data transfer, OAuth-based authentication and authorization, rate limiting, and OpenAPI documentation.</li>
                            <li>Developed a multi-queue listening strategy for custom-priority model runs, optimizing Lambda capacity and reducing processing latency by 55%.</li>
                            <li>Enabled real-time status updates for synchronous model runs using Kafka.</li>
                            <li>Built CI/CD pipelines (Bamboo, Docker, Kubernetes) for microservices, integrating automated testing, multi-environment deployments, and security scans (Xray/Veracode).</li>
                            <li>Integrated Datadog for comprehensive observability and end-to-end request tracing, reducing MTTR by 70%.</li>
                            <li>Deployed Alpha across multiple environments with disaster recovery replicas via AWS CloudFormation, ensuring 98% uptime, geographical redundancy, isolated testing environments and regulatory compliance.</li>
                        </ul>
                    </div>

                    {/* Definitely a better way to do this than mb-2 everywhere */}
                    <div className='mb-2'>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Computer Science Teacher</h4>
                            <span className="text-sm text-neutral-500 font-mono">Apr 2025 - July 2025</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">Holland Park School</p>
                        <ul className="list-disc list-outside ml-4 text-neutral-600 dark:text-neutral-300 space-y-1 text-sm">
                            <li>Led instruction for GCSE and A-Level Computer Science, taking full ownership of lesson planning, material creation and assessment for multiple year groups.</li>
                            <li>Delivered workshops to students on practical software engineering practices, including version control, cloud computing, ML, prompt engineering, agile methodologies and cybersecurity.</li>
                            <li>Managed diverse classrooms, fostering high engagement and student growth.</li>
                        </ul>
                    </div>

                    <div className='mb-2'>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Data Scientist</h4>
                            <span className="text-sm text-neutral-500 font-mono">June - Sept 2021</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">Shell DSCoE</p>
                        <ul className="list-disc list-outside ml-4 text-neutral-600 dark:text-neutral-300 space-y-1 text-sm">
                            <li>Built a Python framework for causal inference in control systems.</li>
                            <li>Extended reinforcement learning frameworks (SK-Optimize, modAL) for internal use cases.</li>
                            <li>Accelerated data processing and model optimization using ML libraries (Numpy, OpenAI Gym, Tensorforce).</li>
                        </ul>
                    </div>

                    <div className='mb-2'>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Research Software Engineer</h4>
                            <span className="text-sm text-neutral-500 font-mono">June - Sept 2020</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">Imagination Tech</p>
                        <ul className="list-disc list-outside ml-4 text-neutral-600 dark:text-neutral-300 space-y-1 text-sm">
                            <li>Developed OpenCL programs to offload parallel texture decompression to GPUs.</li>
                            <li>Leveraged OpenGL for acceleration at runtime resulting in a 27% increase in processing speed.</li>
                            <li>Conducted research on emerging GPU trends to propose new improvements for future pipelines.</li>
                        </ul>
                    </div>

                </div>

                {/* Projects */}
                <h3 className="font-medium text-lg mb-4 tracking-tight text-neutral-900 dark:text-neutral-100">Projects</h3>
                <div className="space-y-8 mb-8">

                    <div className='mb-2'>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Gradient - AI-powered Teaching Assistant</h4>
                            <span className="text-sm text-neutral-500 font-mono">2025</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 text-neutral-600 dark:text-neutral-300 space-y-1 text-sm">
                            <li>Built Gradient, an AI-powered assessment platform that automates handwritten exam evaluation using multimodal LLMs (Gemini/Claude), piloted with early-adopter teachers reducing grading time by 79%.</li>
                            <li>Architected a distributed backend (AWS Lambda, Fargate, S3, FastAPI) processing 300+ student papers asynchronously, handling OCR, LLM inference, and result aggregation.</li>
                            <li>Designed an abstract agent framework supporting multiple LLM providers (Anthropic, Google) with dynamic model selection, structured output parsing, and resilient fallback mechanisms.</li>
                            <li>Created a full-stack education platform (Next.js, TypeScript, Supabase) with role-based access control, real-time class management, and student performance analytics.</li>
                            <li>Built predictive analytics and AI-powered curriculum tools: ML models forecast student performance, trigger teacher alerts for at-risk students, generate personalised assessments and class-wide performance insights.</li>
                            <li>Implemented LLM observability and evaluation infrastructure using Langfuse for trace-based monitoring and Pydantic Evals for automated model/prompt evaluation.</li>
                        </ul>
                    </div>

                    <div className='mb-2'>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">Bazaar - Ethereum Marketplace for Redeemable Fashion</h4>
                            <span className="text-sm text-neutral-500 font-mono">2022</span>
                        </div>
                        <ul className="list-disc list-outside ml-4 text-neutral-600 dark:text-neutral-300 space-y-1 text-sm">
                            <li>Deployed an Ethereum dApp to tackle e-commerce friction using NFTs for physical goods redemption.</li>
                            <li>Collaborated with designers and end-users to build a novel content creation and shopping experience.</li>
                            <li>Developed a JavaScript backend, secure Solidity smart contracts, and a React web app for listing, bidding, and redeeming NFTs for physical items.</li>
                            <li>Reduced gas fees by 40% for users and saved 45% in smart contract deployment costs.</li>
                        </ul>
                    </div>

                </div>

                {/* Skills */}
                <h3 className="font-medium text-lg mb-4 tracking-tight text-neutral-900 dark:text-neutral-100">Skills</h3>
                <div className="text-sm text-neutral-600 dark:text-neutral-300 space-y-2">
                    <p><strong className="font-medium text-neutral-900 dark:text-neutral-100">Programming Languages:</strong> Python, TypeScript, JavaScript, Solidity, Haskell, Elixir</p>
                    <p><strong className="font-medium text-neutral-900 dark:text-neutral-100">Technical:</strong> Python (aioboto, aiokafka, FastAPI, Numpy, Pandas, Pydantic), TypeScript (React, Next.js, zod), AWS (Lambda, Fargate, Step Functions, S3, DynamoDB, MSK, SQS, IAM, EC2, EKS), Databases (PostgreSQL, MongoDB, Supabase), ML (PyTorch, LangChain, llama-index, Tensorforce, LLMs, Langfuse), Linux, Figma.</p>
                    <p><strong className="font-medium text-neutral-900 dark:text-neutral-100">Languages:</strong> English, Arabic</p>
                </div>

            </div>
        </section>
    )
}
