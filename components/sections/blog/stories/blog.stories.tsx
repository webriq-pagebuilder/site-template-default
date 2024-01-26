import type { Meta, StoryObj } from "@storybook/react";
import BlogComponent from "../index";
import { Sections, SectionsProps, Variants } from "types";
import {
  blogSchema,
  blogInitialValue,
} from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";

const args: Variants = {
  template: {
    bg: "gray",
    color: "webriq",
  },
  subtitle: "blog subtitle",
  title: "Blog Title",
  blogPosts: [
    {
      _id: "fac21b4f-0e82-4435-8296-1935f13aad00",
      categories: [
        {
          _updatedAt: "2021-11-30T12:32:15Z",
          _createdAt: "2021-11-11T13:45:58Z",
          _rev: "4Xbp5us36NAn0n6sWosfBc",
          _type: "category",
          _id: "5ce52ceb-d6f0-4ea3-b14e-8087b2f73061",
          title: "TRAVEL",
        },
      ],
      _rev: "4MfBp9HJw6JHUbUYbiAwQ9",
      slug: {
        current: "lorem-ipsum-dolor-sit-amet",
        _type: "slug",
      },
      link: "lorem-ipsum-dolor-sit-amet",
      excerpt: "Excerpt",
      body: [
        {
          style: "normal",
          _key: "e8ef67a7b2f1",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis. Egestas congue quisque egestas diam. Volutpat ac tincidunt vitae semper quis. Scelerisque eleifend donec pretium vulputate sapien nec. Lacinia at quis risus sed vulputate odio ut. Sed cras ornare arcu dui vivamus arcu felis. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Urna nunc id cursus metus aliquam eleifend mi in nulla. Nunc faucibus a pellentesque sit amet porttitor. Cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum. Convallis posuere morbi leo urna molestie at elementum eu. Vulputate ut pharetra sit amet aliquam id diam. Enim ut tellus elementum sagittis vitae. Id cursus metus aliquam eleifend mi.",
              _key: "7ff7f07f5a9e",
            },
          ],
          _type: "block",
        },
        {
          style: "normal",
          _key: "da2c70fa93c8",
          markDefs: [],
          children: [
            {
              marks: [],
              text: "Cras semper auctor neque vitae tempus. Dignissim convallis aenean et tortor at risus viverra. Habitant morbi tristique senectus et netus et. Eleifend donec pretium vulputate sapien. Venenatis tellus in metus vulputate eu. Nisi quis eleifend quam adipiscing. Odio aenean sed adipiscing diam donec adipiscing tristique. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Habitasse platea dictumst quisque sagittis. Eget magna fermentum iaculis eu.",
              _key: "a169efe193a60",
              _type: "span",
            },
          ],
          _type: "block",
        },
        {
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Accumsan sit amet nulla facilisi morbi tempus iaculis. Semper quis lectus nulla at volutpat diam ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris. Nulla facilisi morbi tempus iaculis urna id. Morbi enim nunc faucibus a pellentesque sit amet. Id porta nibh venenatis cras sed felis eget velit. Netus et malesuada fames ac turpis egestas integer eget aliquet. Nisl purus in mollis nunc sed id semper risus in. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Bibendum enim facilisis gravida neque convallis.",
              _key: "0d7c1a238deb0",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "a28074ceffb1",
        },
        {
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Mattis rhoncus urna neque viverra justo nec. Magna sit amet purus gravida quis blandit turpis cursus. Condimentum lacinia quis vel eros donec. Vel turpis nunc eget lorem dolor sed viverra. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Velit laoreet id donec ultrices tincidunt arcu non sodales. Nunc aliquet bibendum enim facilisis gravida neque convallis. Massa massa ultricies mi quis hendrerit dolor magna eget. Et molestie ac feugiat sed lectus vestibulum mattis. In eu mi bibendum neque egestas congue quisque. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Non odio euismod lacinia at quis risus sed vulputate. Placerat vestibulum lectus mauris ultrices eros. Maecenas accumsan lacus vel facilisis volutpat est. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Ac tortor dignissim convallis aenean et tortor.",
              _key: "7f7c59a86a040",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "f1bde5ef2cbf",
        },
        {
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Sed sed risus pretium quam vulputate dignissim suspendisse. Ut diam quam nulla porttitor massa id neque aliquam vestibulum. Aliquam purus sit amet luctus venenatis. Mauris pharetra et ultrices neque ornare aenean euismod. Ut eu sem integer vitae justo eget. Est pellentesque elit ullamcorper dignissim cras tincidunt. Pellentesque nec nam aliquam sem. Lobortis scelerisque fermentum dui faucibus in. Egestas tellus rutrum tellus pellentesque eu. Mauris cursus mattis molestie a iaculis at erat. Netus et malesuada fames ac turpis egestas integer eget. Massa massa ultricies mi quis hendrerit. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Purus in mollis nunc sed id semper. Auctor elit sed vulputate mi sit amet mauris commodo quis.",
              _key: "47e6b00ada470",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "5e3db3385255",
        },
      ],
      mainImage: {
        _type: "image",
        asset: {
          _ref: "image-fc4752283bb0c4bf2d6f2b71411407315298952d-968x726-jpg",
          _type: "reference",
        },
      },
      _createdAt: "2021-11-22T03:12:20Z",
      publishedAt: "2021-11-22T03:13:00.000Z",
      title: "Lorem ipsum dolor sit amet",
      authors: null,
      _type: "post",
      _updatedAt: "2023-04-27T10:11:20Z",
    },
    {
      slug: {
        current: "vestibulum-vehicle-leo-eget-libero-eleifend",
        _type: "slug",
      },
      _createdAt: "2021-11-22T03:16:40Z",
      publishedAt: "2021-11-22T03:16:00.000Z",
      mainImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: "image-c4e86670adde5dac3b429e1e050799145b5bcdf1-512x512-png",
        },
      },
      _updatedAt: "2023-05-19T08:19:56Z",
      body: [
        {
          style: "normal",
          _key: "c9e6c57895ff",
          markDefs: [],
          children: [
            {
              marks: [],
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis. Egestas congue quisque egestas diam. Volutpat ac tincidunt vitae semper quis. Scelerisque eleifend donec pretium vulputate sapien nec. Lacinia at quis risus sed vulputate odio ut. Sed cras ornare arcu dui vivamus arcu felis. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Urna nunc id cursus metus aliquam eleifend mi in nulla. Nunc faucibus a pellentesque sit amet porttitor. Cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum. Convallis posuere morbi leo urna molestie at elementum eu. Vulputate ut pharetra sit amet aliquam id diam. Enim ut tellus elementum sagittis vitae. Id cursus metus aliquam eleifend mi.",
              _key: "205986771a32",
              _type: "span",
            },
          ],
          _type: "block",
        },
        {
          _key: "b4dee4825d16",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Cras semper auctor neque vitae tempus. Dignissim convallis aenean et tortor at risus viverra. Habitant morbi tristique senectus et netus et. Eleifend donec pretium vulputate sapien. Venenatis tellus in metus vulputate eu. Nisi quis eleifend quam adipiscing. Odio aenean sed adipiscing diam donec adipiscing tristique. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Habitasse platea dictumst quisque sagittis. Eget magna fermentum iaculis eu.",
              _key: "30f89aaec1670",
            },
          ],
          _type: "block",
          style: "normal",
        },
        {
          _key: "d4f1095c0eff",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Accumsan sit amet nulla facilisi morbi tempus iaculis. Semper quis lectus nulla at volutpat diam ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris. Nulla facilisi morbi tempus iaculis urna id. Morbi enim nunc faucibus a pellentesque sit amet. Id porta nibh venenatis cras sed felis eget velit. Netus et malesuada fames ac turpis egestas integer eget aliquet. Nisl purus in mollis nunc sed id semper risus in. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Bibendum enim facilisis gravida neque convallis.",
              _key: "398b3691b9060",
            },
          ],
          _type: "block",
          style: "normal",
        },
        {
          _key: "730a6d6b8e37",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Mattis rhoncus urna neque viverra justo nec. Magna sit amet purus gravida quis blandit turpis cursus. Condimentum lacinia quis vel eros donec. Vel turpis nunc eget lorem dolor sed viverra. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Velit laoreet id donec ultrices tincidunt arcu non sodales. Nunc aliquet bibendum enim facilisis gravida neque convallis. Massa massa ultricies mi quis hendrerit dolor magna eget. Et molestie ac feugiat sed lectus vestibulum mattis. In eu mi bibendum neque egestas congue quisque. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Non odio euismod lacinia at quis risus sed vulputate. Placerat vestibulum lectus mauris ultrices eros. Maecenas accumsan lacus vel facilisis volutpat est. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Ac tortor dignissim convallis aenean et tortor.",
              _key: "e3096e4252d40",
            },
          ],
          _type: "block",
          style: "normal",
        },
        {
          children: [
            {
              text: "Sed sed risus pretium quam vulputate dignissim suspendisse. Ut diam quam nulla porttitor massa id neque aliquam vestibulum. Aliquam purus sit amet luctus venenatis. Mauris pharetra et ultrices neque ornare aenean euismod. Ut eu sem integer vitae justo eget. Est pellentesque elit ullamcorper dignissim cras tincidunt. Pellentesque nec nam aliquam sem. Lobortis scelerisque fermentum dui faucibus in. Egestas tellus rutrum tellus pellentesque eu. Mauris cursus mattis molestie a iaculis at erat. Netus et malesuada fames ac turpis egestas integer eget. Massa massa ultricies mi quis hendrerit. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Purus in mollis nunc sed id semper. Auctor elit sed vulputate mi sit amet mauris commodo quis.",
              _key: "aa18a5c0566f0",
              _type: "span",
              marks: [],
            },
          ],
          _type: "block",
          style: "normal",
          _key: "37ce056f613c",
          markDefs: [],
        },
        {
          children: [
            {
              marks: [],
              text: "Let's test out Grammarly in portable text content!!! inevitable",
              _key: "c6126a364676",
              _type: "span",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "063adec16906",
          markDefs: [],
        },
      ],
      authors: [
        {
          _rev: "4Xbp5us36NAn0n6sWosfBc",
          _type: "author",
          name: "John Doe",
          _id: "54a9cbab-1642-4a3a-8771-c308ff283382",
          link: "john-doe",
          _updatedAt: "2021-11-30T12:32:15Z",
          slug: {
            current: "john-doe",
            _type: "slug",
          },
          _createdAt: "2021-11-11T13:42:40Z",
        },
        {
          name: "John test author",
          bio: "Test bio john author",
          _createdAt: "2023-04-10T05:58:51Z",
          profile: {
            image: {
              _type: "image",
              asset: {
                _ref: "image-9e2ef55c6b161c36e48ab8a01603e0b533092756-512x512-png",
                _type: "reference",
              },
            },
            alt: "alt image",
          },
          _type: "author",
          _updatedAt: "2023-04-10T05:59:31Z",
          _rev: "wALtrn5jzuIQIY66apYys7",
          slug: {
            current: "john-test-author",
            _type: "slug",
          },
          link: "john-test-author",
          _id: "86ef0ad3-7ff7-464f-b8af-7e46d35a3c7a",
        },
      ],
      _type: "post",
      title: "Vestibulum vehicle leo eget libero eleifend 2",
      excerpt: "Writing sample excerpt to test Grammarly.",
      _id: "3b139e1b-dfc3-4a6e-bea5-3fe3b0908190",
      _rev: "HlYUfgLvnxhSVUqkxsDWxy",
      link: "vestibulum-vehicle-leo-eget-libero-eleifend",
      categories: [
        {
          _updatedAt: "2021-11-30T12:32:15Z",
          _createdAt: "2021-11-11T13:45:58Z",
          _rev: "4Xbp5us36NAn0n6sWosfBc",
          _type: "category",
          _id: "5ce52ceb-d6f0-4ea3-b14e-8087b2f73061",
          title: "TRAVEL",
        },
        {
          _createdAt: "2021-11-22T04:45:02Z",
          _rev: "4Xbp5us36NAn0n6sWosfBc",
          _type: "category",
          _id: "49f1e1b6-9c77-4671-bc0d-43ba97977db0",
          title: "Culture",
          _updatedAt: "2021-11-30T12:32:15Z",
        },
      ],
      seo: {
        seoSynonyms: "BLOG JOHN",
        seoDescription: "THIS IS A TEST FOR JOHN BLOG SEO DESCRIPTION",
        _type: "seoSettings",
        seoKeywords: "KEYWORD1, KEYWORD2",
        seoTitle: "JOHN SEO TITLLE",
      },
    },
    {
      publishedAt: "2021-11-22T03:17:00.000Z",
      _updatedAt: "2022-03-04T08:23:29Z",
      authors: null,
      body: [
        {
          _key: "5a3f627a777a",
          markDefs: [],
          children: [
            {
              marks: [],
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis. Egestas congue quisque egestas diam. Volutpat ac tincidunt vitae semper quis. Scelerisque eleifend donec pretium vulputate sapien nec. Lacinia at quis risus sed vulputate odio ut. Sed cras ornare arcu dui vivamus arcu felis. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Urna nunc id cursus metus aliquam eleifend mi in nulla. Nunc faucibus a pellentesque sit amet porttitor. Cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum. Convallis posuere morbi leo urna molestie at elementum eu. Vulputate ut pharetra sit amet aliquam id diam. Enim ut tellus elementum sagittis vitae. Id cursus metus aliquam eleifend mi.",
              _key: "5440e9556195",
              _type: "span",
            },
          ],
          _type: "block",
          style: "normal",
        },
        {
          children: [
            {
              _type: "span",
              marks: [],
              text: "Cras semper auctor neque vitae tempus. Dignissim convallis aenean et tortor at risus viverra. Habitant morbi tristique senectus et netus et. Eleifend donec pretium vulputate sapien. Venenatis tellus in metus vulputate eu. Nisi quis eleifend quam adipiscing. Odio aenean sed adipiscing diam donec adipiscing tristique. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Habitasse platea dictumst quisque sagittis. Eget magna fermentum iaculis eu.",
              _key: "1a96237a28990",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "74640db27da1",
          markDefs: [],
        },
        {
          style: "normal",
          _key: "c84742fb3796",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Accumsan sit amet nulla facilisi morbi tempus iaculis. Semper quis lectus nulla at volutpat diam ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris. Nulla facilisi morbi tempus iaculis urna id. Morbi enim nunc faucibus a pellentesque sit amet. Id porta nibh venenatis cras sed felis eget velit. Netus et malesuada fames ac turpis egestas integer eget aliquet. Nisl purus in mollis nunc sed id semper risus in. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Bibendum enim facilisis gravida neque convallis.",
              _key: "60d8a92373280",
            },
          ],
          _type: "block",
        },
        {
          _type: "block",
          style: "normal",
          _key: "207c1c76ec00",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Mattis rhoncus urna neque viverra justo nec. Magna sit amet purus gravida quis blandit turpis cursus. Condimentum lacinia quis vel eros donec. Vel turpis nunc eget lorem dolor sed viverra. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Velit laoreet id donec ultrices tincidunt arcu non sodales. Nunc aliquet bibendum enim facilisis gravida neque convallis. Massa massa ultricies mi quis hendrerit dolor magna eget. Et molestie ac feugiat sed lectus vestibulum mattis. In eu mi bibendum neque egestas congue quisque. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Non odio euismod lacinia at quis risus sed vulputate. Placerat vestibulum lectus mauris ultrices eros. Maecenas accumsan lacus vel facilisis volutpat est. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Ac tortor dignissim convallis aenean et tortor.",
              _key: "9b642c6fb1a70",
            },
          ],
        },
        {
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Sed sed risus pretium quam vulputate dignissim suspendisse. Ut diam quam nulla porttitor massa id neque aliquam vestibulum. Aliquam purus sit amet luctus venenatis. Mauris pharetra et ultrices neque ornare aenean euismod. Ut eu sem integer vitae justo eget. Est pellentesque elit ullamcorper dignissim cras tincidunt. Pellentesque nec nam aliquam sem. Lobortis scelerisque fermentum dui faucibus in. Egestas tellus rutrum tellus pellentesque eu. Mauris cursus mattis molestie a iaculis at erat. Netus et malesuada fames ac turpis egestas integer eget. Massa massa ultricies mi quis hendrerit. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Purus in mollis nunc sed id semper. Auctor elit sed vulputate mi sit amet mauris commodo quis.",
              _key: "4a18da4448f00",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "60cd359c8bbe",
        },
      ],
      slug: {
        current: "aenean-convalli-sapone-a-degnissimo-placerat",
        _type: "slug",
      },
      _createdAt: "2021-11-22T03:18:25Z",
      _id: "6d56157f-7ad0-4b82-8b93-2669c65daef6",
      categories: [
        {
          _createdAt: "2021-11-11T13:45:58Z",
          _rev: "4Xbp5us36NAn0n6sWosfBc",
          _type: "category",
          _id: "5ce52ceb-d6f0-4ea3-b14e-8087b2f73061",
          title: "TRAVEL",
          _updatedAt: "2021-11-30T12:32:15Z",
        },
      ],
      mainImage: {
        _type: "image",
        asset: {
          _ref: "image-0dcfa20067460d48780f59c2c4a7a57e7c507969-1050x701-jpg",
          _type: "reference",
        },
      },
      _rev: "3P4L9dvRTrDLmVt1DBFFsD",
      _type: "post",
      title: "Aenean convalli sapone a degnissimo placerat.",
      link: "aenean-convalli-sapone-a-degnissimo-placerat",
    },
    {
      excerpt: "Writing sample excerpt to test Grammarly.",
      authors: [
        {
          _id: "54a9cbab-1642-4a3a-8771-c308ff283382",
          _updatedAt: "2021-11-30T12:32:15Z",
          slug: {
            current: "john-doe",
            _type: "slug",
          },
          _createdAt: "2021-11-11T13:42:40Z",
          _rev: "4Xbp5us36NAn0n6sWosfBc",
          _type: "author",
          link: "john-doe",
          name: "John Doe",
        },
        {
          profile: {
            image: {
              _type: "image",
              asset: {
                _ref: "image-9e2ef55c6b161c36e48ab8a01603e0b533092756-512x512-png",
                _type: "reference",
              },
            },
            alt: "alt image",
          },
          slug: {
            current: "john-test-author",
            _type: "slug",
          },
          _createdAt: "2023-04-10T05:58:51Z",
          link: "john-test-author",
          _id: "86ef0ad3-7ff7-464f-b8af-7e46d35a3c7a",
          _rev: "wALtrn5jzuIQIY66apYys7",
          _type: "author",
          name: "John test author",
          bio: "Test bio john author",
          _updatedAt: "2023-04-10T05:59:31Z",
        },
      ],
      _id: "3b139e1b-dfc3-4a6e-bea5-3fe3b0908190",
      publishedAt: "2021-11-22T03:16:00.000Z",
      _updatedAt: "2023-05-19T08:19:56Z",
      slug: {
        current: "vestibulum-vehicle-leo-eget-libero-eleifend",
        _type: "slug",
      },
      _type: "post",
      seo: {
        seoTitle: "JOHN SEO TITLLE",
        seoSynonyms: "BLOG JOHN",
        seoDescription: "THIS IS A TEST FOR JOHN BLOG SEO DESCRIPTION",
        _type: "seoSettings",
        seoKeywords: "KEYWORD1, KEYWORD2",
      },
      body: [
        {
          markDefs: [],
          children: [
            {
              marks: [],
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis. Egestas congue quisque egestas diam. Volutpat ac tincidunt vitae semper quis. Scelerisque eleifend donec pretium vulputate sapien nec. Lacinia at quis risus sed vulputate odio ut. Sed cras ornare arcu dui vivamus arcu felis. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Urna nunc id cursus metus aliquam eleifend mi in nulla. Nunc faucibus a pellentesque sit amet porttitor. Cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum. Convallis posuere morbi leo urna molestie at elementum eu. Vulputate ut pharetra sit amet aliquam id diam. Enim ut tellus elementum sagittis vitae. Id cursus metus aliquam eleifend mi.",
              _key: "205986771a32",
              _type: "span",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "c9e6c57895ff",
        },
        {
          _type: "block",
          style: "normal",
          _key: "b4dee4825d16",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Cras semper auctor neque vitae tempus. Dignissim convallis aenean et tortor at risus viverra. Habitant morbi tristique senectus et netus et. Eleifend donec pretium vulputate sapien. Venenatis tellus in metus vulputate eu. Nisi quis eleifend quam adipiscing. Odio aenean sed adipiscing diam donec adipiscing tristique. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Habitasse platea dictumst quisque sagittis. Eget magna fermentum iaculis eu.",
              _key: "30f89aaec1670",
            },
          ],
        },
        {
          _key: "d4f1095c0eff",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Accumsan sit amet nulla facilisi morbi tempus iaculis. Semper quis lectus nulla at volutpat diam ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris. Nulla facilisi morbi tempus iaculis urna id. Morbi enim nunc faucibus a pellentesque sit amet. Id porta nibh venenatis cras sed felis eget velit. Netus et malesuada fames ac turpis egestas integer eget aliquet. Nisl purus in mollis nunc sed id semper risus in. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Bibendum enim facilisis gravida neque convallis.",
              _key: "398b3691b9060",
            },
          ],
          _type: "block",
          style: "normal",
        },
        {
          style: "normal",
          _key: "730a6d6b8e37",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Mattis rhoncus urna neque viverra justo nec. Magna sit amet purus gravida quis blandit turpis cursus. Condimentum lacinia quis vel eros donec. Vel turpis nunc eget lorem dolor sed viverra. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Velit laoreet id donec ultrices tincidunt arcu non sodales. Nunc aliquet bibendum enim facilisis gravida neque convallis. Massa massa ultricies mi quis hendrerit dolor magna eget. Et molestie ac feugiat sed lectus vestibulum mattis. In eu mi bibendum neque egestas congue quisque. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Non odio euismod lacinia at quis risus sed vulputate. Placerat vestibulum lectus mauris ultrices eros. Maecenas accumsan lacus vel facilisis volutpat est. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Ac tortor dignissim convallis aenean et tortor.",
              _key: "e3096e4252d40",
            },
          ],
          _type: "block",
        },
        {
          children: [
            {
              text: "Sed sed risus pretium quam vulputate dignissim suspendisse. Ut diam quam nulla porttitor massa id neque aliquam vestibulum. Aliquam purus sit amet luctus venenatis. Mauris pharetra et ultrices neque ornare aenean euismod. Ut eu sem integer vitae justo eget. Est pellentesque elit ullamcorper dignissim cras tincidunt. Pellentesque nec nam aliquam sem. Lobortis scelerisque fermentum dui faucibus in. Egestas tellus rutrum tellus pellentesque eu. Mauris cursus mattis molestie a iaculis at erat. Netus et malesuada fames ac turpis egestas integer eget. Massa massa ultricies mi quis hendrerit. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Purus in mollis nunc sed id semper. Auctor elit sed vulputate mi sit amet mauris commodo quis.",
              _key: "aa18a5c0566f0",
              _type: "span",
              marks: [],
            },
          ],
          _type: "block",
          style: "normal",
          _key: "37ce056f613c",
          markDefs: [],
        },
        {
          markDefs: [],
          children: [
            {
              marks: [],
              text: "Let's test out Grammarly in portable text content!!! inevitable",
              _key: "c6126a364676",
              _type: "span",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "063adec16906",
        },
      ],
      _rev: "HlYUfgLvnxhSVUqkxsDWxy",
      _createdAt: "2021-11-22T03:16:40Z",
      mainImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: "image-c4e86670adde5dac3b429e1e050799145b5bcdf1-512x512-png",
        },
      },
      title: "Vestibulum vehicle leo eget libero eleifend 2",
      categories: [
        {
          _createdAt: "2021-11-11T13:45:58Z",
          _rev: "4Xbp5us36NAn0n6sWosfBc",
          _type: "category",
          _id: "5ce52ceb-d6f0-4ea3-b14e-8087b2f73061",
          title: "TRAVEL",
          _updatedAt: "2021-11-30T12:32:15Z",
        },
        {
          _id: "49f1e1b6-9c77-4671-bc0d-43ba97977db0",
          title: "Culture",
          _updatedAt: "2021-11-30T12:32:15Z",
          _createdAt: "2021-11-22T04:45:02Z",
          _rev: "4Xbp5us36NAn0n6sWosfBc",
          _type: "category",
        },
      ],
      link: "vestibulum-vehicle-leo-eget-libero-eleifend",
    },
    {
      categories: [
        {
          _id: "5ce52ceb-d6f0-4ea3-b14e-8087b2f73061",
          title: "TRAVEL",
          _updatedAt: "2021-11-30T12:32:15Z",
          _createdAt: "2021-11-11T13:45:58Z",
          _rev: "4Xbp5us36NAn0n6sWosfBc",
          _type: "category",
        },
      ],
      _createdAt: "2021-11-22T03:18:25Z",
      title: "Aenean convalli sapone a degnissimo placerat.",
      _rev: "3P4L9dvRTrDLmVt1DBFFsD",
      _type: "post",
      mainImage: {
        _type: "image",
        asset: {
          _ref: "image-0dcfa20067460d48780f59c2c4a7a57e7c507969-1050x701-jpg",
          _type: "reference",
        },
      },
      _updatedAt: "2022-03-04T08:23:29Z",
      link: "aenean-convalli-sapone-a-degnissimo-placerat",
      authors: null,
      publishedAt: "2021-11-22T03:17:00.000Z",
      _id: "6d56157f-7ad0-4b82-8b93-2669c65daef6",
      body: [
        {
          _key: "5a3f627a777a",
          markDefs: [],
          children: [
            {
              marks: [],
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis. Egestas congue quisque egestas diam. Volutpat ac tincidunt vitae semper quis. Scelerisque eleifend donec pretium vulputate sapien nec. Lacinia at quis risus sed vulputate odio ut. Sed cras ornare arcu dui vivamus arcu felis. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Urna nunc id cursus metus aliquam eleifend mi in nulla. Nunc faucibus a pellentesque sit amet porttitor. Cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum. Convallis posuere morbi leo urna molestie at elementum eu. Vulputate ut pharetra sit amet aliquam id diam. Enim ut tellus elementum sagittis vitae. Id cursus metus aliquam eleifend mi.",
              _key: "5440e9556195",
              _type: "span",
            },
          ],
          _type: "block",
          style: "normal",
        },
        {
          _type: "block",
          style: "normal",
          _key: "74640db27da1",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Cras semper auctor neque vitae tempus. Dignissim convallis aenean et tortor at risus viverra. Habitant morbi tristique senectus et netus et. Eleifend donec pretium vulputate sapien. Venenatis tellus in metus vulputate eu. Nisi quis eleifend quam adipiscing. Odio aenean sed adipiscing diam donec adipiscing tristique. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Habitasse platea dictumst quisque sagittis. Eget magna fermentum iaculis eu.",
              _key: "1a96237a28990",
            },
          ],
        },
        {
          _key: "c84742fb3796",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Accumsan sit amet nulla facilisi morbi tempus iaculis. Semper quis lectus nulla at volutpat diam ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris. Nulla facilisi morbi tempus iaculis urna id. Morbi enim nunc faucibus a pellentesque sit amet. Id porta nibh venenatis cras sed felis eget velit. Netus et malesuada fames ac turpis egestas integer eget aliquet. Nisl purus in mollis nunc sed id semper risus in. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Bibendum enim facilisis gravida neque convallis.",
              _key: "60d8a92373280",
            },
          ],
          _type: "block",
          style: "normal",
        },
        {
          _key: "207c1c76ec00",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Mattis rhoncus urna neque viverra justo nec. Magna sit amet purus gravida quis blandit turpis cursus. Condimentum lacinia quis vel eros donec. Vel turpis nunc eget lorem dolor sed viverra. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Velit laoreet id donec ultrices tincidunt arcu non sodales. Nunc aliquet bibendum enim facilisis gravida neque convallis. Massa massa ultricies mi quis hendrerit dolor magna eget. Et molestie ac feugiat sed lectus vestibulum mattis. In eu mi bibendum neque egestas congue quisque. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Non odio euismod lacinia at quis risus sed vulputate. Placerat vestibulum lectus mauris ultrices eros. Maecenas accumsan lacus vel facilisis volutpat est. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Ac tortor dignissim convallis aenean et tortor.",
              _key: "9b642c6fb1a70",
            },
          ],
          _type: "block",
          style: "normal",
        },
        {
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Sed sed risus pretium quam vulputate dignissim suspendisse. Ut diam quam nulla porttitor massa id neque aliquam vestibulum. Aliquam purus sit amet luctus venenatis. Mauris pharetra et ultrices neque ornare aenean euismod. Ut eu sem integer vitae justo eget. Est pellentesque elit ullamcorper dignissim cras tincidunt. Pellentesque nec nam aliquam sem. Lobortis scelerisque fermentum dui faucibus in. Egestas tellus rutrum tellus pellentesque eu. Mauris cursus mattis molestie a iaculis at erat. Netus et malesuada fames ac turpis egestas integer eget. Massa massa ultricies mi quis hendrerit. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Purus in mollis nunc sed id semper. Auctor elit sed vulputate mi sit amet mauris commodo quis.",
              _key: "4a18da4448f00",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "60cd359c8bbe",
        },
      ],
      slug: {
        current: "aenean-convalli-sapone-a-degnissimo-placerat",
        _type: "slug",
      },
    },
    {
      body: [
        {
          _key: "e8ef67a7b2f1",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis. Egestas congue quisque egestas diam. Volutpat ac tincidunt vitae semper quis. Scelerisque eleifend donec pretium vulputate sapien nec. Lacinia at quis risus sed vulputate odio ut. Sed cras ornare arcu dui vivamus arcu felis. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Urna nunc id cursus metus aliquam eleifend mi in nulla. Nunc faucibus a pellentesque sit amet porttitor. Cursus metus aliquam eleifend mi in nulla posuere. Magna eget est lorem ipsum. Convallis posuere morbi leo urna molestie at elementum eu. Vulputate ut pharetra sit amet aliquam id diam. Enim ut tellus elementum sagittis vitae. Id cursus metus aliquam eleifend mi.",
              _key: "7ff7f07f5a9e",
            },
          ],
          _type: "block",
          style: "normal",
        },
        {
          markDefs: [],
          children: [
            {
              marks: [],
              text: "Cras semper auctor neque vitae tempus. Dignissim convallis aenean et tortor at risus viverra. Habitant morbi tristique senectus et netus et. Eleifend donec pretium vulputate sapien. Venenatis tellus in metus vulputate eu. Nisi quis eleifend quam adipiscing. Odio aenean sed adipiscing diam donec adipiscing tristique. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Habitasse platea dictumst quisque sagittis. Eget magna fermentum iaculis eu.",
              _key: "a169efe193a60",
              _type: "span",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "da2c70fa93c8",
        },
        {
          style: "normal",
          _key: "a28074ceffb1",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Accumsan sit amet nulla facilisi morbi tempus iaculis. Semper quis lectus nulla at volutpat diam ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris. Nulla facilisi morbi tempus iaculis urna id. Morbi enim nunc faucibus a pellentesque sit amet. Id porta nibh venenatis cras sed felis eget velit. Netus et malesuada fames ac turpis egestas integer eget aliquet. Nisl purus in mollis nunc sed id semper risus in. Parturient montes nascetur ridiculus mus mauris vitae ultricies. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Bibendum enim facilisis gravida neque convallis.",
              _key: "0d7c1a238deb0",
            },
          ],
          _type: "block",
        },
        {
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Mattis rhoncus urna neque viverra justo nec. Magna sit amet purus gravida quis blandit turpis cursus. Condimentum lacinia quis vel eros donec. Vel turpis nunc eget lorem dolor sed viverra. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Velit laoreet id donec ultrices tincidunt arcu non sodales. Nunc aliquet bibendum enim facilisis gravida neque convallis. Massa massa ultricies mi quis hendrerit dolor magna eget. Et molestie ac feugiat sed lectus vestibulum mattis. In eu mi bibendum neque egestas congue quisque. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Non odio euismod lacinia at quis risus sed vulputate. Placerat vestibulum lectus mauris ultrices eros. Maecenas accumsan lacus vel facilisis volutpat est. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Ac tortor dignissim convallis aenean et tortor.",
              _key: "7f7c59a86a040",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "f1bde5ef2cbf",
        },
        {
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "Sed sed risus pretium quam vulputate dignissim suspendisse. Ut diam quam nulla porttitor massa id neque aliquam vestibulum. Aliquam purus sit amet luctus venenatis. Mauris pharetra et ultrices neque ornare aenean euismod. Ut eu sem integer vitae justo eget. Est pellentesque elit ullamcorper dignissim cras tincidunt. Pellentesque nec nam aliquam sem. Lobortis scelerisque fermentum dui faucibus in. Egestas tellus rutrum tellus pellentesque eu. Mauris cursus mattis molestie a iaculis at erat. Netus et malesuada fames ac turpis egestas integer eget. Massa massa ultricies mi quis hendrerit. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Purus in mollis nunc sed id semper. Auctor elit sed vulputate mi sit amet mauris commodo quis.",
              _key: "47e6b00ada470",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "5e3db3385255",
        },
      ],
      title: "Lorem ipsum dolor sit amet",
      _updatedAt: "2023-04-27T10:11:20Z",
      _id: "fac21b4f-0e82-4435-8296-1935f13aad00",
      authors: null,
      _createdAt: "2021-11-22T03:12:20Z",
      publishedAt: "2021-11-22T03:13:00.000Z",
      _type: "post",
      _rev: "4MfBp9HJw6JHUbUYbiAwQ9",
      slug: {
        current: "lorem-ipsum-dolor-sit-amet",
        _type: "slug",
      },
      excerpt: "Excerpt",
      categories: [
        {
          _updatedAt: "2021-11-30T12:32:15Z",
          _createdAt: "2021-11-11T13:45:58Z",
          _rev: "4Xbp5us36NAn0n6sWosfBc",
          _type: "category",
          _id: "5ce52ceb-d6f0-4ea3-b14e-8087b2f73061",
          title: "TRAVEL",
        },
      ],
      mainImage: {
        _type: "image",
        asset: {
          _ref: "image-fc4752283bb0c4bf2d6f2b71411407315298952d-968x726-jpg",
          _type: "reference",
        },
      },
      link: "lorem-ipsum-dolor-sit-amet",
    },
    {
      slug: {
        current: "storybook123131",
        _type: "slug",
      },
      _id: "cb22faf1-e573-4687-a64d-806fbd1f1f08",
      title: "storybook123131",
      categories: null,
      _updatedAt: "2023-12-01T04:16:54Z",
      _createdAt: "2023-12-01T04:16:54Z",
      _rev: "0QxCyTOszThJlOkgJPF6KP",
      _type: "post",
      body: [
        {
          _key: "f8ac87765a16",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "HEADING 1",
              _key: "f42dc8d3e0a4",
            },
          ],
          _type: "block",
          style: "h1",
        },
        {
          style: "h2",
          _key: "b417cb7090bc",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "HEADING 2",
              _key: "2c2c7128f97b",
            },
          ],
          _type: "block",
        },
        {
          children: [
            {
              _type: "span",
              marks: [],
              text: "HEADING 3",
              _key: "2337119dbcb1",
            },
          ],
          _type: "block",
          style: "h3",
          _key: "ad34db1c3525",
          markDefs: [],
        },
        {
          markDefs: [],
          children: [
            {
              marks: [],
              text: "HEADING 4",
              _key: "dec6b74519d0",
              _type: "span",
            },
          ],
          _type: "block",
          style: "h4",
          _key: "bbab146032b2",
        },
        {
          _key: "239646e78fc6",
          markDefs: [],
          children: [
            {
              marks: [],
              text: "HEADING 5",
              _key: "0a0c3e8bc480",
              _type: "span",
            },
          ],
          _type: "block",
          style: "h5",
        },
        {
          children: [
            {
              _type: "span",
              marks: [],
              text: "HEADING 6",
              _key: "d881c4d39fca",
            },
          ],
          _type: "block",
          style: "h6",
          _key: "08fa2f984436",
          markDefs: [],
        },
        {
          _type: "block",
          style: "normal",
          _key: "ea22d35fa1d3",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "NORMAL",
              _key: "c458f2c92e27",
            },
          ],
        },
        {
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "QUOTE",
              _key: "d61f8c35a3fb",
            },
          ],
          _type: "block",
          style: "blockquote",
          _key: "f60ae408a058",
        },
        {
          _type: "block",
          style: "normal",
          _key: "65e772060815",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: ["strong"],
              text: "BOLD",
              _key: "a6460f75d492",
            },
          ],
        },
        {
          style: "normal",
          _key: "86cef5cb63e7",
          markDefs: [],
          children: [
            {
              _key: "f435a6764b5c",
              _type: "span",
              marks: ["em"],
              text: "ITALLIC",
            },
          ],
          _type: "block",
        },
        {
          _type: "block",
          style: "normal",
          _key: "325d77f88b83",
          markDefs: [],
          children: [
            {
              _key: "19590af93e17",
              _type: "span",
              marks: ["code"],
              text: "CODE CONST CODE = 'CODE'",
            },
          ],
        },
        {
          style: "normal",
          _key: "07adec312ae2",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: ["underline"],
              text: "UNDERLINE",
              _key: "358696e25375",
            },
          ],
          _type: "block",
        },
        {
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: ["strike-through"],
              text: "STRIKETHROUGH",
              _key: "e2d550a845a6",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "9811c7d767d4",
        },
        {
          children: [
            {
              marks: [],
              text: "BULLET LIST",
              _key: "deb3cb40b7ff",
              _type: "span",
            },
          ],
          level: 1,
          _type: "block",
          style: "normal",
          _key: "eef4cc3e455f",
          listItem: "bullet",
          markDefs: [],
        },
        {
          _type: "block",
          style: "normal",
          _key: "678510963694",
          listItem: "bullet",
          markDefs: [],
          children: [
            {
              text: "BULLET LIST",
              _key: "e73fcc29c657",
              _type: "span",
              marks: [],
            },
          ],
          level: 1,
        },
        {
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "",
              _key: "f1e056ed85df",
            },
          ],
          _type: "block",
          style: "normal",
          _key: "0fb7252fafa3",
        },
        {
          _type: "block",
          style: "normal",
          _key: "fee037f3743a",
          listItem: "number",
          markDefs: [],
          children: [
            {
              marks: [],
              text: "NUMBERED LIST",
              _key: "7be4ccb7427c",
              _type: "span",
            },
          ],
          level: 1,
        },
        {
          listItem: "number",
          markDefs: [],
          children: [
            {
              _type: "span",
              marks: [],
              text: "NUMBERED LIST",
              _key: "c5c48bf5e318",
            },
          ],
          level: 1,
          _type: "block",
          style: "normal",
          _key: "e9101924b8ff",
        },
        {
          _key: "4c96ebeb157b",
          markDefs: [
            {
              _type: "link",
              href: "www.webriq.com",
              _key: "d54543494a89",
            },
          ],
          children: [
            {
              marks: ["d54543494a89"],
              text: "LINK",
              _key: "ef34ef7aa86d",
              _type: "span",
            },
          ],
          _type: "block",
          style: "normal",
        },
        {
          image: {
            _type: "image",
            asset: {
              _ref: "image-1e219ce741bbbf80ad7556287dc0a482a2b657f7-1024x1024-png",
              _type: "reference",
            },
          },
          _type: "addImage",
          alt: "IMAGE",
          _key: "b03bf7d4f44b",
        },
      ],
      link: "storybook123131",
      authors: null,
    },
  ],
  primaryButton: {
    type: "linkInternal",
    internalLink: "w-studio-personalized-marketing",
    externalLink: null,
    linkInternal: {
      _ref: "000d12e0-2d75-4f90-81e5-df848fd138f1",
      _type: "reference",
    },
    linkTarget: "_blank",
    _type: "conditionalLink",
    linkType: "linkInternal",
    label: "View More Articles",
  },
};

const meta = {
  title: "Sections/Blog",
  component: BlogComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <BlogComponent data={data} />;
  },
} satisfies Meta<typeof BlogComponent> & any;

export default meta;
type Story = StoryObj<Sections>;

const filterArgs = (variant: string) => {
  return {
    args: {
      variant: variant,
      ...filterArgsByVariant(blogSchema, args, variant),
    },
  };
};

export const variant_a: Story = filterArgs("variant_a");
export const variant_b: Story = filterArgs("variant_b");
export const variant_c: Story = filterArgs("variant_c");
export const variant_d: Story = filterArgs("variant_d");
