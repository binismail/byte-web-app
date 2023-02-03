import Image, { StaticImageData } from 'next/image';
import styles from './avatar.module.scss';
export interface IAvatar {
  src: StaticImageData;
  alt: string;
  size: string;
}

const Avatar: React.FC<IAvatar> = ({ src, alt, size }) => {
  return (
    <div className={styles.avatar}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={src}
          width={size}
          height={size}
          alt={alt}
        />
      </div>
    </div>
  );
};

export default Avatar;
