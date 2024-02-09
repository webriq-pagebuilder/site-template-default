import React from "react";

export function ColorTable({ colors }) {
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
        {colors.map((color) => {
          return (
            <PreviewValues
              tailwindClass={color.name}
              value={color.value.toUpperCase()}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export function SpacingTable({ spacing, theme }) {
  console.log("theme", theme);
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
        {spacing.map((spacing) => {
          return (
            <PreviewSpacing
              tailwindClass={spacing.name}
              value={spacing.value}
            />
          );
        })}
      </tbody>
    </table>
  );
}

function PreviewSpacing({ tailwindClass, value }) {
  return (
    <tr className="!bg-white">
      <td className="flex justify-start">
        <div
          style={{
            height: "40px",
            width: value,
            border: "2px dashed black",
          }}
        ></div>
      </td>
      <td>{tailwindClass}</td>
      <td>{value}</td>
    </tr>
  );
}

function PreviewValues({ tailwindClass, value }) {
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
      <td>{tailwindClass}</td>
      <td>{value}</td>
    </tr>
  );
}
