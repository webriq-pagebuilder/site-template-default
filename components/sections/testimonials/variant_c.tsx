import React from "react";
import { urlFor } from "lib/sanity";
import { TestimonialProps } from ".";
import { SwiperButton } from "components/ui/SwiperButton/SwiperButton";
import { Avatar } from "components/ui/Avatar";
import { Card } from "components/ui/Card";
import { Text } from "components/ui/Text";

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
    <section>
      <div className="py-10 overflow-hidden radius-for-skewed bg-gray-50 lg:py-20">
        <div className="max-w-6xl px-4 pb-6 mx-auto lg:pb-16">
          <div className="flex flex-wrap items-center justify-center text-center lg:justify-between lg:text-left">
            <div className="w-full mb-4 lg:mb-0 lg:w-4/5">
              <span className="font-bold text-brand-primary">{caption}</span>
              <Text type="h1" className="">
                {title}
              </Text>
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
          </div>
        </div>
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
                    <p className="mb-1 text-2xl font-bold font-heading">
                      {item?.name}
                    </p>
                    <Text muted>{item?.jobTitle}</Text>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
