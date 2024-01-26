import type { Meta, StoryObj } from "@storybook/react";
import PortfolioComponent from "../index";
import { Sections, Variants } from "types";

const args = {
  template: {
    bg: "gray",
    color: "webriq",
  },
  subtitle: "Dolor sit amet consectutar",
  title: "Latest Projects",
  portfoliosWithCategories: [
    {
      content: [
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkType: "linkInternal",
            label: "View Project",
            linkTarget: "_self",
          },
          _key: "CDsJ3htsHwe4lB-V9XEKc",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-5475dbc343da6918ab1be70c7a4211523898630c-1050x700-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",
        },
        {
          primaryButton: {
            label: "View Project",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkTarget: "_self",

            linkType: "linkInternal",
          },
          _key: "CqqpCGQj2t7Y7n_MfCDol",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-3e4df8b2fb10f2ef595fb86c56ffef84d72139b2-1055x699-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
        },
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkType: "linkInternal",
            label: "View Project",
            linkTarget: "_self",
          },
          _key: "y2Gd7F0s8uuGFRTHF6UUM",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-5475dbc343da6918ab1be70c7a4211523898630c-1050x700-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",
        },
        {
          primaryButton: {
            linkTarget: "_self",

            linkType: "linkInternal",
            label: "View Project",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
          _key: "Zqyy46_-bxkmzEJfHVtMG",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _type: "reference",
                _ref: "image-d01d476f13a9248d54fa184d3a6876510879e0e1-968x726-png",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
        },
        {
          _key: "CecTTdpO6wLYqPVb9IcaH",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-a794d25afae0e4732ad9da45b8653ed70e4d3f16-1050x700-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            linkTarget: "_self",

            linkType: "linkInternal",
            label: "View Project",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
        },
        {
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-a741108fbc063c4c3669d7cfeffda6ea19528dc9-1055x699-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            internalLink: null,
            externalLink: null,
            linkType: "linkInternal",
            label: "View Project",
            linkTarget: "_self",

            type: "linkInternal",
          },
          _key: "axmyuFPwbBpLDB9OAz-sc",
        },
        {
          primaryButton: {
            linkType: "linkInternal",
            label: "View Project",
            linkTarget: "_self",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
          _key: "iQdVrNoEA1wFwr04PTLN0",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-69f111886d2ed37f74d09e1cf91bf6aa99007ca1-1127x682-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
        },
        {
          mainImage: {
            image: {
              asset: {
                _ref: "image-089e9ebbbf7377215a97cc1ff04e949e79061422-1055x699-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            internalLink: null,
            externalLink: null,
            linkTarget: "_self",

            linkType: "linkInternal",
            label: "View Project",
            type: "linkInternal",
          },
          _key: "OynOHxXzLvFQoPZIjatqL",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
        },
      ],

      primaryButton: {
        type: "linkInternal",
        internalLink: null,
        externalLink: null,
        linkTarget: "_self",

        linkType: "linkInternal",
        label: "View Project",
      },
      _key: "3KKbGTEULuTKFXk7J34gD",
      category: "Category 1",
    },
    {
      content: [
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            linkType: "linkInternal",
            label: "View Project",
            linkTarget: "_self",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
          _key: "S8QH13ZmtJFkodrDQz_YY",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-98653eae866170faa09e52d4ce5673879db1d910-2000x1333-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",
        },
        {
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-5a94c82d4af12a91beac34bab0be287c5e18a5bd-2000x1125-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkTarget: "_self",

            linkType: "linkInternal",
            label: "View Project",
          },
          _key: "2X0ua7PEZ5RKFACTliR8l",
          title: "Lorem ipsum dolor sit amet consectutar",
        },
        {
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            label: "View Project",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkTarget: "_self",

            linkType: "linkInternal",
          },
          _key: "Vuy3No9FOQzYp_SkmeMZu",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-83f747188b6f0e4e9cf664accd222c8c1e8f5fad-1800x1200-png",
                _type: "reference",
              },
            },
          },
        },
        {
          _key: "a20sCY57mvCwkt2Bd_u1z",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _type: "reference",
                _ref: "image-97fc202e162b1e3f59a0bfa7fab62053da4f7eb2-2000x1347-png",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            label: "View Project",
            linkTarget: "_self",

            linkType: "linkInternal",
          },
        },
        {
          mainImage: {
            image: {
              asset: {
                _ref: "image-50c3210ab6d5f770acc31fa9e786d2f5a957fec8-744x495-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            linkTarget: "_self",

            linkType: "linkInternal",
            label: "View Project",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
          _key: "JMgzTF8iBCu4_GV95Gvlj",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
        },
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            linkType: "linkInternal",
            label: "View Project",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkTarget: "_self",
          },
          _key: "YPRHbg2WSWXtuIDgHg7KZ",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-7d0cd450c9cfa3a884fa3efd8fd273024605009f-940x625-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",
        },
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            linkType: "linkInternal",
            label: "View Project",
            linkTarget: "_self",

            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
          _key: "B-HejX3OiXivlh1aq2qMX",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-5d08b74ee08bac976e8c33f38076cdaedb1c5ce1-1401x790-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",
        },
        {
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-e94345fbaec36ff9e58287e1e60e644bb31259db-1200x630-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            linkTarget: "_self",

            linkType: "linkInternal",
            label: "View Project",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
          _key: "XcLhPe1n7Ai3rW3GMLSBI",
          title: "Lorem ipsum dolor sit amet consectutar",
        },
      ],

      primaryButton: {
        externalLink: null,
        linkTarget: "_self",

        linkType: "linkInternal",
        label: "View Project",
        type: "linkInternal",
        internalLink: null,
      },
      _key: "YWDPHvYTUjGY5Xe-Zgfxo",
      category: "Category 2",
    },
    {
      content: [
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            linkTarget: "_self",

            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkType: "linkInternal",
            label: "View Project",
          },
          _key: "gk0U_axpFR61YBkFuIN--",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-3f2502fbb7e327fa35ca742745ca543f774df128-1024x683-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",
        },
        {
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-1eaaa0a5b12744268a877331dd39a5fdde67802f-1200x675-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkTarget: "_self",

            linkType: "linkInternal",
            label: "View Project",
          },
          _key: "qMUYATKd9Oic_JuhZllpO",
        },
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            linkTarget: "_self",

            linkType: "linkInternal",
            label: "View Project",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
          _key: "QgTjPgf3Lwjg37Y24bBkA",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-efdd41e812732af29e05d45f562a0febcf259ca4-2000x1333-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",
        },
        {
          _key: "maoRuva50VZxAdCKUnhlJ",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-ab5b950b0e12aa31f18165e313b26d35f1bc898f-700x467-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            linkTarget: "_self",

            linkType: "linkInternal",
            label: "View Project",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
        },
        {
          primaryButton: {
            linkType: "linkInternal",
            label: "View Project",
            linkTarget: "_self",

            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
          _key: "IF4sSK4oy8h_um4-8X5Rg",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-3556004edfd89351d072e53ebfd593a5fbf651ce-700x467-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
        },
        {
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-728bd47593a14a0a247c4f48290b7c053833fe33-900x600-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            linkType: "linkInternal",
            label: "View Project",
            linkTarget: "_self",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
          _key: "j2Oku_c90EtvyGE64PbZx",
        },
        {
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-9f32e2deb378150b183c6e9572540093cab1e668-700x368-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkTarget: "_self",

            linkType: "linkInternal",
            label: "View Project",
          },
          _key: "ld9LyanjmIPShW50rnBMZ",
          title: "Lorem ipsum dolor sit amet consectutar",
        },
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            label: "View Project",
            linkTarget: "_self",

            linkType: "linkInternal",
          },
          _key: "_MmTyL_Hi5TSJotSWodxZ",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-95a57d929dfd44d4688e09207fab85fcacf747c7-976x549-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",
        },
      ],

      primaryButton: {
        linkTarget: "_self",

        linkType: "linkInternal",
        label: "View Project",
        type: "linkInternal",
        internalLink: null,
        externalLink: null,
      },
      _key: "jcN36HW9A0yx-F-9AwVGB",
      category: "Category 3",
    },
    {
      category: "Category 4",
      content: [
        {
          primaryButton: {
            linkType: "linkInternal",
            label: "View Project",
            linkTarget: "_self",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
          _key: "8ikEOIKw62QMxm4XoqLIe",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _type: "reference",
                _ref: "image-403bf39e96df587639c006799c4cb0775497cc33-1200x700-png",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
        },
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            linkType: "linkInternal",
            label: "View Project",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkTarget: "_self",
          },
          _key: "AyABwO0AKIkKUbxPl__bA",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-8fd6b704069a63e052776d4d0a574c953136aa36-2000x1500-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",
        },
        {
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            externalLink: null,
            linkType: "linkInternal",
            label: "View Project",
            linkTarget: "_self",

            type: "linkInternal",
            internalLink: null,
          },
          _key: "cDUC7wwUjTI126d4awCSm",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-86dad226c6043799719eeb25d558551f5591790e-1200x800-png",
                _type: "reference",
              },
            },
          },
        },
        {
          mainImage: {
            image: {
              asset: {
                _ref: "image-403bf39e96df587639c006799c4cb0775497cc33-1200x700-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkTarget: "_self",

            linkType: "linkInternal",
            label: "View Project",
          },
          _key: "O0VK1kcFsSNZUqswTGVUt",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
        },
        {
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _type: "reference",
                _ref: "image-04248a1715c6af4bb60c33ce08db3b9466a8a262-1264x805-png",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkType: "linkInternal",
            label: "View Project",
            linkTarget: "_self",
          },
          _key: "rtF1OPQgrpZAMornxT-PR",
        },
        {
          primaryButton: {
            linkType: "linkInternal",
            label: "View Project",
            linkTarget: "_self",

            type: "linkInternal",
            internalLink: null,
            externalLink: null,
          },
          _key: "9DK8dnnRZjTk0fAL6A3Sp",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-c27cc8f37e1953a7ce37a2397789a5b24b564d7b-1280x720-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
        },
        {
          _key: "UJJ1HO745hsbctuofirLw",
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-76c7418b01da8320a4e864124ba53b7104db9543-1200x630-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkTarget: "_self",

            linkType: "linkInternal",
            label: "View Project",
          },
        },
        {
          title: "Lorem ipsum dolor sit amet consectutar",
          dateAdded: "2021-01-24",
          mainImage: {
            image: {
              asset: {
                _ref: "image-83bec330ab990f370645a776e913441b168612f6-750x500-png",
                _type: "reference",
              },
            },
          },
          subtitle: "Dolor sit amet consectutar",

          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque efficitur nisl sodales egestas lobortis.",
          primaryButton: {
            label: "View Project",
            type: "linkInternal",
            internalLink: null,
            externalLink: null,
            linkTarget: "_self",

            linkType: "linkInternal",
          },
          _key: "p_dijXnCIk7Bk2ZxoVten",
        },
      ],

      primaryButton: {
        linkType: "linkInternal",
        label: "View Project",
        type: "linkInternal",
        internalLink: null,
        externalLink: null,
        linkTarget: "_self",
      },
      _key: "KF4WqJGzq81i5AadkKfkH",
    },
  ],
  portfolios: [
    {
      primaryButton: {
        linkType: "linkInternal",
        label: "View Project",
        type: "linkInternal",
        internalLink: null,
        externalLink: null,
        linkTarget: "_self",
      },
      _key: "pQpa4y9JZTe4LPWoa0Po_",
      content: null,
      title: "Lorem ipsum dolor sit amet consectutar",
      dateAdded: "2021-01-24",
      mainImage: {
        image: {
          asset: {
            _ref: "image-2d9f87020c05fba5986084e4744c829844bf21b6-1050x700-jpg",
            _type: "reference",
          },
        },
      },
    },
    {
      _key: "fL23aovaiZfQjY41jzK9K",
      title: "Lorem ipsum dolor sit amet consectutar",
      dateAdded: "2021-01-24",
      mainImage: {
        image: {
          asset: {
            _ref: "image-1393546851fbb9c4ce9909a3b4dfb016791c00f0-1055x699-jpg",
            _type: "reference",
          },
        },
      },

      primaryButton: {
        internalLink: null,
        externalLink: null,
        linkType: "linkInternal",
        label: "View Project",
        linkTarget: "_self",

        type: "linkInternal",
      },
      content: null,
    },
    {
      _key: "8BrE5yoSlPuPL2cY1tqYJ",
      content: null,
      title: "Lorem ipsum dolor sit amet consectutar",
      dateAdded: "2021-01-24",
      mainImage: {
        image: {
          asset: {
            _ref: "image-39b21efc3b041674d4e517c24608b5a45fefa2ab-968x726-jpg",
            _type: "reference",
          },
        },
      },

      primaryButton: {
        linkTarget: "_self",

        linkType: "linkInternal",
        label: "View Project",
        type: "linkInternal",
        internalLink: null,
        externalLink: null,
      },
    },
    {
      primaryButton: {
        linkTarget: "_self",

        linkType: "linkInternal",
        label: "View Project",
        type: "linkInternal",
        internalLink: null,
        externalLink: null,
      },
      _key: "42D7ITPaPSepOQcr-Rs6_",
      title: "Lorem ipsum dolor sit amet consectutar",
      dateAdded: "2021-01-24",
      content: null,
      mainImage: {
        image: {
          asset: {
            _ref: "image-ab32985078ea0077e2f1a75f6ecde8e2a539e5e6-1127x682-jpg",
            _type: "reference",
          },
        },
      },
    },
    {
      primaryButton: {
        linkType: "linkInternal",
        label: "View Project",
        type: "linkInternal",
        internalLink: null,
        externalLink: null,
        linkTarget: "_self",
      },
      _key: "K-0lpqb2RVttC_E1M8pvK",
      title: "Lorem ipsum dolor sit amet consectutar",
      content: null,
      dateAdded: "2021-01-24",
      mainImage: {
        image: {
          asset: {
            _ref: "image-2394d62268af7e792e7da14a10f4301cccf4084e-1050x700-jpg",
            _type: "reference",
          },
        },
      },
    },
    {
      primaryButton: {
        linkTarget: "_self",

        linkType: "linkInternal",
        label: "View Project",
        type: "linkInternal",
        internalLink: null,
        externalLink: null,
      },
      _key: "S3KHKp7t3GKFLxGqD6AmL",
      content: null,
      title: "Lorem ipsum dolor sit amet consectutar",
      dateAdded: "2021-01-24",
      mainImage: {
        image: {
          asset: {
            _ref: "image-2d9f87020c05fba5986084e4744c829844bf21b6-1050x700-jpg",
            _type: "reference",
          },
        },
      },
    },
  ],
  primaryButton: {
    label: "View More Projects",
    linkTarget: "_self",

    linkType: "linkInternal",
    type: "linkInternal",
    internalLink: null,
    externalLink: null,
  },
};
const meta: Meta<typeof PortfolioComponent> & any = {
  title: "Sections/Portfolio",
  component: PortfolioComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant,
      variants: args,
    };
    return <PortfolioComponent data={data} template={args.template} />;
  },
} satisfies Meta<typeof PortfolioComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

export const variant_a: Story = {
  args: {
    variant: "variant_a",
    ...args,
  },
};

export const variant_b: Story = {
  args: {
    variant: "variant_b",
    ...args,
  },
};

export const variant_c: Story = {
  args: {
    variant: "variant_c",
    ...args,
  },
};

export const variant_d: Story = {
  args: {
    variant: "variant_d",
    ...args,
  },
};
