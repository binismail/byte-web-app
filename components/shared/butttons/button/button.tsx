import { ThreeDots } from 'react-loader-spinner';
import ByteIcon from '../../icon/byte.icon';
import styles from './Button.module.scss';
export interface IButton {
  title: string;
  color: string;
  type?: string;
  click?: any;
  icon?: string;
  iconColor?: string;
  iconPosition?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<IButton> = ({
  title,
  color,
  type = '',
  click,
  icon,
  iconColor,
  iconPosition,
  loading,
  disabled,
}) => {
  switch (color) {
    case 'btnPrimary':
      color = styles.btnPrimary;
      break;

    case 'btnLight':
      color = styles.btnLight;
      break;

    case 'btnWarning':
      color = styles.btnWarning;
      break;

    default:
      break;
  }

  switch (type) {
    case 'block':
      type = styles.btnBlock;
      break;
    case 'large':
      type = styles.btnLarge;
      break;

    default:
      break;
  }
  return (
    <button
      disabled={disabled}
      className={`${styles.btn} + ${color} + ${type} text-xs disabled:cursor-not-allowed disabled:opacity-40`}
      onClick={click}
    >
      {icon && (
        <span>
          <ByteIcon icon={icon} size={16} color={iconColor} />
        </span>
      )}
      {loading ? (
        <span className="inline-flex mx-auto items-center justify-center">
          <ThreeDots
            height="40"
            width="40"
            radius="9"
            color="#fff"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </span>
      ) : (
        <>{title}</>
      )}
      {icon && iconPosition === 'right' && (
        <span>
          <ByteIcon icon={icon} size={14} color={iconColor} />
        </span>
      )}{' '}
    </button>
  );
};

export default Button;
