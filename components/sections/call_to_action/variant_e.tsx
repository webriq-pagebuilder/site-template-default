import { extractLink } from "helper";
import React from "react";

import { SignUpForm } from "components/common/form/sign-up-form";
import { Container } from "components/layout/Container";
import { Flex } from "components/layout/Flex/Flex";
import Link from "next/link";
import { CTAProps } from ".";

function VariantE({ form, formLinks, signInLink }: CTAProps) {
  return (
    <section className="py-20 bg-gray-50">
      <Container maxWidth={448}>
        {form?.fields && <SignUpForm form={form} signInLink={signInLink} />}
        {formLinks && (
          <Flex wrap align="center" justify="center" c>
            {formLinks?.map((link, index, { length }) => (
              <div key={index}>
                <Link
                  href={extractLink(link)}
                  className="text-sm font-bold text-primary hover:text-primary-foreground"
                >
                  {link?.label}
                </Link>
                {index === length - 1 ? null : index === length - 2 ? (
                  <span>&nbsp;and&nbsp;</span>
                ) : (
                  <span>&nbsp;,&nbsp;</span>
                )}
              </div>
            ))}
          </Flex>
        )}
      </Container>
    </section>
  );
}

export default React.memo(VariantE);
