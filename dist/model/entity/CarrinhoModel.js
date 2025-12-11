"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrinhoModel = void 0;
class CarrinhoModel {
    id;
    usuario_id;
    livro_id;
    quantidade;
    data_adicao;
    constructor(usuario_id, livro_id, quantidade, data_adicao, id) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.data_adicao = data_adicao;
    }
}
exports.CarrinhoModel = CarrinhoModel;
