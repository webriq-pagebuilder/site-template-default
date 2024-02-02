import React from "react";
import WebriQForm from "components/webriq-form";
import { thankYouPageLink, ConditionalLink, extractLink } from "helper";

import { CTAProps } from ".";
import { FormField } from "components/ui/FormField";
import { Button } from "components/ui/Button";
import { Form } from "components/ui/Form/Form";
import { SignUpForm } from "components/common/form/sign-up-form";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import Link from "next/link";

function VariantE({ form, formLinks, signInLink }: CTAProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container maxWidth={448}>
        {form?.fields && <SignUpForm form={form} signInLink={signInLink} />}
        {formLinks && (
          <Flex wrap align="center" justify="center" c>
            {formLinks?.map((link, index, { length }) => (
              <div key={index}>
                <Link
                  href={extractLink(link)}
                  className="text-sm font-bold text-brand-primary hover:text-brand-primary-foreground"
                >
                  {link?.label}
                </Link>
                {index === length - 1 ? null : index === length - 2 ? (
                  <span>&nbsp;and&nbsp;</span>
                ) : (
                  <span>&nbsp;,&nbsp;</span>
                )}
              </div>
            ))}
          </Flex>
        )}
      </Container>
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
