"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemPedidoRequestDto = void 0;
class ItemPedidoRequestDto {
    livro_id;
    quantidade;
    constructor(livro_id, quatidade) {
        this.livro_id = livro_id;
        this.quantidade = quatidade;
    }
}
exports.ItemPedidoRequestDto = ItemPedidoRequestDto;
