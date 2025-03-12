export const isValidYoutubeUrl = (url: string) => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[^\s]+$/;
  return youtubeRegex.test(url);
};
