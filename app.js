import express from 'express';

import { PORT } from './config/env.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(errorMiddleware); ////Extrai inforomações sobre o erro

//Rotas
app.use('/api/srape', scrapRouter);

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta https://localhost:${PORT}`);
});

export default app;
