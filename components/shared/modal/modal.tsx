import React from 'react';
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
              style={{ marginTop: '0px' }}
              icon="close-circle"
              size={16}
              color="var(--primary09)"
              onClick={closeModal}
            />
          )}
        </div>
        {header && (
          <div className="text-center my-md-2 text-strong">{header}</div>
        )}
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
