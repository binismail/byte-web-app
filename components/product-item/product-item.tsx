import React from 'react';
import Image from 'next/image';

interface IProductItem {
  name: string;
  description: string;
  amount: string;
  src: any;
}
const ProductItem: React.FC<IProductItem> = ({
  name,
  description,
  amount,
  src,
}) => {
  return (
    <div className="flex flex-space-between">
      <div className="flex flex-align-center my-md-1">
        <div className="mr-md-1 ">
          <Image
            alt={src}
            src={src}
            className="image-rounded"
            height={50}
            width={50}
          />
        </div>
        <div>
          <p className="text-value mt-0 mb-0">{name}</p>
          <p className="text-label text-neutral06 mt-0 mb-0">{description}</p>
        </div>
      </div>
      {amount && <p>{amount}</p>}
    </div>
  );
};

export default ProductItem;
