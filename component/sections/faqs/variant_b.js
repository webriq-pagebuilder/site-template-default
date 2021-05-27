import React from "react"

function VariantB({ subtitle, title, faqsWithCategories }) {
  const [view, setView] = React.useState([])
  const category = faqsWithCategories?.map(faq => faq?.category)
  const [tabPane, setTabPane] = React.useState(category?.[0])

  React.useState(() => {
    faqsWithCategories &&
      faqsWithCategories.map(faq => {
        setView(prevState => [...prevState, { items: faq.askedQuestions }])
      })
  }, [])

  // const toggleView = position => {
  //   let newFaq = [...view]
  //   newFaq[position].hidden = !view[position].hidden
  //   setView(newFaq)
  // }

  const tabPanes = pane => {
    setTabPane(pane)
  }

  const renderTabPane = () => {
    if (
      faqsWithCategories?.[0] &&
      tabPane === faqsWithCategories[0]?.category
    ) {
      return (
        <ul>
          {view?.[0]?.items &&
            view[0].items?.map(faq => (
              <li className="py-12 pr-4 border-b" key={faq?._key}>
                <button
                  className="w-full flex justify-between focus:outline-none items-center text-left font-bold font-heading hover:text-gray-600"
                  //onClick={() => toggleView(index)}
                >
                  <span className="text-xl">{faq?.question}</span>
                  {/* <svg
                    className="w-4 h-4 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        view[1].hidden === false
                          ? "M19 14l-7 7m0 0l-7-7m7 7V3"
                          : "M5 10l7-7m0 0l7 7m-7-7v18"
                      }
                    />
                  </svg> */}
                </button>
                <p className="mt-4 text-gray-400 font-normal leading-loose">
                  {faq?.answer}
                </p>
              </li>
            ))}
        </ul>
      )
    } else if (
      faqsWithCategories?.[1] &&
      tabPane === faqsWithCategories[1]?.category
    ) {
      return (
        <ul>
          {view?.[1]?.items &&
            view[1].items?.map(faq => (
              <li className="py-12 pr-4 border-b" key={faq?._key}>
                <button
                  className="w-full flex justify-between focus:outline-none items-center text-left font-bold font-heading hover:text-gray-600"
                  //onClick={() => toggleView(index)}
                >
                  <span className="text-xl">{faq?.question}</span>
                  {/* <svg
                    className="w-4 h-4 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        view[1].hidden === false
                          ? "M19 14l-7 7m0 0l-7-7m7 7V3"
                          : "M5 10l7-7m0 0l7 7m-7-7v18"
                      }
                    />
                  </svg> */}
                </button>
                <p className="mt-4 text-gray-400 font-normal leading-loose">
                  {faq?.answer}
                </p>
              </li>
            ))}
        </ul>
      )
    } else if (
      faqsWithCategories?.[2] &&
      tabPane === faqsWithCategories[2]?.category
    ) {
      return (
        <ul>
          {view?.[2]?.items &&
            view[2].items?.map(faq => (
              <li className="py-12 pr-4 border-b" key={faq?._key}>
                <button
                  className="w-full flex justify-between focus:outline-none items-center text-left font-bold font-heading hover:text-gray-600"
                  //onClick={() => toggleView(index)}
                >
                  <span className="text-xl">{faq?.question}</span>
                  {/* <svg
                    className="w-4 h-4 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        view[2].hidden === false
                          ? "M19 14l-7 7m0 0l-7-7m7 7V3"
                          : "M5 10l7-7m0 0l7 7m-7-7v18"
                      }
                    />
                  </svg> */}
                </button>
                <p className="mt-4 text-gray-400 font-normal leading-loose">
                  {faq?.answer}
                </p>
              </li>
            ))}
        </ul>
      )
    } else if (
      faqsWithCategories?.[3] &&
      tabPane === faqsWithCategories[3]?.category
    ) {
      return (
        <ul>
          {view?.[3]?.items &&
            view[3].items?.map(faq => (
              <li className="py-12 pr-4 border-b" key={faq?._key}>
                <button
                  className="w-full flex justify-between focus:outline-none items-center text-left font-bold font-heading hover:text-gray-600"
                  //onClick={() => toggleView(index)}
                >
                  <span className="text-xl">{faq?.question}</span>
                  {/* <svg
                    className="w-4 h-4 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        view[3].hidden === false
                          ? "M19 14l-7 7m0 0l-7-7m7 7V3"
                          : "M5 10l7-7m0 0l7 7m-7-7v18"
                      }
                    />
                  </svg> */}
                </button>
                <p className="mt-4 text-gray-400 font-normal leading-loose">
                  {faq?.answer}
                </p>
              </li>
            ))}
        </ul>
      )
    }
  }
  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="border-b">
          <div className="mb-16 max-w-xl mx-auto px-4 text-center">
            <span className="text-green-600 font-bold">{subtitle}</span>
            <h2 className="text-4xl lg:text-5xl font-bold font-heading">
              {title}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap px-4 text-center lg:-mx-4 lg:space-x-4 text-base lg:text-xl">
              {faqsWithCategories?.[0] && (
                <button
                  onClick={() => tabPanes(faqsWithCategories[0]?.category)}
                  className={
                    tabPane === faqsWithCategories[0]?.category
                      ? "px-4 py-4 w-full md:w-1/2 lg:w-auto font-bold text-green-600 border-b-2 border-green-600"
                      : "px-4 py-4 w-full md:w-1/2 lg:w-auto font-bold text-gray-400 hover:text-green-600 border-b-2 border-transparent hover:border-green-600 transition duration-150"
                  }
                >
                  {faqsWithCategories[0]?.category}
                </button>
              )}
              {faqsWithCategories?.[1] && (
                <button
                  onClick={() => tabPanes(faqsWithCategories[1]?.category)}
                  className={
                    tabPane === faqsWithCategories[1]?.category
                      ? "px-4 py-4 w-full md:w-1/2 lg:w-auto font-bold text-green-600 border-b-2 border-green-600"
                      : "px-4 py-4 w-full md:w-1/2 lg:w-auto font-bold text-gray-400 hover:text-green-600 border-b-2 border-transparent hover:border-green-600 transition duration-150"
                  }
                >
                  {faqsWithCategories[1]?.category}
                </button>
              )}
              {faqsWithCategories?.[2] && (
                <button
                  onClick={() => tabPanes(faqsWithCategories[2]?.category)}
                  className={
                    tabPane === faqsWithCategories[2]?.category
                      ? "px-4 py-4 w-full md:w-1/2 lg:w-auto font-bold text-green-600 border-b-2 border-green-600"
                      : "px-4 py-4 w-full md:w-1/2 lg:w-auto font-bold text-gray-400 hover:text-green-600 border-b-2 border-transparent hover:border-green-600 transition duration-150"
                  }
                >
                  {faqsWithCategories[2]?.category}
                </button>
              )}
              {faqsWithCategories?.[3] && (
                <button
                  onClick={() => tabPanes(faqsWithCategories[3]?.category)}
                  className={
                    tabPane === faqsWithCategories[3]?.category
                      ? "px-4 py-4 w-full md:w-1/2 lg:w-auto font-bold text-green-600 border-b-2 border-green-600"
                      : "px-4 py-4 w-full md:w-1/2 lg:w-auto font-bold text-gray-400 hover:text-green-600 border-b-2 border-transparent hover:border-green-600 transition duration-150"
                  }
                >
                  {faqsWithCategories[3]?.category}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">{renderTabPane()}</div>
        </div>
      </div>
    </section>
  )
}
export default React.memo(VariantB)
