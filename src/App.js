import styles from './App.module.css';
import { Message } from './Message';
import { Header } from './Header';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';


function App() {
  const targetRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const handleGenerateClick = async () => {

    setLoading(true); // ローディング開始
    setMessages([]); // メッセージをクリア

    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      console.log(data);
      if (Array.isArray(data)) {
        setMessages(data); 
      } else {
        console.error('Invalid response format: ', data);
      } 
    } catch (error) {
      console.error('Failed to fetch data: ', error);
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.talk_box}>
        <div ref={targetRef}>
          <Header />
          <Message message="やほー！" />
          {loading ? (
            <div className={styles.loader}></div> // ローディングスピナーを表示
          ) : (
            messages.map((message, index) => (
              <Message key={index} message={message} />
            ))
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <button onClick={handleGenerateClick} className={styles.button}>生成</button>
      </div>
    </div>
  );
}

export default App;
