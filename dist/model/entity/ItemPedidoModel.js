"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemPedidoModel = void 0;
class ItemPedidoModel {
    static proximoId = 1;
    id;
    pedido_id;
    livro_id;
    quantidade;
    preco_unitario_pago;
    constructor(pedido_id, livro_id, quantidade, preco_unitario_pago) {
        this.id = ItemPedidoModel.proximoId++;
        this.pedido_id = pedido_id;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.preco_unitario_pago = preco_unitario_pago;
    }
    //GETTERS
    getId() {
        return this.id;
    }
    getPedido_Id() {
        return this.pedido_id;
    }
    getLivro_Id() {
        return this.livro_id;
    }
    getQuantidade() {
        return this.quantidade;
    }
    getPreco_Unitario_Pago() {
        return this.preco_unitario_pago;
    }
    //SETTERS
    setPedido_Id(pedido_id) {
        this.pedido_id = pedido_id;
    }
    setLivro_Id(livro_id) {
        this.livro_id = this.livro_id;
    }
    setQuantidade(quantidade) {
        this.quantidade = quantidade;
    }
    setPreco_Unitario_Pago(preco_unitario_pago) {
        this.preco_unitario_pago = preco_unitario_pago;
    }
}
exports.ItemPedidoModel = ItemPedidoModel;
