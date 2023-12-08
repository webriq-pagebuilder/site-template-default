import React from "react";
import { default as twConfig } from "../../../tailwind.config";

const colors = twConfig.theme.extend.colors;
export const colorsArray = colors
  ? Object.entries(colors).map(([key, value]) => ({ [key]: value }))
  : [];

export function Brand({ colors }) {
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
        {colors.map((t) => {
          const tw = Object.keys(t)[0];
          return <PreviewTable tw={tw} value={t[tw]} />;
        })}
      </tbody>
    </table>
  );
}

function PreviewTable({ tw, value }) {
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
