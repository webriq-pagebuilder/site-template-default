import React from "react"

function VariantB({
  contactDescription,
  officeInformation,
  contactNumber,
  contactEmail,
  socialLinks,
}) {
  return (
    <section>
    <div className="skew skew-top mr-for-radius">
      <svg className="h-8 md:h-12 lg:h-20 w-full text-gray-50" viewBox="0 0 10 10" preserveAspectRatio="none">
        <polygon fill="currentColor" points="0 0 10 10 0 10" />
      </svg>
    </div>
    <div className="skew skew-top ml-for-radius">
      <svg className="h-8 md:h-12 lg:h-20 w-full text-gray-50" viewBox="0 0 10 10" preserveAspectRatio="none">
        <polygon fill="currentColor" points="0 10 10 0 10 10" />
      </svg>
    </div>
    <div className="py-20 bg-gray-50 radius-for-skewed">
      <div className="container mx-auto px-4">
        <div className="mb-16 max-w-md mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading">Contact</h2>
          <p className="text-gray-500">{contactDescription}</p>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="mb-8 lg:mb-0 w-full lg:w-1/3 px-4">
            <div className="py-12 lg:py-20 rounded bg-white shadow text-center">
              <h3 className="mb-8 lg:mb-20 text-3xl font-bold font-heading">Office</h3>
              <p className="text-gray-400">{officeInformation}</p>
              {/* <p className="text-gray-400">Valley Road, NY</p> */}
            </div>
          </div>
          <div className="mb-8 lg:mb-0 w-full lg:w-1/3 px-4">
            <div className="py-12 lg:py-20 rounded bg-white shadow text-center">
              <h3 className="mb-8 lg:mb-20 text-3xl font-bold font-heading">Contacts</h3>
              <p className="text-gray-400">{contactEmail}</p>
              <p className="text-gray-400">{contactNumber}</p>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4 flex items-stretch">
            <div className="py-12 lg:py-20 w-full rounded bg-white shadow text-center">
              <h3 className="mb-8 lg:mb-20 text-3xl font-bold font-heading">Socials</h3>
              {
                socialLinks && Object.values(socialLinks)?.map(link => 
                    <p>{link}</p>
                  )
              }
              {/* <div className="flex justify-center"><a className="mr-3" href="#"><img className="w-8 h-8" src="atis-assets/social/facebook.svg" alt="" /></a><a className="mr-3" href="#"><img className="w-8 h-8" src="atis-assets/social/twitter.svg" alt="" /></a><a href="#"><img className="w-8 h-8" src="atis-assets/social/instagram.svg" alt="" /></a></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="skew skew-bottom mr-for-radius">
      <svg className="h-8 md:h-12 lg:h-20 w-full text-gray-50" viewBox="0 0 10 10" preserveAspectRatio="none">
        <polygon fill="currentColor" points="0 0 10 0 0 10" />
      </svg>
    </div>
    <div className="skew skew-bottom ml-for-radius">
      <svg className="h-8 md:h-12 lg:h-20 w-full text-gray-50" viewBox="0 0 10 10" preserveAspectRatio="none">
        <polygon fill="currentColor" points="0 0 10 0 10 10" />
      </svg>
    </div>
  </section>
  )
}

export default React.memo(VariantB)
