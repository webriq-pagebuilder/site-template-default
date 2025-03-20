import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DefaultSocialMediaIcons } from "helper";

interface InstagramPost {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  permalink: string;
  timestamp: string;
}

function VariantA({
  baseUrl,
  username,
  userId,
  media,
  platform,
  profileName,
  profilePictureUrl,
  fetchNextPage,
  nextCursor,
  hashtags,
  postsPerPage,
  linkedAcct,
  isLoading,
}) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Updated helper function to check for multiple hashtags
  const hasTargetHashtag = (caption: string) => {
    if (!caption) return false;
    const lowercaseCaption = caption.toLowerCase();
    // Post matches if it contains ANY of the target hashtags (OR condition)
    return hashtags.some((hashtag) => {
      const normalizedHashtag = hashtag.startsWith("#")
        ? hashtag.toLowerCase()
        : `#${hashtag.toLowerCase()}`;
      return lowercaseCaption.includes(normalizedHashtag);
    });
  };

  const fetchPosts = async (cursor: string | null = null) => {
    try {
      setLoading(true);

      // Filter posts by hashtag
      const filteredPosts = media.filter((post: InstagramPost) => hasTargetHashtag(post.caption));

      if (cursor) {
        // Append to existing posts for pagination
        setPosts((prevPosts) => [...prevPosts, ...filteredPosts]);
      } else {
        // Initial load
        setPosts(filteredPosts);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch Instagram posts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [hashtags, media, isLoading]);

  // Add this helper function to convert newlines to <br> tags and preserve hashtag links
  const formatCaption = (caption: string) => {
    return caption.split("\n").map((line, index) => (
      <span key={index}>
        {line.split(" ").map((word, wordIndex) => (
          <span key={wordIndex}>
            {word.startsWith('#') ? (
              <Link
                href={`https://www.instagram.com/explore/tags/${word.slice(1)}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {word}
              </Link>
            ) : word.startsWith('@') ? (
              <Link
                href={`https://www.instagram.com/${word.slice(1)}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {word}
              </Link>
            ) : word.startsWith('http') ? (
              <Link
                href={word}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {word}
              </Link>
            ): (
              word
            )}
            {wordIndex < line.split(" ").length - 1 ? " " : ""}
          </span>
        ))}
        {index < caption.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  // Add this helper function at the top of the component
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Define time intervals in seconds
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    // Find the appropriate interval
    if (diffInSeconds < intervals.minute) {
      return "just now";
    }

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const value = Math.floor(diffInSeconds / secondsInUnit);
      if (value >= 1) {
        return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
      }
    }

    return "just now";
  };

  if (isLoading || !posts || posts.length === 0) {
    return (
      <section className="py-20">
        <div className="container m-auto px-4 w-full max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-200 h-80 rounded"/>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto lg:px-4 w-full lg:w-2/3">
        <div className="grid justify-center sm:flex sm:flex-wrap sm:justify-between mb-4">
          <div className="flex gap-3 sm:my-auto">
            <Link
              className="flex-shrink-0"
              href={`${baseUrl}/${username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profilePictureUrl ? (
                <Image
                  className="rounded-full"
                  width={32}
                  height={32}
                  src={profilePictureUrl}
                  alt={`${profileName} profile picture`}
                />
              ): (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" />
                </svg>
              )}
            </Link>
            <Link
              className="font-medium text-gray-900 hover:text-black ml-3 items-center"
              href={`${baseUrl}/${username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profileName ?? username}
            </Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 justify-center">
          {posts?.map((post, index) => (
            <Link href={post?.permalink} key={index} target="_blank">
              <div className="relative overflow-hidden">
                {post.media_type === "VIDEO" ? (
                  <video
                    src={post.media_url}
                    controls
                    className="w-full"
                  />
                ) : (
                  <Image
                    className="h-full sm:h-[350px] sm:w-full object-cover"
                    src={post?.media_url}
                    sizes="100vw"
                    height={350}
                    width={350}
                    alt={post?.id ?? `${platform} post`} // post media ID
                  />
                )}
                <div className="absolute inset-0 z-10 flex flex-col items-start bg-gray-900 p-6 opacity-0 duration-300 hover:opacity-75">
                  <p className="mb-auto font-bold text-white md:text-lg">
                    {formatCaption(post.caption)}
                  </p>
                  <span className="text-white">
                    {formatRelativeTime(post.timestamp)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {nextCursor && posts.length >= postsPerPage && (
          <div className="mt-10 text-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={loading || !nextCursor}
              className="bg-webriq-darkblue hover:bg-webriq-blue text-white px-4 py-3 rounded-t-xl rounded-l-xl"
            >
              View more posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default React.memo(VariantA);