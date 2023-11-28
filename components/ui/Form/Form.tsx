import WebriQForm from "components/webriq-form";
import { thankYouPageLink } from "helper";
import React from "react";
import { Button } from "../Button";

interface IForm {
  className?: string;
  id: string;
  name: string;
  [key: string]: any;
}

interface FormWithDefaultFields extends IForm {
  btnLabel: string;
  children?: React.ReactNode;
}

type Form = FormWithDefaultFields;

export const Form = (form: Form) => {
  return (
    <WebriQForm
      method="POST"
      data-form-id={form?.id}
      name={form.name ?? "Form"}
      className={`form-contacts w-full p-4 bg-gray-50 rounded-md max-w-[650px] mx-auto ${form.className}`}
      data-thankyou-url={thankYouPageLink(form?.thankYouPage)}
      scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
      {...form}
    >
      {form.children}
      <div className="items-center sm:flex sm:justify-between">
        <div>
          <div className="webriq-recaptcha" />
        </div>
        {form?.btnLabel && (
          <Button
            ariaLabel={form?.btnLabel ?? "Form submit button"}
            type="submit"
          >
            {form?.btnLabel}
          </Button>
        )}
      </div>
    </WebriQForm>
  );
};
