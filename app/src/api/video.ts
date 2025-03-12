import httpRequest from "../hooks/use-http-request";
import { PaginateVideosPayload, VideoSharePayload, VideosResponse } from "../types/video";

export const shareVideo = (data: Partial<VideoSharePayload>): Promise<void> => {
  return httpRequest({ url: "/videos", method: "POST", data });
};

export const paginateVideos = (
  data: Partial<PaginateVideosPayload>,
): Promise<VideosResponse> => {
  return httpRequest({ url: "/videos", method: "GET", params: data });
};
