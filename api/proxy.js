import fetch from 'node-fetch';
import AbortController from 'abort-controller';

export default async function handler(req, res) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const controller = new AbortController();
    const timeout = 30000; // タイムアウトを15秒に設定

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        console.log(`Fetching data from ${apiUrl}`);
        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Error fetching data from ${apiUrl}: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            console.error('Fetch request timed out');
            res.status(504).json({ error: 'Fetch request timed out' });
        } else {
            console.error('Error fetching data:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}