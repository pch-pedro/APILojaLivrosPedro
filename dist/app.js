"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_js_1 = require("./route/routes.js");
const swagger_js_1 = require("./config/swagger.js");
const databaseInit_js_1 = require("./database/databaseInit.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Swagger do TSOA
(0, swagger_js_1.setupSwagger)(app);
// Rotas automáticas do TSOA
(0, routes_js_1.RegisterRoutes)(app);
// Health
app.get('/health', (req, res) => res.json({ ok: true }));
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    (0, databaseInit_js_1.inicializarTabelas)();
});
exports.default = app;
