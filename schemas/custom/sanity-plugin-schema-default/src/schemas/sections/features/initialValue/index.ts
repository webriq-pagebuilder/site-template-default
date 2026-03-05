import {
  defaultArrayOfObjects,
  defaultButton,
  defaultImage,
  defaultImageArray,
  defaultLogo,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default {
  subtitle: "Authorized, Independent Kinetico® Dealer",
  title: "Mike Holmes Seal of Approval",
  description:
    "We are proud to be endorsed by Mike Holmes, Canada's most trusted contractor. Our commitment to quality water solutions has earned us the Mike Holmes Seal of Approval.",
  primaryButton: defaultButton("Learn More"),
  mainImage: defaultImage(
    "image-1d0655534230a5cb4e08d8b7bd14b271c5317d82-634x951-jpg"
  ),
  logo: defaultLogo(
    "image-97b6696849c90facc200537fd780b03d373e5212-980x830-png"
  ),
  images: defaultImageArray([
    "image-1d0655534230a5cb4e08d8b7bd14b271c5317d82-634x951-jpg",
    "image-0dcfa20067460d48780f59c2c4a7a57e7c507969-1050x701-jpg",
    "image-881fdf41f1db63ed80d886037220b4fecc0c39b6-701x876-jpg",
    "image-04732685ec70933bc8c49683b2930032929b1fbe-1050x701-jpg",
  ]),
  featuredItems: defaultArrayOfObjects([
    {
      _type: "items",
      subtitle: "Trusted Quality",
      title: "Endorsed by Mike Holmes",
      description:
        "Our water solutions meet the rigorous standards set by Mike Holmes, ensuring you get the best quality for your home.",
      mainImage: defaultImage(
        "image-3a1ef9b3424fabd086e3d7bdea95583ba9ea6363-1048x701-jpg"
      ),
    },
  ]),
  arrayOfImageTitleAndText: defaultArrayOfObjects([
    {
      mainImage: defaultImage(
        "image-97b6696849c90facc200537fd780b03d373e5212-980x830-png"
      ),
      title: "BBB Accredited",
      plainText: "Better Business Bureau accredited business.",
    },
    {
      mainImage: defaultImage(
        "image-d52b2d79a8c0ff7df5bac2ab9b31e4f8b35b2d49-515x485-png"
      ),
      title: "Water Quality Association",
      plainText: "Certified by the Water Quality Association.",
    },
    {
      mainImage: defaultImage(
        "image-b362a413487c075bc56646b996ffaf5b888b8fd1-1200x1063-png"
      ),
      title: "Holmes Approved",
      plainText: "Proud recipient of the Mike Holmes Seal of Approval.",
    },
  ]),
};
