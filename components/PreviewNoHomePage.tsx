export function PreviewNoHomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-5">
      <span className="inline-block px-2 py-1 text-xs font-semibold tracking-widest text-white uppercase bg-primary rounded-full">
        Preview Mode
      </span>
      <h1 className="text-2xl font-bold text-gray-900 mt-2">Home Page Not Found</h1>
      <p className="text-gray-600">
        In order to preview your site content, start by creating a home page.
      </p>
      <p className="text-gray-600">
        Add content to your site by launching the Studio from the <a className="font-bold text-primary" href="https://stackshift.webriq.com">StackShift App</a>.
      </p>
    </div>
  );
}
