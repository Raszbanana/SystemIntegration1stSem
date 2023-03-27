import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/timestamp', (req, res) => {
  res.send({ timestamp: new Date() });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
