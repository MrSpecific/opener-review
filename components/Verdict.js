// import Bottle from '@public/svg/bottle.svg';
import Bottle from '@public/svg/bottle.svg';
import styles from '@styles/pages/Review.module.css';

const Verdict = (props) => {
  return (
    <div className={styles.verdict}>
      {props.verdict}
      <Bottle />
    </div>
  );
};

export default Verdict;
