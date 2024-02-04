import { ConditionalLink, extractLink, logoLink } from "helper";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { SignUpForm } from "components/common/form/sign-up-form";
import { CTAProps } from ".";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";
import { Text } from "components/ui/Text";
import { Button } from "components/ui/Button";

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
      <Container>
        <Flex
          align="center"
          justify="between"
          gap={4}
          className="flex-col lg:flex-row"
        >
          <div className="basis-1/2">
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
            <Heading className="mb-4">{title}</Heading>
            <Text className="mb-8 leading-loose" muted>
              {text}
            </Text>
            {button?.label && (
              <Button asLink link={button} ariaLabel={button?.label}>
                {button?.label}
              </Button>
            )}
          </div>
          <div className="max-w-sm ">
            {form?.fields && <SignUpForm form={form} signInLink={signInLink} />}
            {formLinks && (
              <div className="flex flex-wrap items-center justify-center text-sm text-gray-500">
                {formLinks?.map((link, index, { length }) => (
                  <div key={index}>
                    <Link
                      href={extractLink(link)}
                      className="font-bold text-primary hover:text-primary-foreground"
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
              </div>
            )}
          </div>
        </Flex>
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
