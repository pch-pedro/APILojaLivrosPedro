"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnderecoModel = void 0;
class EnderecoModel {
    static proximoId = 1;
    id;
    usuario_id;
    cep;
    rua;
    numero;
    complemento;
    cidade;
    estado;
    constructor(usuario_id, cep, rua, numero, complemento, cidade, estado) {
        this.id = EnderecoModel.proximoId++;
        this.usuario_id = usuario_id;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.estado = estado;
    }
    //GETTERS
    getId() {
        return this.id;
    }
    getUsuario_Id() {
        return this.usuario_id;
    }
    getCep() {
        return this.cep;
    }
    getRua() {
        return this.rua;
    }
    getNumero() {
        return this.numero;
    }
    getComplemento() {
        return this.complemento;
    }
    getCidade() {
        return this.cidade;
    }
    getEstado() {
        return this.estado;
    }
    //SETTERS
    setUsuarioId(usuario_id) {
        this.usuario_id = usuario_id;
    }
    setCep(cep) {
        this.cep = cep;
    }
    setRua(rua) {
        this.rua = rua;
    }
    setNumero(numero) {
        this.numero = numero;
    }
    setComplemento(complemento) {
        this.complemento = complemento;
    }
    setCidade(cidade) {
        this.cidade = cidade;
    }
    setEstado(estado) {
        this.estado = estado;
    }
}
exports.EnderecoModel = EnderecoModel;
