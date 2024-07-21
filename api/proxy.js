import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        // FlaskアプリケーションのAPI URL
        const apiUrl = process.env.REACT_APP_API_URL;

        // start-taskエンドポイントにリクエストを送信してタスクを開始
        const startTaskResponse = await fetch(`${apiUrl}/start-task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!startTaskResponse.ok) {
            throw new Error(`Error starting task: ${startTaskResponse.statusText}`);
        }

        const startTaskData = await startTaskResponse.json();
        const jobId = startTaskData.job_id;

        // タスクのステータスを確認する
        const checkStatus = async (jobId) => {
            const statusResponse = await fetch(`${apiUrl}/task-status/${jobId}`);
            if (!statusResponse.ok) {
                throw new Error(`Error fetching task status: ${statusResponse.statusText}`);
            }
            return statusResponse.json();
        };

        // タスクの完了を待つ
        let taskStatus;
        do {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機
            taskStatus = await checkStatus(jobId);
        } while (taskStatus.status !== 'finished');

        // タスクの結果を返す
        res.status(200).json(taskStatus);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
