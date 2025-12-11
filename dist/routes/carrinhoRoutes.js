"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CarrinhoService_1 = require("../service/CarrinhoService");
const PedidoView_1 = require("../view/PedidoView");
const errors_1 = require("../utils/errors");
const router = (0, express_1.Router)();
const carrinhoService = new CarrinhoService_1.CarrinhoService();
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
router.post('/', asyncHandler(async (req, res) => {
    try {
        const data = req.body;
        const itemAtualizado = await carrinhoService.addItem(data);
        return res.status(201).json(PedidoView_1.PedidoView.formatarSucesso(itemAtualizado, 'Item adicionado/atualizado no carrinho.', 201));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
router.get('/:usuarioId', asyncHandler(async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.usuarioId, 10);
        if (isNaN(usuarioId) || usuarioId <= 0) {
            throw new errors_1.ValidationError('ID de Usuário inválido.');
        }
        const itensCarrinho = await carrinhoService.getCarrinho(usuarioId);
        return res.status(200).json(PedidoView_1.PedidoView.formatarSucesso(itensCarrinho, 'Carrinho retornado com sucesso.', 200));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
router.put('/:usuarioId/item/:livroId', asyncHandler(async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.usuarioId, 10);
        const livroId = parseInt(req.params.livroId, 10);
        const { quantidade } = req.body;
        if (quantidade === undefined || isNaN(quantidade)) {
            throw new errors_1.ValidationError('A quantidade deve ser fornecida no corpo da requisição.');
        }
        const itemAtualizado = await carrinhoService.updateItemQuantity(usuarioId, livroId, quantidade);
        if (!itemAtualizado) {
            return res.status(200).json(PedidoView_1.PedidoView.formatarSucesso(null, "Item removido do carrinho (quantidade definida como 0).", 200));
        }
        return res.status(200).json(PedidoView_1.PedidoView.formatarSucesso(itemAtualizado, 'Quantidade do item atualizada.', 200));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
router.delete('/:usuarioId/item/:livroId', asyncHandler(async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.usuarioId, 10);
        const livroId = parseInt(req.params.livroId, 10);
        const successDelete = await carrinhoService.removeItem(usuarioId, livroId);
        if (!successDelete) {
            throw new errors_1.NotFoundError("Item não encontrado no carrinho para remoção.");
        }
        return res.status(200).json(PedidoView_1.PedidoView.formatarSucesso(null, "Item removido do carrinho com sucesso.", 200));
    }
    catch (err) {
        handleServiceError(err, res);
    }
}));
exports.default = router;
