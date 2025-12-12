import express from 'express';
import cors from 'cors';
import { RegisterRoutes } from './route/routes.js';
import { setupSwagger } from './config/swagger.js';
import { inicializarTabelas } from './database/databaseInit.js';

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: false
}));
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
