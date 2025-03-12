import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { paginateVideos } from "../api/video";
import VideoCard from "../components/VideoCard";

export default function VideoListing() {
  const perPage = 3;
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["videos", page, perPage],
    queryFn: () =>
      paginateVideos({
        page,
        limit: perPage,
      }),
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const totalPages = data ? Math.ceil(data.total / perPage) : 1;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {(data?.videos || []).map((movie, index) => (
        <VideoCard
          key={index}
          url={movie.url}
          title={movie.title}
          description={movie.description}
          sharedBy={movie.sharedBy?.email}
          likes={movie.likes}
          dislikes={movie.dislikes}
        />
      ))}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={data ? page === totalPages : false}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
