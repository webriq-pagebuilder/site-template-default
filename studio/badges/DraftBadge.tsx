import React, { useEffect, useState } from "react";
import { DocumentBadgeDescription, DocumentBadgeProps } from "sanity";
import { format } from "date-fns";
import { EditIcon } from "@sanity/icons";

export function DraftBadge(
  props: DocumentBadgeProps
): DocumentBadgeDescription {
  const { draft } = props;
  const [draftTime, setDraftTime] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (draft && draft._updatedAt) {
      const updatedAtDate = new Date(draft._updatedAt);

      const updateTimes = () => {
        const currentTime = new Date();
        const elapsedDraftTime = Math.floor(
          (currentTime.getTime() - updatedAtDate.getTime()) / (1000 * 60)
        );

        setDraftTime(elapsedDraftTime);
      };

      updateTimes(); // Update immediately
      intervalId = setInterval(updateTimes, 60000); // Update every minute
    }

    return () => clearInterval(intervalId);
  }, [draft]);

  const hasDraft = draft && draft?._updatedAt;

  if (draft && hasDraft && draftTime !== null) {
    let draft;

    if (draftTime <= 0) {
      draft = `${draftTime * 60 < 15 ? "Just now" : draftTime}`;
    } else if (draftTime < 60) {
      draft = `${draftTime}m`;
    } else if (draftTime < 1440) {
      const hours = Math.floor(draftTime / 60);
      draft = `${hours}h`;
    } else if (draftTime < 43200) {
      const days = Math.floor(draftTime / 1440);
      draft = `${days}d`;
    } else if (draftTime < 525600) {
      const currentDate = new Date();
      const draftDate = new Date(currentDate.getTime() - draftTime * 60 * 1000);
      draft = format(draftDate, "MMM dd"); // Format the date as "Aug 10"
    } else {
      const years = Math.floor(draftTime / 525600);
      draft = `${years}y`;
    }

    return {
      label: <DraftTimer label={draft} />,
      title:
        draftTime <= 0
          ? "Changes Saved Just now"
          : `Changes Saved ${draft} ago`,
      color: "warning",
    };
  }
  return null;
}

const DraftTimer = ({ label }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      {/* should have function onclick to open the review changes */}
      <div
        className="flex space-x-2 text-sm font-normal items-center cursor-pointer"
        style={{
          padding: "10px",
          borderRadius: "4px",
          color: isHovered ? "black" : "#958228",
          backgroundColor: isHovered ? "#95822820" : "transparent",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <EditIcon style={{ color: isHovered ? "black" : "#958228" }} />
        <span>{label}</span>
      </div>
    </>
  );
};
