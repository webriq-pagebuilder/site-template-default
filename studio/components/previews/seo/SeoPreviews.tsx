import React, { useMemo } from "react";
import FacebookShare from "./facebook/FacebookShare";
import GoogleSearchResult from "./googleSearch/GoogleSearchResults";
import LinkedinPost from "./linkedIn/LinkedInPost";
import TwitterCard from "./twitter/TwitterCard";
import { useObservable } from "react-rx";
import { useDocumentStore } from "sanity";

function SeoPreviews(props) {
	const { options, document } = props;

	const documentStore = useDocumentStore();
	const observable = useMemo(
		() =>
			documentStore.listenQuery(
				`*[_type == 'defaultSeo' && !(_id in path("drafts.**"))][0]`,
				{},
				{}
			),
		[documentStore]
	);
	const result = useObservable(observable);

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
