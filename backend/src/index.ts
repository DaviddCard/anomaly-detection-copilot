import express from 'express';
import pool from './db';
import authRouter from './auth';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send('server running');
});

app.get('/db-test', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});









