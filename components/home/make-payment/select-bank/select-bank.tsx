import BankItem from '../../../bank-item/bank-item';
import SearchInput from '../../../shared/input/search-input/search-input';
import styles from './select-bank.module.scss';

const Selectbank: React.FC<any> = () => {
  return (
    <div className="modal">
      <div className={styles.container}>
        <div>
          <div className="form-group">
            <SearchInput placeholder="Search for a bank" type="text" />
          </div>
          <div>
            <BankItem name="Citi Bank" />
            <BankItem name="First City Monument Bank" />
            <BankItem name="First Bank" />
            <BankItem name="GT Bank" />
            <BankItem name="Kuda MFB" />
            <BankItem name="United Bank for Africa" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selectbank;
