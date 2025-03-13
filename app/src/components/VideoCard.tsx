import { ThumbsUp, ThumbsDown, Play } from "lucide-react";
import { useState } from "react";

type VoteStatus = "none" | "up" | "down";

interface MovieCardProps {
  title: string;
  sharedBy: string;
  description: string;
  likes: number;
  dislikes: number;
  url: string;
  initialVoteStatus?: VoteStatus;
}

// Helper function to extract YouTube video ID from URL
function extractYoutubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function MovieCard({
  title,
  sharedBy,
  description,
  likes: upvotes,
  dislikes: downvotes,
  url,
  initialVoteStatus = "none",
}: MovieCardProps) {
  const [voteStatus, setVoteStatus] = useState<VoteStatus>(initialVoteStatus);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);

  // State for toggling "read more" for title and description
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Adjust these thresholds as needed
  const shouldTruncateDescription = description.length > 100;

  const videoId = extractYoutubeId(url);

  const handleVote = (vote: VoteStatus) => {
    setVoteStatus(vote === voteStatus ? "none" : vote);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setShowThumbnail(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 border rounded-lg bg-card">
      {/* Video Player Section */}
      <div className="w-full md:w-[400px] aspect-video bg-muted rounded-md relative flex flex-col justify-end overflow-hidden">
        {videoId ? (
          <>
            {/* YouTube Embed */}
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&controls=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={`absolute inset-0 w-full h-full border-0 ${showThumbnail ? "opacity-0" : "opacity-100"}`}
            />

            {/* Thumbnail Overlay with Play Button */}
            {showThumbnail && (
              <div className="absolute inset-0 bg-black/10">
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={`Thumbnail for ${title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handlePlay}
                    className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
                    aria-label="Play video"
                  >
                    <Play className="h-8 w-8" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          // Fallback if no valid YouTube ID
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <p className="text-muted-foreground">Invalid YouTube URL</p>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start flex-col">
            <span className="text-lg font-medium text-red-500 text-left">
              {title}
            </span>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold">Shared by:</span> {sharedBy}
            </p>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm">
                {upvotes} <ThumbsUp className="inline h-4 w-4 ml-1" />
              </span>
              <span className="text-sm">
                {downvotes} <ThumbsDown className="inline h-4 w-4 ml-1" />
              </span>
            </div>
          </div>

          {/* Voting Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVote("up")}
              className={`p-2 rounded-full transition-colors ${
                voteStatus === "up"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
              aria-label="Vote up"
              aria-pressed={voteStatus === "up"}
            >
              <ThumbsUp className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleVote("down")}
              className={`p-2 rounded-full transition-colors ${
                voteStatus === "down"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
              aria-label="Vote down"
              aria-pressed={voteStatus === "down"}
            >
              <ThumbsDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <h4 className="text-sm mb-2 font-bold">Description:</h4>
          <p
            className={`text-sm text-muted-foreground text-left ${!isDescriptionExpanded ? "line-clamp-2" : ""}`}
          >
            {description}
          </p>
          {shouldTruncateDescription && (
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-sm text-blue-500"
            >
              {isDescriptionExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
