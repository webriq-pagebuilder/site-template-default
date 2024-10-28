export function PreviewNoHomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <span className="inline-block px-2 py-1 text-xs font-semibold tracking-widest text-white uppercase bg-blue-600 rounded-full">
        Preview Mode
      </span>
      <h1 className="text-2xl font-bold text-gray-900 mt-2">Home Page Not Found</h1>
      <p className="text-gray-600">
        You are seeing this preview because no home page was found. In order to preview your site or its theme settings, you need to create a home page first.
      </p>
    </div>
  );
}
