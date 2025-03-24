import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';

import scrapeRouter from './routs/scrape.routes.js';
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
//Rota
app.use('/api/scrape', scrapeRouter);

app.get('/', (req, res) => {
  res.send('Hello! Amazom API !');
});

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta https://localhost:${PORT}`);
});

export default app;
