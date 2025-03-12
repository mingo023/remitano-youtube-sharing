export type VideoSharePayload = {
  url: string;
};

export type PaginateVideosPayload = {
  page: number;
  limit: number;
};

export type VideosResponse = {
  videos: Array<{
    id: string;
    title: string;
    description: string;
    url: string;
    sharedBy: {
      email: string;
    };
    likes: number;
    dislikes: number;
  }>;
  total: number;
};
