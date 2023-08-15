import Link from 'next/link';
import ByteIcon from '../shared/icon/byte.icon';
import styles from './quicklink.card.module.scss';
export interface IQuickLinkCard {
  title: string;
  color: string;
  name: string;
  size: string;
  iconColor: string;
  path?: string;
}

const QuickLinkCard: React.FC<IQuickLinkCard> = ({
  title,
  color,
  name,
  size,
  iconColor,
  path = '',
}) => {
  return (
    <Link href={path}>
      <div style={{ backgroundColor: color }} className={styles.quicklinkCard}>
        <ByteIcon icon={name} color={iconColor} size={size} />
        <p className={styles.quicklinkTitle}> {title}</p>
      </div>
    </Link>
  );
};

export default QuickLinkCard;
