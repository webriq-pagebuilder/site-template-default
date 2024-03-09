import React, { useEffect, useState } from "react";
import { DocumentBadgeDescription, DocumentBadgeProps } from "sanity";
import { format } from "date-fns";
import { CheckmarkCircleIcon } from "@sanity/icons";

export function PublishBadge(
  props: DocumentBadgeProps
): DocumentBadgeDescription {
  const { published } = props;

  const [publishedTime, setPublishedTime] = useState<number | null>(null);

  // Calculate time elapsed since publication and draft update
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (published && published._updatedAt) {
      const updatedAtDate = new Date(published._updatedAt);

      const updateTimes = () => {
        const currentTime = new Date();
        const elapsedPublishedTime = Math.floor(
          (currentTime.getTime() - updatedAtDate.getTime()) / (1000 * 60)
        );

        setPublishedTime(elapsedPublishedTime);
      };

      updateTimes(); // Update immediately
      intervalId = setInterval(updateTimes, 60000); // Update every minute
    }
  }, [published]);

  if (published && publishedTime !== null) {
    const formattedPublishedDate = format(
      new Date(published._updatedAt),
      "eee MMM dd yyyy h:mm a"
    );

    let publishedLabel;

    if (publishedTime <= 0) {
      publishedLabel = `${publishedTime * 60 < 15 ? "Just now" : publishedTime * 60 + "s"}`;
    } else if (publishedTime < 60) {
      publishedLabel = `${publishedTime}m`;
    } else if (publishedTime < 1440) {
      const hours = Math.floor(publishedTime / 60);
      publishedLabel = `${hours}h`;
    } else if (publishedTime < 43200) {
      const days = Math.floor(publishedTime / 1440);
      publishedLabel = `${days}d`;
    } else if (publishedTime < 525600) {
      const currentDate = new Date();
      const publishedDate = new Date(
        currentDate.getTime() - publishedTime * 60 * 1000
      );
      publishedLabel = format(publishedDate, "MMM dd"); // Format the date as "Aug 10"
    } else {
      const years = Math.floor(publishedTime / 525600);
      publishedLabel = `${years}y`;
    }

    // console.log("publishedTime", publishedTime);
    return {
      label: <Timer publishedLabel={publishedLabel} />,
      title: `Last Published ${formattedPublishedDate}`,
      color: "success",
    };
  }
}

const Timer = ({ publishedLabel }) => {
  return (
    <div className="flex space-x-2 text-sm font-medium items-center cursor-pointer">
      <CheckmarkCircleIcon />
      <span>{publishedLabel}</span>
    </div>
  );
};
