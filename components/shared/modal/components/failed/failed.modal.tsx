import Button from '../../../butttons/button/button';
import styles from './failed.modal.module.scss';

export interface IFailed {
  title?: string;
  message: string;
  cta?: boolean;
  closeModal?: any;
  buttonTitle?: string;
  buttonColor?: string;
  buttonOnClick?: () => void;
  buttonDisabled?: boolean;
  buttonLoading?: boolean;
}

const FailedModal: React.FC<any> = ({
  title,
  message,
  cta,
  closeModal,
  buttonTitle = 'Try again',
  buttonColor = 'btnPrimary',
  buttonOnClick,
  buttonDisabled,
  buttonLoading,
}) => {
  return (
    <div className="modal">
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
              d="M30.502 0C13.972 0 0.501953 13.47 0.501953 30C0.501953 46.53 13.972 60 30.502 60C47.032 60 60.502 46.53 60.502 30C60.502 13.47 47.032 0 30.502 0ZM40.582 36.9C41.452 37.77 41.452 39.21 40.582 40.08C40.132 40.53 39.562 40.74 38.992 40.74C38.422 40.74 37.852 40.53 37.402 40.08L30.502 33.18L23.602 40.08C23.152 40.53 22.582 40.74 22.012 40.74C21.442 40.74 20.872 40.53 20.422 40.08C19.552 39.21 19.552 37.77 20.422 36.9L27.322 30L20.422 23.1C19.552 22.23 19.552 20.79 20.422 19.92C21.292 19.05 22.732 19.05 23.602 19.92L30.502 26.82L37.402 19.92C38.272 19.05 39.712 19.05 40.582 19.92C41.452 20.79 41.452 22.23 40.582 23.1L33.682 30L40.582 36.9Z"
              fill="#CF4F66"
            />
          </svg>
        </div>
        <div>
          <div className="w-full flex flex-col gap-2">
            <p className="text-strong text-center">{title}</p>
            <p className="text-section-content text-center">{message}</p>
          </div>
          <div>
            {(cta || buttonTitle) && (
              <div className="form-group mb-2">
                <Button
                  disabled={buttonDisabled}
                  loading={buttonLoading}
                  click={buttonOnClick}
                  color={buttonColor}
                  title={buttonTitle}
                  type="block"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailedModal;
