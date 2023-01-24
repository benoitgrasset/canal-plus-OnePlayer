import { FC } from 'react';

type Props = {
  handleClickPlayPause: () => void;
  videoElementRef: React.MutableRefObject<null>;
};

const Player: FC<Props> = ({ handleClickPlayPause, videoElementRef }) => {
  return <video ref={videoElementRef} onClick={handleClickPlayPause} />;
};

export default Player;
