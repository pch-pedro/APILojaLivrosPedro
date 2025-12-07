"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = void 0;
class UsuarioModel {
    static proximoId = 1;
    id;
    nome;
    email;
    senha_hash;
    telefone;
    tipo_usuario;
    constructor(nome, email, senha_hash, telefone, tipo_usuario) {
        this.id = UsuarioModel.proximoId++;
        this.nome = nome,
            this.email = email,
            this.senha_hash = senha_hash,
            this.telefone = telefone,
            this.tipo_usuario = tipo_usuario;
    }
    //GETTERS
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getEmail() {
        return this.email;
    }
    getSenha_Hash() {
        return this.senha_hash;
    }
    getTelefone() {
        return this.telefone;
    }
    getTipoUsuario() {
        return this.tipo_usuario;
    }
    //SETTERS
    setNome(nome) {
        this.nome = nome;
    }
    setEmail(email) {
        this.email = email;
    }
    setSenha_Hash(senha_hash) {
        this.senha_hash = senha_hash;
    }
    setTelefone(telefone) {
        this.telefone = telefone;
    }
    setTipoUsuario(tipo_usuario) {
        this.tipo_usuario = tipo_usuario;
    }
    //Verificações
    ehAdmin() {
        return this.tipo_usuario === "ADMIN";
    }
    ehCliente() {
        return this.tipo_usuario === "CLIENTE";
    }
}
exports.UsuarioModel = UsuarioModel;
