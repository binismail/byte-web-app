import ByteIcon from '../shared/icon/byte.icon';
import styles from './quicklink.card.module.scss';
export interface IQuickLinkCard {
  title: string;
  color: string;
  name: string;
  size: string;
  iconColor: string;
}

const QuickLinkCard: React.FC<IQuickLinkCard> = ({
  title,
  color,
  name,
  size,
  iconColor,
}) => {
  return (
    <div style={{ backgroundColor: color }} className={styles.quicklinkCard}>
      <ByteIcon icon={name} color={iconColor} size={size} />
      <p className={styles.quicklinkTitle}> {title}</p>
    </div>
  );
};

export default QuickLinkCard;
