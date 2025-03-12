import VideoCard from "../components/VideoCard";

const VideoListing = () => {
  const movies = [
    {
      title: "Funny Cat Compilation",
      sharedBy: "someone@gmail.com",
      description:
        "A hilarious compilation of cats doing funny things. This video will make your day brighter and give you a good laugh.",
      upvotes: 89,
      downvotes: 12,
      initialVoteStatus: "none" as const,
      url: "https://www.youtube.com/watch?v=J---aiyznGQ",
    },
    {
      title: "Best Movie Scenes 2024",
      sharedBy: "someone@gmail.com",
      description:
        "A collection of the most memorable movie scenes from 2024. Including action, comedy, and dramatic moments.",
      upvotes: 89,
      downvotes: 12,
      initialVoteStatus: "up" as const,
      url: "https://www.youtube.com/watch?v=J---aiyznGQ",
    },
    {
      title: "Epic Fail Moments",
      sharedBy: "someone@gmail.com",
      description:
        "Watch these incredible fail moments that will make you laugh and cringe at the same time.",
      upvotes: 89,
      downvotes: 12,
      initialVoteStatus: "down" as const,
      url: "https://www.youtube.com/watch?v=J---aiyznGQ",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {movies.map((movie, index) => (
        <VideoCard key={index} {...movie} />
      ))}
    </div>
  );
};

export default VideoListing;
