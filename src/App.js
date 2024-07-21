import styles from './App.module.css';
import { Message } from './Message.js';
import { Header } from './Header.js';

import { useState, useRef } from 'react';



function App() {
  const targetRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const handleGenerateClick = async () => {

    setLoading(true); // ローディング開始
    setMessages([]); // メッセージをクリア

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const startTaskResponse = await fetch(`${apiUrl}/start-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!startTaskResponse.ok) {
        throw new Error('Failed to start task');
      }

      const startTaskData = await startTaskResponse.json();
      const jobId = startTaskData.job_id;
      console.log(jobId);
      const checkStatus = async (jobId) => {
        const statusResponse = await fetch(`${apiUrl}/task-status/${jobId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!statusResponse.ok) {
          throw new Error('Failed to check status');
        }

        return statusResponse.json();
      };

      let taskStatus;
      do {
        await new Promise(resolve => setTimeout(resolve, 1000));
        taskStatus = await checkStatus(jobId);
      } while (taskStatus.status !== 'finished');

      if (taskStatus.result) {
        setMessages(taskStatus.result);
      } else {
        console.log("Invalid response format: ", taskStatus);
      }

    } catch (error) {
      console.error('Error:', error);
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
