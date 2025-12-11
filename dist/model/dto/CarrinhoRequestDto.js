"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrinhoRequestDto = void 0;
class CarrinhoRequestDto {
    usuario_id;
    livro_id;
    quantidade;
    constructor(usuario_id, livro_id, quantidade) {
        this.usuario_id = usuario_id;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
    }
}
exports.CarrinhoRequestDto = CarrinhoRequestDto;
