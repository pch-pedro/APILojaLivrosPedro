import express, { type Express } from 'express';
import livroRoutes from './routes/livroRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js'
import { setupSwagger } from './config/swagger.js';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'API em funcionamento', timestamp: new Date() });
});

// Rotas
app.use('/livros', livroRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/categorias', categoriaRoutes);

// Configuração do Swagger
setupSwagger(app);

// 404 para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/api-docs`);
});

export default app;
