import { RotatingLines } from 'react-loader-spinner';

type Props = {
  spinnerColor?: string;
  heightTailwind?: string;
};

const LoadingState = ({
  heightTailwind = 'h-[50vh]',
  spinnerColor = '#4E5AA5',
}: Props) => {
  return (
    <div
      className={`w-full ${heightTailwind} flex items-center justify-center`}
    >
      {/* <TailSpin
        height="40"
        width="40"
        color="#4E5AA5"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        /> */}
      {/* <Oval
        height={40}
        width={40}
        color="#4E5AA5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="grey"
        strokeWidth={3}
        strokeWidthSecondary={3}
        /> */}
      <RotatingLines
        strokeColor={spinnerColor}
        strokeWidth="4"
        animationDuration="0.75"
        width="40"
        visible={true}
      />
    </div>
  );
};

export default LoadingState;
