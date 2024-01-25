import React from "react";

function transformBrandColors(brandColors) {
  const colors = [];
  for (const category in brandColors) {
    const categoryValue = brandColors[category];
    if (typeof categoryValue === "object") {
      // Handle object children
      for (const key in categoryValue) {
        const colorKey = key === "DEFAULT" ? category : `${category}-${key}`;
        colors.push({ [colorKey]: categoryValue[key].toUpperCase() });
      }
    } else {
      // Handle direct color value
      colors.push({ [category]: categoryValue });
    }
  }
  return colors;
}

export function Table({ colors, prefix }) {
  const colorList = transformBrandColors(colors);

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
        {colorList.map((color) => {
          const key = Object.keys(color)[0];
          const tailwindClass = `${prefix}-${key}`;
          const colorValue = color[key];
          return (
            <PreviewValues
              key={colorValue}
              tailwinClass={tailwindClass}
              value={colorValue}
            />
          );
        })}
      </tbody>
    </table>
  );
}

function PreviewValues({ tailwinClass, value }) {
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
      <td>{tailwinClass}</td>
      <td>{value}</td>
    </tr>
  );
}
