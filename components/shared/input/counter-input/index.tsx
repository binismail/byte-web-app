type Props = {
  value: number;
  onIncreaseClick: () => void;
  onDecreaseClick: () => void;
};

const CounterInput = ({ value, onIncreaseClick, onDecreaseClick }: Props) => {
  return (
    <div className="flex w-full justify-between items-center h-[48px] border border-[#565A63] rounded-2xl overflow-hidden mt-1">
      {/* decrease */}
      <button
        onClick={onDecreaseClick}
        className="inline-flex disabled:opacity-40 justify-center items-center h-full w-[20%] rounded-l-xl bg-[#F0F2F5] border-[1px_1px_1px_0] border-[#565A63]"
      >
        -
      </button>

      {/* value */}
      <span className="text-sm text-[#565A63] font-normal">{value}</span>

      {/* increase */}
      <button
        onClick={onIncreaseClick}
        className="inline-flex disabled:opacity-40 justify-center items-center h-full w-[20%] rounded-r-xl bg-[#F0F2F5] border-[1px_1px_0_1px] border-[#565A63]"
      >
        +
      </button>
    </div>
  );
};

export default CounterInput;
