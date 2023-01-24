import { FC, useEffect, useRef } from 'react';
import RxPlayer from 'rx-player';
import './App.css';
import Player from './components/Player';
import Toolbar from './components/Tooltbar';

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

  return (
    <div className="App">
      <h2>OnePlayer - Canal +</h2>
      <Player
        videoElementRef={videoElementRef}
        handleClickPlayPause={handleClickPlayPause}
      />
      <Toolbar player={player} handleClickPlayPause={handleClickPlayPause} />
    </div>
  );
};

export default App;
