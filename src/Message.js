
import styles from './Message.module.css';
import logo from './hiyoko.png';
import React, { useState } from 'react';

const MessageWithOverlay = ({ message }) => {
  const [visible, setVisible] = useState(false);

  const handleToggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className={styles.message}>
      {!visible && (
        <div className={styles.overlay} onClick={handleToggleVisibility}>
          
        </div>
      )}
      <div className={styles.under_message}>
        {message}
      </div>
    </div>
  );
};


function Message({ message }) {
  return (
    <div className={styles.box}>
        <img src={logo} alt="logo" className={styles.icon}/>
        <div className={styles.message_box}>
            <div className={styles.name}>ハマヒヨちゃん</div>
            <MessageWithOverlay message={message} />
        </div>
    </div>
  );
}


export { Message };