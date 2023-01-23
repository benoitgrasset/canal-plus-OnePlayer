export type State =
  | 'STOPPED'
  | 'LOADING'
  | 'LOADED'
  | 'PLAYING'
  | 'PAUSED'
  | 'BUFFERING'
  | 'SEEKING'
  | 'ENDED'
  | 'RELOADING';

type Reaction = {
  name: string;
  message: string;
  timecode: number;
};

type Actor = {
  id: number;
  description: string;
  name: string;
  image: string;
};

export type Scene = {
  id: number;
  title: string;
  casting: Actor[];
  image: string;
  reactions?: Reaction[];
  beginTimecode: number;
  endTimecode: number;
};
