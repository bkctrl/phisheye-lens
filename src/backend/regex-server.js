import express from 'express';
import cors from 'cors';
import { send_RegexPassword } from './apis/generate_data.js';


const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

let regexPass;

regexPass = await send_RegexPassword();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/correct-regex', (req, res) => {
    res.send(regexPass);
});









