import React from "react";

function VariantA({ subtitle, title, faqs }) {
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [faqsPerPage] = React.useState(6);
  const [searchTerm, setSearchTerm] = React.useState(null);

  // React state that adds the "hidden" property to the existing object
  React.useState(() => {
    faqs &&
      faqs.map((faq) =>
        setData((prevState) => [
          ...prevState,
          { question: faq?.question, answer: faq?.answer, hidden: false },
        ])
      );
  }, []);

  // toggle view or hide answers on click for each FAQ items
  const toggleView = (position) => {
    let newFaq = [...data];
    newFaq[position].hidden = !data[position].hidden;
    setData(newFaq);
  };

  // get current FAQs
  const indexOfLastQuestion = currentPage * faqsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - faqsPerPage;
  const searchedFAQs = !searchTerm
    ? data?.slice(indexOfFirstQuestion, indexOfLastQuestion)
    : data?.filter((items) =>
        items?.question?.toLowerCase().includes(searchTerm)
      ); // get search results based on data

  // display FAQs
  const FAQs = ({ items }) => {
    return (
      <ul className="space-y-4 lg:space-y-6">
        {items?.map((faq, index) => (
          <li className="p-6 bg-gray-50 rounded shadow" key={index}>
            <button
              aria-label={`Show Question-${
                index + indexOfFirstQuestion
              } Answer`}
              className="w-full flex justify-between focus:outline-none items-center text-left font-bold font-heading hover:text-gray-600 border-none"
              onClick={() => toggleView(index + indexOfFirstQuestion)}
            >
              <span className="text-xl">{faq?.question}</span>
              <svg
                className="w-4 h-4 text-webriq-darkblue"
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
                    !searchTerm
                      ? faq?.hidden === false
                        ? "M19 14l-7 7m0 0l-7-7m7 7V3"
                        : "M5 10l7-7m0 0l7 7m-7-7v18"
                      : "M19 14l-7 7m0 0l-7-7m7 7V3"
                  }
                />
              </svg>
            </button>
            {!searchTerm ? (
              <p
                className={`${
                  faq?.hidden === false ? "hidden" : null
                } mt-4 text-gray-500 font-normal leading-loose`}
              >
                {faq?.answer}
              </p>
            ) : (
              <p className="mt-4 text-gray-500 font-normal leading-loose">
                {faq?.answer}
              </p>
            )}
          </li>
        ))}
      </ul>
    );
  };

  // pagination
  const Pagination = ({ faqsPerPage, totalFaqs, changePage }) => {
    const pageButtons = [];

    for (let i = 1; i <= Math.ceil(totalFaqs / faqsPerPage); i++) {
      pageButtons.push(i);
    }

    return (
      <div className="mb-16 flex justify-center space-x-4">
        {pageButtons?.map((buttonNumber) => (
          <button
            aria-label={`Page ${buttonNumber} button`}
            key={buttonNumber}
            className="inline-block h-2 w-2 bg-webriq-blue rounded-full"
            onClick={() => changePage(buttonNumber)}
          />
        ))}
      </div>
    );
  };

  // change page
  const changePage = (buttonNumber) => setCurrentPage(buttonNumber);

  return (
    <section>
      <div className="py-20 bg-gray-50 radius-for-skewed">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-xl mx-auto text-center">
            <span className="text-webriq-darkblue font-bold font-heading">
              {subtitle}
            </span>
            <h1 className="mb-6 text-5xl font-bold font-heading">{title}</h1>
            {faqs && faqs?.length > 1 && (
              <form className="flex justify-center">
                <input
                  aria-label="Enter question keyword to search"
                  className="w-2/3 p-4 text-xs font-heading bg-white focus:border-gray-500 focus:outline-none rounded-l"
                  placeholder="Search, find any question you want to ask..."
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
                <button
                  aria-label="Search button"
                  className="pr-4 rounded-r-lg bg-white text-webriq-darkblue"
                >
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
          {!searchTerm && data?.length > 6 ? (
            <Pagination
              faqsPerPage={faqsPerPage}
              totalFaqs={data?.length}
              changePage={changePage}
            />
          ) : null}
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4 lg:space-y-6">
              {data && <FAQs items={searchedFAQs} />}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
