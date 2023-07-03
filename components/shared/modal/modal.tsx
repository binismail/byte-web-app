import ByteIcon from '../icon/byte.icon';
import styles from './modal.module.scss';

const Modal = (props: any) => {
  const { closeModal, header } = props;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className="flex flex-space-between">
          <div></div>
          {header && (
            <ByteIcon
              style={{ marginTop: '16px' }}
              icon="close-circle"
              size={16}
              color="var(--primary09)"
              onClick={closeModal}
            />
          )}
        </div>
        {header && (
          <p className="w-full text-center font-normal text-[#30333B]">
            {header}
          </p>
        )}
        <div className="h-fit bg-white">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
