import { toast } from 'react-toastify';

export const copyToClipBoard = async (
  text: string,
  functionToCall?: () => void,
  successMessage: string = 'Copied to your clipboard!'
) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
    console.log(successMessage);
    functionToCall && functionToCall();
  } catch (error) {
    console.log('Failed to copy Text! ', error);
  }
};
