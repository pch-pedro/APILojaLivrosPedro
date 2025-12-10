"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnderecoModel = void 0;
class EnderecoModel {
    id;
    usuario_id;
    cep;
    rua;
    numero;
    complemento;
    cidade;
    estado;
    constructor(usuario_id, cep, rua, numero, complemento, cidade, estado, id) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.estado = estado;
    }
}
exports.EnderecoModel = EnderecoModel;
