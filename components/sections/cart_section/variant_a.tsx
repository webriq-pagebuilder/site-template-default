import React from "react";
import { EcwidContextProvider } from "context/EcwidContext";
import { Container } from "components/layout/Container";

function VariantA() {
  return (
    <EcwidContextProvider>
      <section className="pt-20">
        <Container>
          <div className="py-8">
            <div id="ecwid-shop-store"></div>
          </div>
        </Container>
      </section>
    </EcwidContextProvider>
  );
}
export default VariantA;
