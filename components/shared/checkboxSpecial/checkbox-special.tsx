export interface ICheckboxSpecial {
  label: string;
}

const CheckboxSpecial: React.FC<ICheckboxSpecial> = () => {
  return (
    <div>
      <label className="toggler-wrapper style-1">
        <input type="checkbox" />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  );
};

export default CheckboxSpecial;
