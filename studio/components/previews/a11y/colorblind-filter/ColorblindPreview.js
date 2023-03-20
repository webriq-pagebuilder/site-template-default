/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state, react/prop-types */
import React from "react"
import { Select } from "@sanity/ui" 
//import filters from "./filters.svg"

const FILTER_ITEMS = [
  { title: "Protanopia", value: "protanopia" },
  { title: "Deuteranopia", value: "deuteranopia" },
  { title: "Tritanopia", value: "tritanopia" },
  { title: "Achromatopsia", value: "achromatopsia" },
  { title: "Protanomaly", value: "protanomaly" },
  { title: "Deuteranomaly", value: "deuteranomaly" },
  { title: "Tritanomaly", value: "tritanomaly" },
  { title: "Achromatomaly", value: "achromatomaly" },
  { title: "No filter", value: null },
]

const assembleProjectUrl = ({ displayed, options }) => {
  const { slug } = displayed
  const { previewURL } = options
  if (!slug || !previewURL) {
    console.warn("Missing slug or previewURL", { slug, previewURL })
    return ""
  }
  return `${previewURL}${slug.current}`
}

function ColorblindPreview (props) {
  const { document, options } = props
  const { displayed } = document

  const [activeFilter, setActiveFilter] = React.useState({
    value: FILTER_ITEMS[0]?.title,
  })
  const url = assembleProjectUrl({ displayed, options })

  // const filterStyle = {
  //   filter: activeFilter?.value
  //     ? `url('${filters}#${activeFilter?.value}')`
  //     : "none",
  // }

  const handleFilterChange = (filter) => {
    setActiveFilter({ value: filter })
  }

  if (!displayed) {
    return (
      <div className="componentWrapper">
        <p>There is no document to preview</p>
      </div>
    )
  }

  if (!url) {
    return (
      <div className="componentWrapper">
        <p>Hmm. Having problems constructing the web front-end URL.</p>
      </div>
    )
  }

  return (
    <div className="componentWrapper">
      <div className="filterDropdown">
        <label className="dropdownLabel" htmlFor={"select-filter"}>
          Select a filter:
        </label>
        <Select
          fontSize={2}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          {FILTER_ITEMS?.map((filter, index) => (
            <option key={index} value={filter.title}>
              {filter.title}
            </option>
          ))}
        </Select>
      </div>
      <div 
        className="iframeContainer" 
        //style={filterStyle}
      >
        <iframe src={url} />
      </div>
    </div>
  )
}

export default ColorblindPreview