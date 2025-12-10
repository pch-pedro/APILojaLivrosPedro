"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemPedidoService = void 0;
const PedidoRepository_1 = require("../repository/PedidoRepository");
const errors_1 = require("../utils/errors");
const PedidoStatus_1 = require("../enums/PedidoStatus");
class ItemPedidoService {
    pedidoRepository;
    constructor(pedidoRepository = PedidoRepository_1.PedidoRepository.getInstance()) {
        this.pedidoRepository = pedidoRepository;
    }
    async removeItemDoPedido(itemId) {
        const item = await this.pedidoRepository.buscarItemPorId(itemId);
        if (!item) {
            throw new errors_1.NotFoundError(`Item de Pedido com ID ${itemId} não encontrado.`);
        }
        const pedido = await this.pedidoRepository.buscarPorId(item.pedido_id);
        if (!pedido) {
            throw new Error("Falha de integridade: Pedido pai não encontrado.");
        }
        if (pedido.status_pedido !== PedidoStatus_1.PedidoStatus.PENDENTE) {
            throw new errors_1.ConflictError(`Não é possível remover itens de pedidos com status ${pedido.status_pedido}.`);
        }
        await this.pedidoRepository.removerItem(itemId);
    }
}
exports.ItemPedidoService = ItemPedidoService;
