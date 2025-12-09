import express, { type Express } from 'express';
import livroRoutes from './routes/livroRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js'
import { setupSwagger } from './config/swagger.js';
import pedidoRoutes from './routes/pedidoRoutes.js'
import itemPedidoRoutes from './routes/itemPedidoRoutes.js'
import cors from 'cors';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'API em funcionamento', timestamp: new Date() });
});

// Rotas
app.use('/livros', livroRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/pedidos', pedidoRoutes)
app.use('./item-pedido', pedidoRoutes)

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
