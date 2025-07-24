import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/webriq-logo-lg.png"
          alt="WebriQ logo"
          width={75}
          height={75}
          priority
        />

        <h1 className="text-xl font-semibold">StackShift App Template</h1>

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              app/
            </code>
            directory.
          </li>
          <li className="mb-2 tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
          <li className="mb-2 tracking-[-.01em]">
            Read the{" "}
            <a
              className="bg-black/[.05] dark:bg-white/[.06] font-semibold"
              href="https://nextjs.org/docs/app/guides"
            >
              Next.js app router
            </a>{" "}
            guide.
          </li>
        </ol>
      </main>
    </div>
  );
}
