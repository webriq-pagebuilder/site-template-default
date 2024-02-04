import React from "react";
import { urlFor } from "lib/sanity";
import { TestimonialProps } from ".";
import { SwiperButton } from "components/ui/SwiperButton/SwiperButton";
import { Avatar } from "components/ui/Avatar";
import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import { Heading } from "components/ui/Heading";

function VariantC({ caption, title, testimonials }: TestimonialProps) {
  const [testimony, setTestimony] = React.useState(testimonials);

  const slider = (action) => {
    if (action === "next") {
      // Remove first element
      let firstItem = testimony?.shift();

      // Push the deleted element to last index
      setTestimony((prevState) => [...prevState, firstItem]);
    } else if (action === "prev") {
      // Remove last element
      let lastItem = testimony?.pop();

      // Push the deleted element to first index
      setTestimony((prevState) => [lastItem, ...prevState]);
    }
  };

  return (
    <section className="py-10 overflow-hidden bg-gray-50 lg:py-20">
      <Container className="pb-6 lg:pb-16">
        <Flex
          wrap
          align="center"
          className="justify-center text-center lg:justify-between lg:text-left"
        >
          <div className="w-full mb-4 lg:mb-0 lg:w-4/5">
            <Text weight="bold" color="primary">
              {caption}
            </Text>
            <Heading>{title}</Heading>
          </div>
          <div className="w-full lg:w-1/5">
            {testimony?.length >= 4 && (
              <SwiperButton
                type="left"
                className="order-last p-5 mr-4 lg:order-first"
                onClick={() => slider("prev")}
                ariaLabel="Show previous testimonial"
              />
            )}
            {testimony?.length >= 4 && (
              <SwiperButton
                type="right"
                className="order-last p-5"
                onClick={() => slider("next")}
                ariaLabel="Show next testimonial"
              />
            )}
          </div>
        </Flex>
      </Container>
      <div className="relative flex">
        {testimony && (
          <div className="flex flex-wrap max-w-6xl px-2 mx-auto">
            {testimony?.slice(0, 3)?.map((item, index) => (
              <div className="w-full px-3 mb-4 lg:w-1/3" key={index}>
                <Card className="p-8 text-center ">
                  <Text className="mb-8 leading-loose" muted>
                    {item?.testimony}
                  </Text>
                  {item?.mainImage?.image && (
                    <Avatar
                      size={48}
                      className="mx-auto border-0"
                      src={urlFor(item?.mainImage?.image)}
                      alt={
                        item?.mainImage?.alt ??
                        `testimonial-source-${item?.name}-profile-image`
                      }
                    />
                  )}
                  <Text className="mb-1 text-2xl " weight="bold">
                    {item?.name}
                  </Text>
                  <Text muted>{item?.jobTitle}</Text>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
export default React.memo(VariantC);
