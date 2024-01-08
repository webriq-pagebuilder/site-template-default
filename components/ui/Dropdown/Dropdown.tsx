import React, { useState } from "react";

export function Dropdown({ label }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((p) => !p)}
        className="inline-block px-4 py-2 text-white rounded-lg bg-webriq-blue"
      >
        {label}
      </button>
      {open && (
        <div className="mt-2 rounded bg-webriq-blue min-w-[200px] max-w-[300px]">
          <ul className="text-white">
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>
        </div>
      )}
    </>
  );
}
