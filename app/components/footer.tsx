function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mb-16">
      {/* Newsletter Signup */}
      <div className="mt-8 mb-8">
        <p className="mb-2 text-neutral-600 dark:text-neutral-300 font-medium">
          Get notified on new posts
        </p>
        <form
          action="https://buttondown.com/api/emails/embed-subscribe/ossama"
          method="post"
          target="popupwindow"
          className="flex gap-2"
        >
          <input type="hidden" value="1" name="embed" />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            style={{ padding: '8px 14px' }}
            className="min-w-0 flex-auto appearance-none rounded-md border border-neutral-300 bg-white text-base text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-100 dark:focus:ring-neutral-100"
          />
          <button
            type="submit"
            style={{ padding: '8px 24px' }}
            className="flex-none rounded-md bg-neutral-900 text-base font-medium text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2">
          No spam. Ever. I will cherish and guard your email like a newborn baby. A beautiful doe.
        </p>
      </div>

      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">rss</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/ossa-ma"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">github</p>
          </a>
        </li>
      </ul>
    </footer>
  )
}
