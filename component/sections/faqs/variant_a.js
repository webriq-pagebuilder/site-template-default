import React, { useState } from "react"

function VariantA({ subtitle, title, faqs }) {
  const [view, setView] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useState(() => {
    faqs &&
      faqs.map(faq =>
        setView(prevState => [
          ...prevState,
          { question: faq?.question, answer: faq?.answer, hidden: false },
        ])
      )
  }, [])

  const results = !searchTerm
    ? view
    : view.filter(items =>
        items.question.toLowerCase().includes(searchTerm.toLowerCase())
      )

  const toggleView = position => {
    let newFaq = [...view]
    newFaq[position].hidden = !view[position].hidden
    setView(newFaq)
  }

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-xl mx-auto text-center">
            <span className="text-green-600 font-bold font-heading">
              {subtitle}
            </span>
            <h2 className="mb-6 text-5xl font-bold font-heading">{title}</h2>
            {faqs && faqs.length > 1 && (
              <form className="flex justify-center">
                <input
                  className="w-2/3 p-4 text-xs font-heading bg-white focus:border-gray-500 focus:outline-none rounded-l"
                  placeholder="Search, find any question you want to ask..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="pr-4 rounded-r-lg bg-white text-green-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"}
                    />
                  </svg>
                </button>
              </form>
            )}
          </div>
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4 lg:space-y-6">
              {view &&
                (searchTerm !== undefined
                  ? results.map((item, key) => (
                      <li className="p-6 bg-gray-50 rounded shadow" key={key}>
                        <button
                          className="w-full flex justify-between  focus:outline-none items-center text-left font-bold font-heading hover:text-gray-600 border-none"
                          onClick={() => toggleView(key)}
                        >
                          <span className="text-xl">{item?.question}</span>
                          <svg
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
                                item.hidden === false
                                  ? "M19 14l-7 7m0 0l-7-7m7 7V3"
                                  : "M5 10l7-7m0 0l7 7m-7-7v18"
                              }
                            />
                          </svg>
                        </button>
                        <p
                          className={`${
                            item.hidden === false ? "hidden" : null
                          } mt-4 text-gray-400 font-normal leading-loose`}
                        >
                          {item?.answer}
                        </p>
                      </li>
                    ))
                  : view.map((faq, index) => (
                      <li className="p-6 bg-gray-50 rounded shadow" key={index}>
                        <button
                          className="w-full flex justify-between  focus:outline-none items-center text-left font-bold font-heading hover:text-gray-600 border-none"
                          onClick={() => toggleView(index)}
                        >
                          <span className="text-xl">{faq?.question}</span>
                          <svg
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
                                faq.hidden === false
                                  ? "M19 14l-7 7m0 0l-7-7m7 7V3"
                                  : "M5 10l7-7m0 0l7 7m-7-7v18"
                              }
                            />
                          </svg>
                        </button>
                        <p
                          className={`${
                            faq.hidden === false ? "hidden" : null
                          } mt-4 text-gray-400 font-normal leading-loose`}
                        >
                          {faq?.answer}
                        </p>
                      </li>
                    )))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
export default React.memo(VariantA)
