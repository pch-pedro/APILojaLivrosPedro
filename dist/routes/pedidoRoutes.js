"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PedidoService_1 = require("../service/PedidoService");
const PedidoView_1 = require("../view/PedidoView");
const errors_1 = require("../utils/errors");
const router = (0, express_1.Router)();
const pedidoService = new PedidoService_1.PedidoService();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const handleServiceError = (err, res) => {
    const defaultMessage = 'Erro interno do servidor.';
    let statusCode = 500;
    if (err instanceof errors_1.NotFoundError) {
        statusCode = 404;
    }
    else if (err instanceof errors_1.ValidationError) {
        statusCode = 400;
    }
    else if (err instanceof errors_1.ConflictError) {
        statusCode = 409;
    }
    return res.status(statusCode).json(PedidoView_1.PedidoView.formatarErro(err.message || defaultMessage, statusCode));
};
// POST /pedido
router.post('/', asyncHandler(async (req, res) => {
    try {
        const data = req.body;
        const novoPedidoDto = await pedidoService.criarPedido(data);
        return res.status(201).json(PedidoView_1.PedidoView.formatarSucesso(PedidoView_1.PedidoView.formatarPedido(novoPedidoDto), 'Pedido criado e processado com sucesso!', 201));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
// GET /pedido/usuario/:usuarioId
router.get('/usuario/:usuarioId', asyncHandler(async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.usuarioId, 10);
        const pedidos = await pedidoService.listarPedidosPorUsuario(usuarioId);
        return res.status(200).json(PedidoView_1.PedidoView.formatarSucesso(PedidoView_1.PedidoView.formatarListaPedidos(pedidos), 'Pedidos listados com sucesso', 200));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
// GET /pedido/:id
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const pedido = await pedidoService.buscarPedidoPorId(id);
        return res.status(200).json(PedidoView_1.PedidoView.formatarSucesso(PedidoView_1.PedidoView.formatarPedido(pedido), "Pedido encontrado", 200));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
// PUT /pedido/:id/status
router.put('/:id/status', asyncHandler(async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { status } = req.body;
        const updatedPedido = await pedidoService.atualizarPedidoStatus(id, status);
        return res.status(200).json(PedidoView_1.PedidoView.formatarSucesso(PedidoView_1.PedidoView.formatarPedido(updatedPedido), `Status atualizado para ${status}`, 200));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
exports.default = router;
