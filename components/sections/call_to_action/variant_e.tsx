import React from "react";
import WebriQForm from "components/webriq-form";
import { thankYouPageLink, ConditionalLink } from "helper";

import { CTAProps } from ".";
import { FormField } from "components/ui/FormField";
import { Button } from "components/ui/Button";
import { Form } from "components/ui/Form/Form";
import { SignUpForm } from "components/common/form/sign-up-form";

function VariantE({ form, formLinks, signInLink }: CTAProps) {
  return (
    <section className="px-5 py-20 bg-gray-50 sm:px-10">
      <div className="container px-4 mx-auto">
        <div className="mx-auto sm:max-w-md">
          {form?.fields && (
            // <div className="px-6 py-8 mb-6 text-center bg-white shadow rounded-t-3xl rounded-bl-3xl">
            //   <Form
            //     id={form?.id}
            //     name="Calltoaction-VariantE-Form"
            //     className="form-callToAction"
            //     thankyouPage={thankYouPageLink(form?.thankYouPage)}
            //   >
            //     <div className="mb-6">
            //       <span className="text-sm text-gray-500">
            //         {form?.subtitle}
            //       </span>
            //       <p className="text-2xl">{form?.name}</p>
            //     </div>
            //     <div className="flex flex-wrap mb-3 -mx-2">
            //       {form?.fields?.slice(0, 2)?.map((formFields, index) => (
            //         <div
            //           className="w-full px-2 mb-3 lg:mb-0 lg:w-1/2 xl:mb-0 2xl:mb-0"
            //           key={index}
            //         >
            //           <FormField
            //             {...formFields}
            //             noLabel
            //             name={formFields?.name}
            //             variant="secondary"
            //           />
            //         </div>
            //       ))}
            //     </div>
            //     {form?.fields?.slice(2)?.map((formFields, index) => (
            //       <div className="mb-3" key={index}>
            //         <FormField
            //           {...formFields}
            //           noLabel
            //           name={formFields?.name}
            //           variant="secondary"
            //         />
            //       </div>
            //     ))}
            //     <div>
            //       <div className="webriq-recaptcha" />
            //     </div>
            //     {form?.buttonLabel && (
            //       <Button
            //         ariaLabel={
            //           form?.buttonLabel ?? "Call to action form submit button"
            //         }
            //         className="w-full py-4 mb-4 text-sm font-bold leading-normal text-white transition duration-200 rounded bg-webriq-blue hover:bg-webriq-darkblue"
            //         type="submit"
            //       >
            //         {form?.buttonLabel}
            //       </Button>
            //     )}
            //   </Form>
            //   {signInLink?.label && (
            //     <p className="text-xs text-gray-500">
            //       <span>Already have an account?</span>
            //       <ConditionalLink
            //         link={signInLink}
            //         className="text-webriq-darkblue hover:text-webriq-babyblue"
            //         ariaLabel={signInLink?.label}
            //       >
            //         {signInLink?.label}
            //       </ConditionalLink>
            //     </p>
            //   )}
            // </div>
            <SignUpForm form={form} signInLink={signInLink} />
          )}
          {formLinks && (
            <div className="flex flex-wrap items-center justify-center text-sm text-gray-500">
              {formLinks?.map((link, index, { length }) => (
                <div key={index}>
                  <ConditionalLink
                    link={link}
                    className="font-bold text-webriq-darkblue hover:text-webriq-blue"
                    ariaLabel={link?.label}
                  >
                    {link?.label}
                  </ConditionalLink>
                  {index === length - 1 ? null : index === length - 2 ? (
                    <span>&nbsp;and&nbsp;</span>
                  ) : (
                    <span>&nbsp;,&nbsp;</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// /**
//  *
//  * @param {fields}
//  * @returns input fields according to type
//  */
// function FormFields({ fields }: { fields: TypeFormFields }) {
//   const [value, setValue] = React.useState(null); // setting selected value for input field radio type
//   const [checked, setChecked] = React.useState([]); // setting selected value for input field checkbox type

//   const handleRadioChange = (e) => {
//     setValue(e.target.value);
//   };

//   const handleCheckboxChange = (e) => {
//     const { checked, value } = e.target;

//     setChecked((prev) =>
//       checked ? [...prev, value] : prev.filter((v) => v !== value)
//     );
//   };

//   if (fields?.type === "textarea") {
//     return (
//       <textarea
//         aria-label={fields?.placeholder ?? fields?.name}
//         className="w-full p-4 text-xs bg-gray-100 rounded outline-none"
//         placeholder={fields?.placeholder}
//         name={fields?.name}
//         required={fields?.isRequired}
//       />
//     );
//   } else if (fields?.type === "inputFile") {
//     return (
//       <label className="flex px-2 bg-gray-100 rounded">
//         <input
//           aria-label={fields?.placeholder ?? fields?.name}
//           className="w-full p-4 text-xs bg-gray-100 rounded outline-none"
//           type="file"
//           placeholder="Choose file.."
//           name={fields?.name}
//           required={fields?.isRequired}
//         />
//       </label>
//     );
//   } else if (fields?.type === "inputNumber") {
//     return (
//       <input
//         aria-label={fields?.placeholder ?? fields?.name}
//         className="w-full p-4 text-xs bg-gray-100 rounded outline-none"
//         type="number"
//         placeholder={fields?.placeholder}
//         name={fields?.name}
//         required={fields?.isRequired}
//       />
//     );
//   } else if (fields?.type === "inputSelect") {
//     return (
//       <div className="flex mb-4">
//         <label
//           className="m-auto text-xs text-left text-gray-500"
//           htmlFor={fields?.name}
//         >
//           {fields?.label}
//         </label>
//         <select
//           aria-label={fields?.name}
//           className="w-full p-3 text-xs bg-gray-100 rounded outline-none"
//           name={`cta-${fields?.name}`}
//           defaultValue={"default-value"}
//           required={fields?.isRequired}
//         >
//           <option value=""></option>
//           {fields?.items?.map((item, index) => (
//             <option key={index} value={item}>
//               {item}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   } else if (fields?.type === "inputRadio") {
//     return (
//       <div className="mb-4 text-left">
//         <label
//           className="m-auto text-xs text-left text-gray-500"
//           htmlFor={fields?.name}
//         >
//           {fields?.label}
//         </label>
//         <div>
//           {fields?.items?.map((item, index) => (
//             <label className="mr-4 text-xs text-gray-500" key={index}>
//               <input
//                 className="mr-2"
//                 name={fields?.name}
//                 value={item}
//                 type="radio"
//                 onChange={handleRadioChange}
//                 checked={value === item}
//                 required={fields?.isRequired}
//               />
//               {item}
//             </label>
//           ))}
//         </div>
//       </div>
//     );
//   } else if (fields?.type === "inputCheckbox") {
//     return (
//       <div className="mb-4 text-left">
//         <label
//           className="m-auto text-xs text-left text-gray-500"
//           htmlFor={fields?.name}
//         >
//           {fields?.label}
//         </label>
//         <div>
//           {fields?.items?.map((item, index) => (
//             <label className="mr-4 text-xs text-gray-500" key={index}>
//               <input
//                 className="mr-2"
//                 name={fields?.name}
//                 value={item}
//                 type="checkbox"
//                 onChange={handleCheckboxChange}
//                 checked={checked.some((v) => v === item)}
//                 required={
//                   fields?.isRequired && checked.length === 0 ? true : false
//                 }
//               />
//               {item}
//             </label>
//           ))}
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <input
//         aria-label={fields?.placeholder ?? fields?.name}
//         className="w-full p-4 text-xs bg-gray-100 rounded outline-none"
//         type={
//           fields?.type === "inputEmail"
//             ? "email"
//             : fields?.type === "inputPassword"
//             ? "password"
//             : "text"
//         }
//         placeholder={fields?.placeholder}
//         name={fields?.name}
//         required={fields?.isRequired}
//       />
//     );
//   }
// }

export default React.memo(VariantE);
