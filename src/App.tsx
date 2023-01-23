import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef } from 'react';
import RxPlayer from 'rx-player';
import './App.css';
import PauseIcon from './assets/pause.svg';
import PlayIcon from './assets/play-filled.svg';
import StopIcon from './assets/stop-filled.svg';
import Button from './components/Button';
import { getScene } from './services';
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
  const videoElementRef = useRef(null);

  const player = new RxPlayer({
    ...options,
    videoElement: videoElementRef.current!,
  });

  const videoElement = player.getVideoElement();
  const state = player.getPlayerState() as State;
  const position = player.getPosition();

  const { data: sceneDetails } = useQuery([`scene - ${position}`], () =>
    getScene(position)
  );

  player.loadVideo({
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    transport: 'directfile',
    autoPlay: false,
  });

  const errorListenerCallback = (err: Error) => {
    console.error('the content stopped with the following error', err);
  };

  useEffect(() => {
    player.addEventListener('error', errorListenerCallback);

    return () => {
      player.removeEventListener('error', errorListenerCallback);
    };
  }, []);

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

  const listenerCallback = (state: string) => {
    if ((state as State) === 'LOADED') {
      videoElement!.onclick = function () {
        handleClickPlayPause();
      };
    }
  };

  useEffect(() => {
    player.addEventListener('playerStateChange', listenerCallback);

    return () => {
      player.removeEventListener('playerStateChange', listenerCallback);
    };
  }, []);

  const PlayPauseIcon =
    player.getPlayerState() === 'PLAYING' ? PauseIcon : PlayIcon;

  return (
    <div className="App">
      <h2>OnePlayer - Canal +</h2>
      <div>
        <video ref={videoElementRef} />
      </div>
      <div className="buttonContainer">
        <Button onClick={handleClickPlayPause}>
          <img src={PlayPauseIcon} alt="play" width={30} />
        </Button>
        <Button onClick={handleClickStop}>
          <img src={StopIcon} alt="stop" width={30} />
        </Button>
      </div>
    </div>
  );
};

export default App;
