
import styles from './Message.module.css';
import logo from './hiyoko.png';

function Message({ message }) {
  return (
    <div className={styles.box}>
        <img src={logo} alt="logo" className={styles.icon}/>
        <div className={styles.message_box}>
            <div className={styles.name}>ハマヒヨちゃん</div>
            <div className={styles.message}>{message}</div>
        </div>
    </div>
  );
}


export { Message };