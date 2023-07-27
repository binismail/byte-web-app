import { Icon } from 'iconsax-react';
import Link from 'next/link';

type Props = {
  header: string;
  description: string;
  IconSelect: Icon;
  iconBg: string;
  cardBg: string;
  path: string;
};

const ToolsCard = ({
  header,
  description,
  IconSelect,
  iconBg,
  cardBg,
  path,
}: Props) => {
  return (
    <Link href={path}>
      <div
        className={`rounded-[10px] flex flex-col items-center gap-3 cursor-pointer px-4 h-[160px] justify-center ${cardBg}`}
      >
        {/* icon */}
        <span
          className={`inline-flex items-center justify-center rounded-xl p-3 ${iconBg}`}
        >
          <IconSelect size="16" color="#FFF" variant="Bold" />
        </span>

        {/* title */}
        <div className="flex flex-col text-center w-full gap-1">
          <h3 className="font-normal text-[#30333B] text-sm">{header}</h3>

          {/* description */}
          <h5 className="text-xs font-normal text-[#808691]">{description}</h5>
        </div>
      </div>
    </Link>
  );
};

export default ToolsCard;
