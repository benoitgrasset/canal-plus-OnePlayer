import { Scene } from '../types';

const baseUrl = 'https://teamplayer.ddns.net:32783/';

export const getScene = async (timecode: number) => {
  const url = `${baseUrl}/scene/${timecode}`;

  const response: Promise<Scene> = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.error(error.message));

  return response;
};
