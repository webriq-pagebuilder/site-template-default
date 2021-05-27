import React from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { homeQuery } from "./api/query"
import { getClient, usePreviewSubscription } from "../lib/sanity"

const Components = {
  navigation: dynamic(() => import("../component/sections/navigation")),
  header: dynamic(() => import("../component/sections/hero")),
  pricing: dynamic(() => import("../component/sections/pricing")),
  features: dynamic(() => import("../component/sections/features")),
  team: dynamic(() => import("../component/sections/team")),
  blog: dynamic(() => import("../component/sections/blog")),
  portfolio: dynamic(() => import("../component/sections/portfolio")),
  callToAction: dynamic(() => import("../component/sections/call_to_action")),
  newsletter: dynamic(() => import("../component/sections/newsletter")),
  testimonial: dynamic(() => import("../component/sections/testimonials")),
  logoCloud: dynamic(() => import("../component/sections/logoCloud")),
  howItWorks: dynamic(() => import("../component/sections/how_it_works")),
  faqs: dynamic(() => import("../component/sections/faqs")),
  contact: dynamic(() => import("../component/sections/contact")),
  appPromo: dynamic(() => import("../component/sections/app_promo")),
  stats: dynamic(() => import("../component/sections/stats")),
  cookies: dynamic(() => import("../component/sections/cookies")),
  footer: dynamic(() => import("../component/sections/footer")),
}

function Home({ data, preview }) {
  const { data: page } = usePreviewSubscription(homeQuery, {
    initialData: data,
    enabled: preview,
  })

  const pageData = page?.page?.[0] || page[0]
  if (!pageData) {
    return null
  }

  const { sections, title } = pageData

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {sections?.map(section => {
        const Component = Components[section._type]
        return (
          <Component
            key={section._key}
            template={{
              bg: "gray",
              color: "green",
            }}
            data={section}
          />
        )
      })}
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const page = await getClient(preview).fetch(homeQuery)

  return {
    props: {
      preview,
      data: { page },
    },
  }
}

export default React.memo(Home)
