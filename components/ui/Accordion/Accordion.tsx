import React, { useState } from "react";
import { FaCaretRight, FaCaretDown } from "react-icons/fa";

export type Accordion = {
  /** Label for the accordion, Accepts a string or JSX elements */
  title: React.ReactNode;
  /** Optional subtitle below the label, Accepts a string or JSX elements  */
  subtitle?: React.ReactNode;
  /** Content inside the accordion, Accepts a string or JSX elements  */
  body: React.ReactNode;
  /** Optional, overrides default icons */
  closedIcon?: React.ReactNode;
  /** Optional, overrides default icons */
  openedIcon?: React.ReactNode;
};

export function Accordion({
  title,
  subtitle,
  body,
  closedIcon,
  openedIcon,
}: Accordion) {
  const [isOpen, setIsOpen] = useState(false);

  const iconOpened = openedIcon ?? <FaCaretDown />;
  const iconClosed = closedIcon ?? <FaCaretRight />;

  return (
    <div
      className={`w-full border-y border-solid border-slate-200 py-4 transition-all duration-200`}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full"
      >
        <div className="text-left">
          <p className="text-lg font-medium">{title}</p>
          {subtitle && <p className="text-sm">{subtitle}</p>}
        </div>
        <span className="justify-end">{isOpen ? iconOpened : iconClosed}</span>
      </button>
      {isOpen && (
        <div className="mt-4">
          {body && typeof body === "string" ? <p>{body}</p> : body}
        </div>
      )}
    </div>
  );
}
