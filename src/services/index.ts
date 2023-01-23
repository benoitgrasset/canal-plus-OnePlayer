export const getCallAPI = async (timecode: number) => {
  const url = `scene/${timecode}`;

  const response: Promise<unknown> = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.error(error.message));

  return response;
};
