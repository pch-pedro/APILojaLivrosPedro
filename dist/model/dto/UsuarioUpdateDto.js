"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioUpdateDto = void 0;
class UsuarioUpdateDto {
    nome;
    email;
    senha_hash;
    telefone;
    tipo_usuario;
    constructor(nome, email, senha_hash, telefone, tipo_usuario) {
        this.nome = nome;
        this.email = email;
        this.senha_hash = senha_hash;
        this.telefone = telefone;
        tipo_usuario = tipo_usuario;
    }
}
exports.UsuarioUpdateDto = UsuarioUpdateDto;
