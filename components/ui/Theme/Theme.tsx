import React from "react";

//colors: -- brand colors, text colors, background colors, sizes
export function Brand() {
  const theme = [
    {
      tw: "webriq-blue",
      value: "#296eff",
    },
    {
      tw: "webriq-lightblue",
      value: "#d5e3ff",
    },
    {
      tw: "webriq-darkblue",
      value: "#0045d8",
    },
    {
      tw: "webriq-lightblue",
      value: "#d5e3ff",
    },
  ];

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="font-medium text-lg w-[20%]">Preview</th>
          <th className="font-medium text-lg w-[40%]">Tailwind Class</th>
          <th className="font-medium text-lg w-[40%]">Value</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {theme.map((t) => {
          return <PreviewTable tw={t.tw} value={t.value} />;
        })}
      </tbody>
    </table>
  );
}

export function Background() {
  const theme = [
    {
      tw: "white",
      value: "#ffffff",
    },
    {
      tw: "gray-50",
      value: "rgb(249 250 251)",
    },
    {
      tw: "gray-100",
      value: "rgb(243 244 246)",
    },
    {
      tw: "gray-200",
      value: "rgb(229 231 235)",
    },
    {
      tw: "gray-900",
      value: "rgb(17 24 39)",
    },
  ];

  return (
    <table className="w-full ">
      <thead>
        <tr className="!bg-white">
          <th className="font-medium text-lg w-[20%]">Preview</th>
          <th className="font-medium text-lg w-[40%]">Tailwind Class</th>
          <th className="font-medium text-lg w-[40%]">Value</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {theme.map((t) => {
          return <PreviewTable tw={t.tw} value={t.value} />;
        })}
      </tbody>
    </table>
  );
}

export function Border() {
  const theme = [
    {
      tw: "gray-50",
      value: "#ffffff",
    },
    {
      tw: "gray-200",
      value: "rgb(249 250 251)",
    },
    {
      tw: "gray-300",
      value: "rgb(243 244 246)",
    },
    {
      tw: "gray-400",
      value: "rgb(229 231 235)",
    },
    {
      tw: "gray-600",
      value: "rgb(17 24 39)",
    },
  ];

  return (
    <table className="w-full ">
      <thead>
        <tr className="!bg-white">
          <th className="font-medium text-lg w-[20%]">Preview</th>
          <th className="font-medium text-lg w-[40%]">Tailwind Class</th>
          <th className="font-medium text-lg w-[40%]">Value</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {theme.map((t) => {
          return <PreviewTable tw={t.tw} value={t.value} />;
        })}
      </tbody>
    </table>
  );
}

export function PreviewTable({ tw, value }) {
  return (
    <tr className="!bg-white">
      <td className="flex justify-center">
        <div
          style={{
            height: "40px",
            width: "100px",
            backgroundColor: value,
          }}
        ></div>
      </td>
      <td>{tw}</td>
      <td>{value}</td>
    </tr>
  );
}
