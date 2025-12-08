"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRequestDto = void 0;
class UsuarioRequestDto {
    nome;
    email;
    senha_hash;
    telefone;
    tipo_usuario;
    constructor(nome, email, senha_hash, telefone, tipo_usuario) {
        this.nome = nome,
            this.email = email,
            this.senha_hash = senha_hash,
            this.telefone = telefone,
            this.tipo_usuario = tipo_usuario;
    }
}
exports.UsuarioRequestDto = UsuarioRequestDto;
