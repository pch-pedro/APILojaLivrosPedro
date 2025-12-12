import express from 'express';
import cors from 'cors';
import { RegisterRoutes } from './route/routes.js';
import { setupSwagger } from './config/swagger.js';
import { inicializarTabelas } from './database/databaseInit.js';

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger do TSOA
setupSwagger(app);

// Rotas automáticas do TSOA
RegisterRoutes(app);

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    inicializarTabelas();
});

export default app;
