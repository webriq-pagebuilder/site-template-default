import { useRouter } from "sanity/router";
import { Layout, Header } from "../components";
import Forms from "./Forms";
import Form from "./Form";
import Submissions from "./Submissions";

function Index(props: any) {
  const router = useRouter();
  const { formId } = router?.state;
  const isSubmissionsPath =
    window.location.pathname.split("/").pop() === "submissions";

  if (isSubmissionsPath && formId) {
    return (
      <Layout>
        <Submissions formId={formId} />
      </Layout>
    );
  }

  if (formId) {
    return (
      <Layout>
        <Form formId={formId} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <Forms />
    </Layout>
  );
}

export default Index;