"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrinhoModel = void 0;
class CarrinhoModel {
    static proximoId = 1;
    id;
    usuario_id;
    livro_id;
    quantidade;
    data_adicao;
    constructor(usuario_id, livro_id, quantidade, data_adicao) {
        this.id = CarrinhoModel.proximoId++;
        this.usuario_id = usuario_id;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.data_adicao = data_adicao;
    }
    //GETTERS
    getId() {
        return this.id;
    }
    getUsuario_Id() {
        return this.usuario_id;
    }
    getLivro_Id() {
        return this.livro_id;
    }
    getQuantidade() {
        return this.quantidade;
    }
    getData_Adicao() {
        return this.data_adicao;
    }
    //SETTERS
    setUsuario(usuario_id) {
        this.usuario_id = usuario_id;
    }
    setIdLivro(livro_id) {
        this.livro_id = livro_id;
    }
    setQuantidade(quantidade) {
        this.quantidade = quantidade;
    }
    setData_Adicao(data_adicao) {
        this.data_adicao = data_adicao;
    }
}
exports.CarrinhoModel = CarrinhoModel;
