import {
  defaultImage,
  defaultImageArray,
  defaultButton,
  defaultLinks,
  defaultForm,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default {
  title: "Build & Launch without problems",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
  primaryButton: defaultButton("Get Started"),
  secondaryButton: defaultButton("How it works"),
  mainImage: defaultImage(
    "image-169ed7b2d1aefee7f232cb11d591a87afb081800-1050x700-jpg"
  ),
  images: defaultImageArray([
    "image-0b68b4267d6d520230fe4b107e622b99a6739678-941x734-jpg",
    "image-6149e873e52c7b945a489b9bb65204e3905bed81-1050x701-jpg",
    "image-85ba15e7e2930aa280c5d7e46dae17a018caf3a7-967x725-jpg",
    "image-8ab26c1d233fa8ce762fe3ccb4c37df46139edac-1190x669-jpg",
  ]),
  youtubeLink: "https://www.youtube.com/watch?v=HfPdTL7Isx8",
  form: defaultForm(
    "Create an account",
    [
      {
        name: "First Name",
        placeholder: "First Name",
        type: "inputText",
      },
      {
        name: "Last Name",
        placeholder: "Last Name",
        type: "inputText",
      },
      {
        name: "Email",
        placeholder: "Enter your email address",
        type: "inputEmail",
      },
      {
        name: "Password",
        placeholder: "Enter your password",
        type: "inputPassword",
      },
    ],
    "Sign Up",
    "Sign Up"
  ),
  formLinks: defaultLinks(["Policy Privacy", "Terms of Use"]),
};
