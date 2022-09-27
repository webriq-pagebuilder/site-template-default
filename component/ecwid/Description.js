import React from "react";

const Description = ({ data }) => {
  if (!data) return null;

  if (data?.description) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: data.description,
        }}
      ></div>
    );
  }

  return null;
};

export default Description;
