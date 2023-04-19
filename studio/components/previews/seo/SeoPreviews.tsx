import React from "react"
import FacebookShare from "./FacebookShare"
import GoogleSearchResult from "./GoogleSearchResults"
import LinkedinPost from "./LinkedInPost"
import TwitterCard from "./TwitterCard"


function SeoPreviews(props) {
  const { options, document } = props

  return (
    <>
      <GoogleSearchResult document={document?.displayed} options={options} />
      <TwitterCard document={document?.displayed} options={options} />
      <FacebookShare document={document?.displayed} options={options} />
      <LinkedinPost document={document?.displayed} options={options} />
    </>
  )
}

export default SeoPreviews
