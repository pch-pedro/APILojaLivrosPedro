"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const livroRoutes_js_1 = __importDefault(require("./routes/livroRoutes.js"));
const categoriaRoutes_js_1 = __importDefault(require("./routes/categoriaRoutes.js"));
const swagger_js_1 = require("./config/swagger.js");
const itemPedidoRoutes_js_1 = __importDefault(require("./routes/itemPedidoRoutes.js"));
const carrinhoRoutes_js_1 = __importDefault(require("./routes/carrinhoRoutes.js"));
const cors_1 = __importDefault(require("cors"));
const routes_js_1 = require("./route/routes.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, routes_js_1.RegisterRoutes)(app);
// Rotas
app.use('/livros', livroRoutes_js_1.default);
app.use('/categorias', categoriaRoutes_js_1.default);
app.use('/item-pedido', itemPedidoRoutes_js_1.default);
app.use('/carrinho', carrinhoRoutes_js_1.default);
// Configuração do Swagger
(0, swagger_js_1.setupSwagger)(app);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'API em funcionamento', timestamp: new Date() });
});
// 404 para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/api-docs`);
});
exports.default = app;
