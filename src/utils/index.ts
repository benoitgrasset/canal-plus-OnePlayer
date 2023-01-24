export const formatTime = (time: number) => {
  const limit = time < 3600 ? 14 : 11;
  const date = new Date(time * 1000).toISOString().slice(limit, 19);
  return date;
};
