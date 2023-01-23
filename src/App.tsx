import { FC, useRef } from 'react';
import RxPlayer from 'rx-player';
import './App.css';
import PauseIcon from './assets/pause.svg';
import PlayIcon from './assets/play-filled.svg';
import StopIcon from './assets/stop-filled.svg';
import Button from './components/Button';
import { State } from './types';

const options = {
  initialVideoBitrate: 700000,
  initialAudioBitrate: 5000,
  minVideoBitrate: 100000,
  minAudioBitrate: 100000,
  maxVideoBitrate: 1e6,
  maxAudioBitrate: 1e6,
};

const App: FC = () => {
  const playerWrapperElement = useRef(null);
  const videoElementRef = useRef(null);

  const player = new RxPlayer({
    ...options,
    videoElement: videoElementRef.current!,
  });

  player.loadVideo({
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    transport: 'directfile',
    autoPlay: false,
  });

  const videoElement = player.getVideoElement();

  player.addEventListener('error', (err) => {
    console.error('the content stopped with the following error', err);
  });

  player.addEventListener('playerStateChange', (state: string) => {
    if ((state as State) === 'LOADED') {
      // toggle between play and pause when the user clicks on the video
      videoElement!.onclick = function () {
        if (player.getPlayerState() === 'PLAYING') {
          player.pause();
        } else {
          player.play();
        }
      };
    }
  });

  const handleClickPlayPause = () => {
    if (player.getPlayerState() === 'PLAYING') {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleClickStop = () => {
    player.stop();
  };

  const PlayPauseIcon =
    player.getPlayerState() === 'PLAYING' ? PlayIcon : PauseIcon;

  return (
    <div className="App">
      <h1>OnePlayer - Canal +</h1>
      <div ref={playerWrapperElement}>
        <video ref={videoElementRef} />
      </div>
      <Button onClick={handleClickPlayPause}>
        <img src={PlayPauseIcon} alt="play" width={30} />
      </Button>
      <Button onClick={handleClickStop}>
        <img src={StopIcon} alt="stop" width={30} />
      </Button>
    </div>
  );
};

export default App;
