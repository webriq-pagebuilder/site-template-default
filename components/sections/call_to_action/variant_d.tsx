import { urlFor } from "lib/sanity";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import WebriQForm from "components/webriq-form";
import { logoLink, thankYouPageLink, ConditionalLink } from "helper";

import { CTAProps } from ".";
import { FormFields as TypeFormFields } from "types";
import { FormField } from "components/ui/FormField";
import { Form } from "components/ui/Form/Form";
import { SignUpForm } from "components/common/form/sign-up-form";

function VariantD({
  logo,
  title,
  text,
  button,
  form,
  formLinks,
  signInLink,
}: CTAProps) {
  return (
    <section className="px-10 py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center justify-center -mx-4">
          <div className="max-w-2xl px-4 mb-16 lg:mb-0 lg:w-1/2">
            {logo?.image && (
              <Link
                aria-label={
                  logoLink(logo) === "/"
                    ? "Go to home page"
                    : `Go to ${logoLink(logo)}`
                }
                className="inline-block mb-10 text-3xl font-bold leading-none"
                href={logoLink(logo)}
              >
                <Image
                  className="h-14"
                  src={urlFor(logo?.image)}
                  width={56}
                  height={56}
                  alt={logo?.alt ?? "callToAction-logo"}
                />
              </Link>
            )}
            <h1 className="mb-4 text-4xl font-bold font-heading md:text-5xl">
              {title}
            </h1>
            <p className="mb-8 leading-loose text-gray-700">{text}</p>
            {button?.label && (
              <ConditionalLink
                link={button}
                className="inline-block px-6 py-2 font-bold leading-loose text-white transition bg-webriq-darkblue hover:bg-webriq-blue duration-250 rounded-l-xl rounded-t-xl"
                ariaLabel={button?.label}
              >
                {button?.label}
              </ConditionalLink>
            )}
          </div>
          <div className="w-full lg:w-1/2">
            <div className="max-w-sm mx-auto lg:ml-auto lg:mr-0">
              {form?.fields && (
                // <div className="px-6 py-8 mb-6 text-center bg-white shadow rounded-t-3xl rounded-bl-3xl">
                //   <Form
                //     id={form?.id}
                //     name="Calltoaction-VariantD-Form"
                //     className="form-callToAction"
                //     thankyouPage-={thankYouPageLink(form?.thankYouPage)}
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
                //             noLabel
                //             variant={"secondary"}
                //             name={formFields?.name}
                //             placeholder={formFields?.placeholder}
                //             required={formFields?.isRequired}
                //             {...formFields}
                //           />
                //         </div>
                //       ))}
                //     </div>
                //     <div className="mb-3 space-y-3">
                //       {form?.fields?.slice(2)?.map((formFields, index) => (
                //         <div key={index}>
                //           <FormField
                //             noLabel
                //             name={formFields?.name}
                //             variant={"secondary"}
                //             {...formFields}
                //           />
                //         </div>
                //       ))}
                //     </div>
                //     <div>
                //       <div className="webriq-recaptcha" />
                //     </div>
                //     {form?.buttonLabel && (
                //       <button
                //         aria-label={
                //           form?.buttonLabel ??
                //           "Call to action form submit button"
                //         }
                //         className="w-full py-4 mb-4 text-sm font-bold leading-normal text-white transition duration-200 rounded bg-webriq-blue hover:bg-webriq-darkblue"
                //         type="submit"
                //       >
                //         {form?.buttonLabel}
                //       </button>
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
//           placeholder={fields?.placeholder ?? "Choose file.."}
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

export default React.memo(VariantD);
