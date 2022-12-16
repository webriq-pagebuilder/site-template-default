import React from "react";

const Description = ({ data }) => {
  if (!data) return null;

  if (data?.description) {
    return (
      <div
        className="max-w-md text-gray-500 font-custom"
        dangerouslySetInnerHTML={{
          __html: data.description,
        }}
      ></div>
    );
  }

  return null;
};

export default Description;
