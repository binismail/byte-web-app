import styles from './Button.module.scss';
export interface IButton {
  title: string;
  color: string;
}

const Button: React.FC<IButton> = ({ title, color }) => {
  switch (color) {
    case 'btnPrimary':
      color = styles.btnPrimary;
      break;
    default:
      break;
  }
  return <button className={color}>{title} </button>;
};

export default Button;
