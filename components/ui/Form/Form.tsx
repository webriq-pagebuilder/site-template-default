import WebriQForm from "components/webriq-form";
import { thankYouPageLink } from "helper";
import React from "react";

interface IForm {
  className?: string;
  id: string;
  name: string;
  btnLabel: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export const Form = ({
  id,
  name,
  thankyouPage,
  className,
  children,
  props,
}: IForm) => {
  return (
    <WebriQForm
      method="POST"
      data-form-id={id}
      name={name ?? "Form"}
      className={`form-contacts w-full p-4 bg-gray-50 rounded-md max-w-[650px] mx-auto ${className}`}
      data-thankyou-url={
        typeof thankyouPage === "string"
          ? thankYouPageLink
          : thankYouPageLink(thankyouPage)
      }
      scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
      {...props}
    >
      {children}
    </WebriQForm>
  );
};
