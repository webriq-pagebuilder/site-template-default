import React from "react";
import FacebookShare from "./FacebookShare";
import GoogleSearchResult from "./GoogleSearchResults";
import LinkedinPost from "./LinkedInPost";
import TwitterCard from "./TwitterCard";
import { useMemoObservable } from "react-rx";
import { useDocumentStore, useFormValue } from "sanity";

function SeoPreviews(props) {
  const { options, document } = props;

  const documentStore = useDocumentStore();
  const result = useMemoObservable(() => {
    return documentStore.listenQuery(
      `*[_type == 'defaultSeo' && !(_id in path("drafts.**"))][0]`,
      {},
      {}
    );
  }, [documentStore]);

  return (
    <>
      <GoogleSearchResult
        document={document?.displayed}
        options={options}
        defaultSeo={result}
      />
      <TwitterCard
        document={document?.displayed}
        options={options}
        defaultSeo={result}
      />
      <FacebookShare
        document={document?.displayed}
        options={options}
        defaultSeo={result}
      />
      <LinkedinPost
        document={document?.displayed}
        options={options}
        defaultSeo={result}
      />
    </>
  );
}

export default SeoPreviews;
