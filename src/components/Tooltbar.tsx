import { FC, useState } from 'react';
import RxPlayer from 'rx-player';
import '../App.css';
import PauseIcon from '../assets/pause.svg';
import PlayIcon from '../assets/play-filled.svg';
import VolumeIcon from '../assets/volume.svg';

import StopIcon from '../assets/stop-filled.svg';
import { State } from '../types';
import { formatTime } from '../utils';
import Button from './Button';

const width = 30;
const MaxVolume = 100;

type Props = {
  player: RxPlayer;
  handleClickPlayPause: () => void;
};

const Toolbar: FC<Props> = ({ player, handleClickPlayPause }) => {
  const [volume, setVolume] = useState(1);
  const [position, setPosition] = useState(0);
  const [playerState, setPlayerState] = useState<State | undefined>(undefined);

  const duration = player.getVideoDuration() || 0;

  const handleChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(event.target.value) / MaxVolume;
    setVolume(volume);
    player.setVolume(volume);
  };

  const handleChangePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    const position = Number(event.target.value);
    setPosition(position);
    player.seekTo(position);
  };

  const handleClickStop = () => {
    player.stop();
  };

  const handlePlayerStateChange = () => {
    const playerState = player.getPlayerState() as State;
    setPlayerState(playerState);
  };

  const PlayPauseIcon = playerState === 'PLAYING' ? PlayIcon : PauseIcon;

  return (
    <>
      <input
        type="range"
        id="position"
        name="position"
        min={0}
        max={duration}
        value={position}
        onChange={handleChangePosition}
        className="positionControl"
      />
      <div className="toolbar">
        <div className="buttonContainer">
          <Button
            onClick={() => {
              handleClickPlayPause();
              handlePlayerStateChange();
            }}
          >
            <img src={PlayPauseIcon} alt="play" width={width} />
          </Button>
          <Button onClick={handleClickStop}>
            <img src={StopIcon} alt="stop" width={width} />
          </Button>
          <span>{`${formatTime(position)} / ${formatTime(duration)}`}</span>
        </div>
        <span className="wrapper">
          <label htmlFor="volume">
            <img src={VolumeIcon} alt="volume" width={width} />
          </label>
          <input
            type="range"
            id="volume"
            name="volume"
            min={0}
            max={MaxVolume}
            value={volume * MaxVolume}
            onChange={handleChangeVolume}
          />
        </span>
      </div>
    </>
  );
};

export default Toolbar;
