import { Button, Card, Form, FormField, Text } from "components/ui";
import { thankYouPageLink } from "helper";
import { LabeledRoute, Form as TForm } from "types";
import { Flex } from "components/layout/index";

export type SignUpFormProps = {
  form: TForm;
  signInLink?: LabeledRoute;
  className?: string;
};

export function SignUpForm({ form, signInLink, className }: SignUpFormProps) {
  return (
    <Card className={`px-6 py-8 mb-6 text-center ${className}`}>
      <Form
        id={form?.id}
        name="Calltoaction-VariantD-Form"
        className="form-callToAction"
        thankyouPage-={thankYouPageLink(form?.thankYouPage)}
      >
        <div className="mb-6">
          <span className="text-sm text-gray-500">{form?.subtitle}</span>
          <Text fontSize="2xl">{form?.name}</Text>
        </div>
        <Flex className="flex-col mb-3 lg:flex-row" gap={2}>
          {form?.fields?.slice(0, 2)?.map((formFields, index) => (
            <div className="w-full " key={index}>
              <FormField
                noLabel
                variant={"secondary"}
                name={formFields?.name}
                placeholder={formFields?.placeholder}
                required={formFields?.isRequired}
                {...formFields}
              />
            </div>
          ))}
        </Flex>
        <div className="mb-3 space-y-3">
          {form?.fields?.slice(2)?.map((formFields, index) => (
            <div key={index}>
              <FormField
                noLabel
                name={formFields?.name}
                variant={"secondary"}
                {...formFields}
              />
            </div>
          ))}
        </div>
        <div>
          <div className="webriq-recaptcha" />
        </div>
        {form?.buttonLabel && (
          <Button
            as="button"
            variant="custom"
            ariaLabel={form?.buttonLabel ?? "Call to action form submit button"}
            className="w-full mb-4 text-sm"
            type="submit"
          >
            {form?.buttonLabel}
          </Button>
        )}
      </Form>
      {signInLink?.label && (
        <Text fontSize="xs" muted>
          <span>Already have an account?</span>{" "}
          <Button
            size="xs"
            variant="link"
            link={signInLink}
            ariaLabel={signInLink?.label}
          >
            {signInLink?.label}
          </Button>
        </Text>
      )}
    </Card>
  );
}
