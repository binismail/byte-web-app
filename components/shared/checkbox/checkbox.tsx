import { FocusEventHandler, MouseEventHandler } from 'react';
import styles from './Checkbox.module.scss';
export interface ICheckbox {
  label: string;
  className?: string;
  type?: 'radio' | 'checkbox';
  value?: string | number;
  onChange?: any;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  readOnly?: boolean;
  defaultValue?: string | number | readonly string[];
  defaultChecked?: boolean;
  checked?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
}

const Checkbox = ({
  label,
  className,
  value,
  type = 'checkbox',
  onChange,
  onBlur,
  name,
  onFocus,
  readOnly,
  defaultValue,
  defaultChecked,
  checked,
  onClick,
}: ICheckbox) => {
  return (
    <div>
      <label className="flex-center space">
        <input
          onClick={onClick}
          defaultChecked={defaultChecked}
          checked={checked}
          defaultValue={defaultValue}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          onFocus={onFocus}
          type={type}
          className={className}
        />
        <span className={styles.label}>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
