import styles from './header.module.scss';
export interface IHeader {
  title: string;
  subtitle: string;
}

const Header: React.FC<IHeader> = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <p className="text-h5">{title}</p>
      <span className={styles.subtitle}>{subtitle}</span>
    </div>
  );
};

export default Header;
