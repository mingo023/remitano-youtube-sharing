import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { shareVideo } from "../api/video";
import { isValidYoutubeUrl } from "../helpers/youtube";

export default function VideoSharing() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const shareVideoMutation = useMutation({
    mutationFn: shareVideo,
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidYoutubeUrl(url)) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    setError("");

    shareVideoMutation.mutate({ url });
  };

  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Website content */}
      <div className="bg-background flex-1">
        {/* Main content */}
        <main className="max-w-6xl mx-auto p-4 flex justify-center items-start mt-8">
          <div className="border rounded-lg shadow-sm p-6 w-full max-w-md bg-card text-card-foreground border-black">
            <h2 className="text-lg font-medium mb-6 text-black">
              Share a Youtube movie
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="youtube-url"
                    className="text-black text-sm font-medium"
                  >
                    Youtube URL:
                  </label>
                  <input
                    id="youtube-url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input border-black bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                  {error && (
                    <span className="text-red-500 text-sm">{error}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full border-black border"
                >
                  Share
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
