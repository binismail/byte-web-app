import styles from './header.module.scss';
export interface IHeader {
  title: string;
  subtitle: string;
}

const Header: React.FC<IHeader> = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <p className="text-h5">{title}</p>
      <text className={styles.subtitle}>{subtitle}</text>
    </div>
  );
};

export default Header;
