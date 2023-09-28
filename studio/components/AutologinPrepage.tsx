import Image from "next/image";

export default function AutologinPrepage({ status }) {
  if (status === "retry") {
    return (
      <div className="py-24 text-center justify-center h-full translate-">
        <h1 className="font-bold text-lg sm:text-2xl mt-20 mb-5">
          Logging in to WebriQ Studio
        </h1>
        <p className="animate-pulse text-sm text-gray-500">Please wait...</p>
      </div>
    );
  }

  return (
    <div className="py-20 text-center justify-center h-full">
      <Image
        className="mx-auto"
        src="/assets/elements/Settings_Monochromatic-01.svg"
        width={500}
        height={500}
        alt="Settings_Monochromatic-01"
      />
      <h1 className="font-bold text-lg sm:text-2xl mb-5">
        Oops, unable to autologin!
      </h1>
      <p className="text-sm text-gray-500">
        Please notify WebriQ about this issue...
      </p>
    </div>
  );
}
