"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = exports.TipoUsuario = void 0;
var TipoUsuario;
(function (TipoUsuario) {
    TipoUsuario["CLIENTE"] = "CLIENTE";
    TipoUsuario["ADMIN"] = "ADMIN";
})(TipoUsuario || (exports.TipoUsuario = TipoUsuario = {}));
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
