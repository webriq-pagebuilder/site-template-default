import React from "react";
import { FAQProps } from ".";
import { Button, Heading, Text, Card } from "components/ui";
import { Flex, Container } from "components/layout/index";

function VariantA({ subtitle, title, faqs }: FAQProps) {
  const [show, setShow] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [faqsPerPage] = React.useState(6);
  const [searchTerm, setSearchTerm] = React.useState(null);

  const updatedFAQArray = faqs?.map((items) => ({ ...items, hidden: true }));

  // toggle view or hide answers on click for each FAQ items
  const toggleView = (position) => {
    setActiveTab(position);
    setShow(!show);
  };

  // get current FAQs
  const indexOfLastQuestion = currentPage * faqsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - faqsPerPage;
  const searchedFAQs = !searchTerm
    ? updatedFAQArray?.slice(indexOfFirstQuestion, indexOfLastQuestion)
    : updatedFAQArray?.filter(
        (items) => items?.question?.toLowerCase().includes(searchTerm)
      ); // get search results based on data

  // change page
  const changePage = (buttonNumber) => setCurrentPage(buttonNumber);

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <Container maxWidth={576} className="mb-16 text-center ">
          {subtitle && (
            <Text weight="bold" className="text-primary">
              {subtitle}
            </Text>
          )}
          {title && <Heading className="mb-6 ">{title}</Heading>}
          {updatedFAQArray && updatedFAQArray?.length > 1 && (
            <form className="flex justify-center">
              <input
                aria-label="Search, find any question you want to ask..."
                className="w-2/3 p-4 text-xs bg-white rounded-l font-heading focus:border-gray-500 focus:outline-none"
                placeholder="Search, find any question you want to ask..."
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
              <Button
                as="button"
                variant="unstyled"
                ariaLabel="Search button"
                className="pr-4 bg-white rounded-r-lg text-primary"
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
              </Button>
            </form>
          )}
        </Container>
        {!searchTerm && updatedFAQArray?.length > 6 && (
          <Pagination
            faqsPerPage={faqsPerPage}
            totalFaqs={updatedFAQArray?.length}
            changePage={changePage}
          />
        )}
        <Container maxWidth={768}>
          <ul className="space-y-4 lg:space-y-6">
            {updatedFAQArray && (
              <FAQs
                items={searchedFAQs}
                toggleView={toggleView}
                indexOfFirstQuestion={indexOfFirstQuestion}
                show={show}
                activeTab={activeTab}
              />
            )}
          </ul>
        </Container>
      </Container>
    </section>
  );
}

const FAQs = ({ items, toggleView, indexOfFirstQuestion, show, activeTab }) => {
  return (
    <>
      {items?.map((faq, index) => (
        <li key={index}>
          <Card className="p-6 bg-gray-50">
            <Button
              variant="unstyled"
              as="button"
              ariaLabel={faq?.question}
              className="flex items-center justify-between w-full font-bold text-left border-none font-heading hover:text-gray-600 focus:outline-none"
              onClick={() => toggleView(index + indexOfFirstQuestion)}
            >
              <span className="text-xl">{faq?.question}</span>
              <svg
                className="w-4 h-4 text-primary"
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
                    show && activeTab === index
                      ? "M5 10l7-7m0 0l7 7m-7-7v18"
                      : "M19 14l-7 7m0 0l-7-7m7 7V3"
                  }
                />
              </svg>
            </Button>

            {show && activeTab === index && (
              <Text
                muted
                className={`mt-4 leading-loose0 ${!show && "hidden"}`}
              >
                {faq?.answer}
              </Text>
            )}
          </Card>
        </li>
      ))}
    </>
  );
};

// pagination
const Pagination = ({ faqsPerPage, totalFaqs, changePage }) => {
  const pageButtons = [];

  for (let i = 1; i <= Math.ceil(totalFaqs / faqsPerPage); i++) {
    pageButtons.push(i);
  }

  return (
    <Flex justify="center" className="mb-16 space-x-4">
      {pageButtons?.map((buttonNumber) => (
        <Button
          variant="unstyled"
          as="button"
          ariaLabel={`Page ${buttonNumber}`}
          key={buttonNumber}
          className="inline-block w-2 h-2 rounded-full bg-primary-foreground"
          onClick={() => changePage(buttonNumber)}
        />
      ))}
    </Flex>
  );
};
export default React.memo(VariantA);
