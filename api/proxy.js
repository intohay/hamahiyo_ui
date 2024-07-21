// api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
}
