import { render, screen } from "@testing-library/react";
import VariantA from "../variant_a";

describe("Variant A", () => {
  test("it displays logo", () => {
    const logo = {
      image:
        "https://cdn.sanity.io/images/3do82whm/production/2a9e2b0b0b0b4b0b9b0b0b0b0b0b0b0b0b0b0b0b-218x320.png",
    };

    render(<VariantA logo={logo} />);

    expect(screen.getByAltText("appPromo-logo")).toBeInTheDocument();
  });

  test("it diplays subtitle", () => {
    render(<VariantA subtitle="subtitle" />);

    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  test("it diplays title", () => {
    render(<VariantA subtitle="title" />);

    expect(screen.getByText("title")).toBeInTheDocument();
  });
});
