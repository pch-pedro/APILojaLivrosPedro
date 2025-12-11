"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = void 0;
class UsuarioModel {
    id;
    nome;
    email;
    senha_hash;
    telefone;
    tipo_usuario;
    constructor(nome, email, senha_hash, telefone, tipo_usuario, id) {
        if (!nome || !email || !senha_hash || !telefone) {
            throw new Error('Todos os campos (nome, email, senha_hash, telefone) são obrigatórios.');
        }
        this.id = id;
        this.nome = nome,
            this.email = email,
            this.senha_hash = senha_hash,
            this.telefone = telefone,
            this.tipo_usuario = tipo_usuario;
    }
}
exports.UsuarioModel = UsuarioModel;
