import { ChangeEventHandler, FocusEventHandler } from 'react';
import styles from './textarea.module.scss';
export interface ITextArea {
  placeholder: string;
  rows: number;
  value?: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  readOnly?: boolean;
}

const TextArea = ({
  placeholder,
  rows,
  value,
  name,
  onChange,
  onBlur,
  onFocus,
  readOnly,
}: ITextArea) => {
  return (
    <textarea
      readOnly={readOnly}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      onFocus={onFocus}
      rows={rows}
      className={styles.textArea}
      placeholder={placeholder}
    ></textarea>
  );
};

export default TextArea;
