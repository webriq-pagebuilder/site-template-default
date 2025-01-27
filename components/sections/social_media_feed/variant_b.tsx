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

function VariantB({
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

  // Memoize the hasTargetHashtag function to prevent recreating on every render
  const hasTargetHashtag = React.useCallback((caption: string) => {
    if (!caption) return false;
    const lowercaseCaption = caption.toLowerCase();
    return hashtags.some((hashtag) => {
      const normalizedHashtag = hashtag.startsWith("#")
        ? hashtag.toLowerCase()
        : `#${hashtag.toLowerCase()}`;
      return lowercaseCaption.includes(normalizedHashtag);
    });
  }, [hashtags]);

  const fetchPosts = React.useCallback(async (cursor: string | null = null) => {
    if (!media || isLoading) return;
    
    try {
      setLoading(true);
      const filteredPosts = media.filter((post: InstagramPost) => hasTargetHashtag(post.caption));
      
      if (cursor) {
        setPosts((prevPosts) => [...prevPosts, ...filteredPosts]);
      } else {
        setPosts(filteredPosts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [media, hasTargetHashtag, isLoading]);

  useEffect(() => {
    if (!isLoading && media?.length > 0) {
      fetchPosts();
    }
  }, [fetchPosts, media, isLoading]);

  // Add this helper function to convert newlines to <br> tags and preserve hashtag links
  const formatCaption = (caption: string) => {
    return caption.split("\n").map((line, index) => (
      <span className="text-gray-500" key={index}>
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

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container m-auto px-4 w-full max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-200 h-80 rounded"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container m-auto px-4 w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div className="flex flex-col bg-white border border-gray-200 overflow-hidden" key={post.id}>
              {/* Media Container - No fixed aspect ratio */}
              <div className="relative w-full">
                {post.media_type === "VIDEO" ? (
                  <video
                    src={post.media_url}
                    controls
                    className="w-full"
                  />
                ) : (
                  <Link
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={post.media_url}
                      alt={post.caption}
                      className="w-full"
                    />
                  </Link>
                )}
              </div>
              
              <div className="flex flex-col flex-grow p-4">
                {/* Profile and Caption */}
                <div className="flex gap-3 mb-2">
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
                  <p className="text-sm text-gray-600">
                    <Link
                      className="font-medium text-gray-900 mr-2"
                      href={`${baseUrl}/${username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profileName ?? username}
                    </Link>
                    {formatCaption(post.caption)}
                  </p>
                </div>
  
                {/* Learn More Button - Always at bottom */}
                <div className="p-4 mt-auto">
                  <Link
                    className="inline-block uppercase text-sm font-medium text-blue-600 hover:text-blue-700"
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && <div className="text-center mt-6">Loading...</div>}

        {nextCursor && posts.length >= postsPerPage && (
          <div className="text-center mt-8">
            <button
              onClick={() => fetchNextPage()}
              disabled={loading || !nextCursor}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default React.memo(VariantB);