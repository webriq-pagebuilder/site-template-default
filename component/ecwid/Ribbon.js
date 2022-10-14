import React from "react";

const Ribbon = ({ data }) => {
  if (!data) return null;

  if (!data.inStock) {
    return <p className="bg-red-400 inline-block text-white p-2">SOLD OUT</p>;
  }

  if (data?.ribbon?.text) {
    return (
      <p
        className="inline-block text-white p-2"
        style={{ backgroundColor: data?.ribbon?.color }}
      >
        {data?.ribbon?.text}
      </p>
    );
  }

  return null;
};

export default Ribbon;
