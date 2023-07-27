import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { isEmpty } from '../../../helpers/is-emtpy';
import { objectToFormData } from '../../../helpers/object-to-formdata';
import { useAppSelector } from '../../../hooks/hooks';
import { selectUserDetails } from '../../../lib/redux/userDetailsSlice/userDetailsSlice';
import { useUpdateBusinessImageMutation } from '../../../lib/services/businessApi';
import Button from '../../shared/butttons/button/button';
import IconShadow from '../../shared/icon/icon-shadow';

type PickedImageType = {
  path: string;
  preview: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

const ProfilePhotoUpload = () => {
  // STATES
  const [pickedImage, setPickedImage] = useState<PickedImageType>({
    path: '',
    preview: '',
    name: '',
    size: 0,
    type: '',
    webkitRelativePath: '',
  });
  const [files, setFiles] = useState<unknown[]>([]);
  const [error, setError] = useState<string>('');
  const [hasImage, setHasImage] = useState<boolean>(false);

  // DATA INITIALIZATION
  const router = useRouter();
  const userDetails = useAppSelector(selectUserDetails);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5242880,
    onDrop: (acceptedFiles) => {
      setHasImage(false);
      setError('');
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    onDropRejected(fileRejections, event) {
      setError("file shouldn't be more than 5mb");
      console.log('files: ', fileRejections);
      console.log('event: ', event);
    },
  });

  // HOOKS
  const [updateBusinessImage, { isLoading: isUploadImageLoading }] =
    useUpdateBusinessImageMutation();

  // HANDLERS
  const uploadBusinessImage = () => {
    // form data
    const imageData = {
      avatar: pickedImage.path,
    };
    const bodyFormData = objectToFormData(imageData);

    // make req
    updateBusinessImage(bodyFormData)
      .unwrap()
      .then((data: any) => {
        toast.success(data?.message || `Profile image uploaded!`);
        router.push('/dashboard/settings');
      })
      .catch((error: any) => {
        toast.error(error?.data?.message || `Failed to upload profile image`);
      });
  };

  // SIDE EFFECTS
  useEffect(() => {
    setHasImage(!isEmpty(userDetails.image));
  }, []);
  useEffect(() => {
    setPickedImage(files[0] as PickedImageType);
  }, [files]);

  return (
    <div className="w-full flex items-center justify-center mb-4">
      {hasImage ? (
        <div
          {...getRootProps()}
          className="w-full flex flex-col items-center gap-5 text-center"
        >
          <span className="rounded-[50%] bg-[#F0F2F5] h-[70px] w-[70px] inline-flex items-center justify-center overflow-hidden">
            <Image
              objectFit="cover"
              className="rounded-[50%]"
              height="70px"
              width="70px"
              src={userDetails.image || ''}
              alt=""
            />
          </span>

          {/* texts */}
          <div className="w-fit flex flex-col items-center text-center gap-1">
            <Button
              title="Change profile photo"
              type="block"
              color="btnPrimary"
            />
          </div>
        </div>
      ) : pickedImage?.preview ? (
        <div className="w-full flex flex-col items-center gap-5 text-center">
          {/* image */}
          <span className="rounded-[50%] bg-[#F0F2F5] h-[70px] w-[70px] inline-flex items-center justify-center overflow-hidden">
            <Image
              objectFit="cover"
              className="rounded-[50%]"
              height="70px"
              width="70px"
              src={
                pickedImage.preview
                  ? pickedImage.preview
                  : userDetails.image || ''
              }
              alt=""
            />
          </span>

          {/* upload button */}
          <div className="w-fit flex flex-col items-center text-center gap-1">
            <Button
              disabled={isUploadImageLoading}
              loading={isUploadImageLoading}
              click={uploadBusinessImage}
              title="Upload image"
              type="block"
              color="btnPrimary"
            />
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="w-full flex flex-col items-center gap-5 text-center"
        >
          {/* icon */}
          <IconShadow
            icon="d-cube-scan"
            color="var(--neutral06)"
            size="24"
            className="grey medium"
          />

          {/* texts */}
          <div className="w-fit flex flex-col items-center text-center gap-1">
            {/* error message */}
            {error && (
              <span className="text-red-500 text-sm font-normal mx-auto">
                {error}
              </span>
            )}
            <p className="font-normal text-center text-base text-[#6A78D1] w-full">
              {' '}
              Change profile photo
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUpload;
