import express from 'express';
import cors from 'cors';
import { setupSwagger } from './config/swagger.js';
import livroRoutes from './routes/livroRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import itemPedidoRoutes from './routes/itemPedidoRoutes.js';
import carrinhoRoutes from './routes/carrinhoRoutes.js';
import { RegisterRoutes } from './route/routes.js';

// IMPORTANTE 👇
import { inicializarTabelas } from './database/databaseInit.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
RegisterRoutes(app);

app.use('/livros', livroRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/item-pedido', itemPedidoRoutes);
app.use('/carrinho', carrinhoRoutes);

setupSwagger(app);

app.get('/health', (req, res) => {
    res.json({ status: 'API em funcionamento', timestamp: new Date() });
});

const port = process.env.PORT || 3000;

// 🚀 CHAMAR ANTES DE INICIAR O SERVIDOR
inicializarTabelas().then(() => {
    app.listen(port, () => {
        console.log("Servidor rodando na porta " + port);
    });
}).catch((err) => {
    console.error("Erro ao inicializar tabelas:", err);
});

export default app;
