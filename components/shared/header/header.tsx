import styles from './header.module.scss';
export interface IHeader {
  title: string;
  subtitle: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const Header: React.FC<IHeader> = ({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}) => {
  return (
    <div className={className ? className : styles.container}>
      <p className={titleClassName ? titleClassName : 'text-h5'}>{title}</p>
      <span className={subtitleClassName ? subtitleClassName : styles.subtitle}>
        {subtitle}
      </span>
    </div>
  );
};

export default Header;
