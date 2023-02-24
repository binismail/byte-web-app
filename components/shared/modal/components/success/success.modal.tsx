import Button from '../../../butttons/button/button';
import ByteIcon from '../../../icon/byte.icon';
import styles from './success.modal.module.scss';
export interface ISuccess {
  title: string;
  message: string;
  cta?: boolean;
  closeModal: any;
  buttonTitle?: string;
  buttonColor?: string;
}
const SuccessModal: React.FC<ISuccess> = ({
  title,
  message,
  cta,
  closeModal,
  buttonTitle = 'Done',
  buttonColor = 'btnPrimary',
}) => {
  return (
    <div className="modal">
      {closeModal && (
        <div className="flex flex-space-between">
          <div></div>
          <div className={styles.close}>
            <ByteIcon icon="close-circle" size={'20px'} />
          </div>
        </div>
      )}
      <div className={styles.container}>
        <div className="flex flex-justify-center">
          <svg
            width="61"
            height="60"
            viewBox="0 0 61 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.502 0C13.972 0 0.501953 13.47 0.501953 30C0.501953 46.53 13.972 60 30.502 60C47.032 60 60.502 46.53 60.502 30C60.502 13.47 47.032 0 30.502 0ZM44.842 23.1L27.832 40.11C27.412 40.53 26.842 40.77 26.242 40.77C25.642 40.77 25.072 40.53 24.652 40.11L16.162 31.62C15.292 30.75 15.292 29.31 16.162 28.44C17.032 27.57 18.472 27.57 19.342 28.44L26.242 35.34L41.662 19.92C42.532 19.05 43.972 19.05 44.842 19.92C45.712 20.79 45.712 22.2 44.842 23.1Z"
              fill="#19A97B"
            />
          </svg>
        </div>
        <div>
          <p className="text-strong text-center">{title}</p>
          <p className="text-section-subtitle text-center">{message}</p>
          <div>
            {(cta || buttonTitle) && (
              <div className="form-group mb-2">
                <Button color={buttonColor} title={buttonTitle} type="block" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
