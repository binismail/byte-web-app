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
}) => {
  switch (color) {
    case 'btnPrimary':
      color = styles.btnPrimary;
      break;

    case 'btnLight':
      color = styles.btnLight;
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
    <div>
      <button
        className={`${styles.btn} + ${color} + ${type} text-xs`}
        onClick={click}
      >
        {icon && (
          <span>
            <ByteIcon icon={icon} size={16} color={iconColor} />
          </span>
        )}
        {!loading ? title : 'loading...'}
        {icon && iconPosition === 'right' && (
          <span>
            <ByteIcon icon={icon} size={14} color={iconColor} />
          </span>
        )}{' '}
      </button>
    </div>
  );
};

export default Button;
