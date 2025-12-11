"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ItemPedidoService_1 = require("../service/ItemPedidoService");
const PedidoView_1 = require("../view/PedidoView"); // Usamos a View do Pedido para formatação de erro/sucesso
const errors_1 = require("../utils/errors");
const router = (0, express_1.Router)();
const itemPedidoService = new ItemPedidoService_1.ItemPedidoService();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const handleServiceError = (err, res) => {
    let statusCode = 500;
    if (err instanceof errors_1.NotFoundError)
        statusCode = 404;
    else if (err instanceof errors_1.ValidationError)
        statusCode = 400;
    else if (err instanceof errors_1.ConflictError)
        statusCode = 409;
    return res.status(statusCode).json(PedidoView_1.PedidoView.formatarErro(err.message || 'Erro interno.', statusCode));
};
router.delete('/:itemId', asyncHandler(async (req, res) => {
    try {
        const itemId = parseInt(req.params.itemId, 10);
        if (isNaN(itemId)) {
            throw new errors_1.ValidationError("ID do Item de Pedido é inválido.");
        }
        await itemPedidoService.removeItemDoPedido(itemId);
        return res.status(200).json(PedidoView_1.PedidoView.formatarSucesso(null, `Item ${itemId} removido com sucesso.`, 200));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
exports.default = router;
