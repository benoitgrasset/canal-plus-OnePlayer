import { FC } from 'react';
import '../App.css';

type Props = React.ComponentPropsWithoutRef<'button'>;

const Button: FC<Props> = (props) => {
  return <button {...props} className="button" />;
};

export default Button;
