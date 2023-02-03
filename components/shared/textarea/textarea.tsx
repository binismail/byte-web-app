import styles from './textarea.module.scss';
export interface ITextArea {
  placeholder: string;
  rows: number;
  value: string;
  onChange?: any;
}

const TextArea: React.FC<ITextArea> = ({ placeholder, rows }) => {
  return (
    <textarea
      rows={rows}
      className={styles.textArea}
      placeholder={placeholder}
    ></textarea>
  );
};

export default TextArea;
