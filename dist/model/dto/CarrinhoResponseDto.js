"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrinhoResponseDto = void 0;
class CarrinhoResponseDto {
    id;
    usuario_id;
    livro_id;
    quantidade;
    data_adicao;
    constructor(model) {
        this.id = model.id;
        this.usuario_id = model.usuario_id;
        this.livro_id = model.livro_id;
        this.quantidade = model.quantidade;
        this.data_adicao = model.data_adicao.toISOString();
    }
}
exports.CarrinhoResponseDto = CarrinhoResponseDto;
