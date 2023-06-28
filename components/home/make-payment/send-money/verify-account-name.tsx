import { TickCircle } from 'iconsax-react';
import { useEffect } from 'react';
import { useConfirmBankAccountQuery } from '../../../../lib/services/businessApi';

type Props = {
  bankCode: string;
  accountNumber: string;
  setValues: any;
  accountName: string;
};

const VerifyAccountName = ({
  accountNumber,
  bankCode,
  setValues,
  accountName,
}: Props) => {
  // DATA INITIALIZATION
  const { isLoading, data, isError, error, isSuccess } =
    useConfirmBankAccountQuery(
      {
        accountNumber,
        bankCode,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  // SIDE EFFECTS
  useEffect(() => {
    if (isSuccess) {
      setValues('accountName', data?.data?.account_name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);
  useEffect(() => {
    if (isError) {
      setValues('accountName', '');
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return (
    <>
      {isLoading ? (
        <p className="text-sm font-normal text-green-500 mt-2">validating...</p>
      ) : isError ? (
        <p className="text-sm font-normal text-red-500 mt-2">
          Account not found!
        </p>
      ) : (
        <div className="flex items-center mt-2 gap-2">
          <TickCircle size="20" color="#19A97B" variant="Bold" />
          <p className="text-section-subtitle inline-flex items-center gap-1">
            {accountName}
          </p>
        </div>
      )}
    </>
  );
};

export default VerifyAccountName;
