"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const UsuarioModel_1 = require("../model/entity/UsuarioModel");
const mysql_1 = require("../database/mysql");
class UsuarioRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS Usuario (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                senha_hash VARCHAR(255) NOT NULL,
                telefone VARCHAR(20) NOT NULL,
                tipo_usuario ENUM('CLIENTE', 'ADMIN') NOT NULL
            )`;
        try {
            await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela Usuario criada com sucesso.");
        }
        catch (err) {
            console.error("Erro ao criar tabela Usuário:", err);
            throw err;
        }
    }
    async insertUsuario(nome, email, senha_hash, telefone, tipo_usuario) {
        const query = `
            INSERT INTO Usuario 
            (nome, email, senha_hash, telefone, tipo_usuario) 
            VALUES (?, ?, ?, ?, ?)
        `;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [nome, email, senha_hash, telefone, tipo_usuario]);
            const newUsuario = new UsuarioModel_1.UsuarioModel(nome, email, senha_hash, telefone, tipo_usuario);
            return newUsuario;
        }
        catch (err) {
            console.error("Erro ao inserir usuário no repositório:", err);
            throw err;
        }
    }
    async buscarUsuarioPorId(id) {
        const query = "SELECT id, nome, email, senha_hash, telefone, tipo_usuario FROM Usuario WHERE id = ?";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
            if (resultado.length > 0) {
                const row = resultado[0];
                return new UsuarioModel_1.UsuarioModel(row.nome, row.email, row.senha_hash, row.telefone, row.tipo_usuario);
            }
            return undefined;
        }
        catch (err) {
            console.error("Erro ao buscar usuário por ID no repositório:", err);
            throw err;
        }
    }
    async buscarUsuarioPorEmail(email) {
        const query = "SELECT id, nome, email, senha_hash, telefone, tipo_usuario FROM Usuario WHERE email = ?";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [email]);
            if (resultado.length > 0) {
                const row = resultado[0];
                return new UsuarioModel_1.UsuarioModel(row.nome, row.email, row.senha_hash, row.telefone, row.tipo_usuario);
            }
            return undefined;
        }
        catch (err) {
            console.error("Erro ao buscar usuário por email no repositório:", err);
            throw err;
        }
    }
    async listarUsuarios() {
        const query = "SELECT id, nome, email, senha_hash, telefone, tipo_usuario FROM Usuario";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            return resultado.map((row) => new UsuarioModel_1.UsuarioModel(row.nome, row.email, row.senha_hash, row.telefone, row.tipo_usuario));
        }
        catch (err) {
            console.error("Erro ao listar usuários no repositório:", err);
            throw err;
        }
    }
    async atualizarDadosUsuario(usuario) {
        const query = `
            UPDATE Usuario
            SET nome = ?, senha_hash = ?, telefone = ?, tipo_usuario = ?
            WHERE email = ?`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [
                usuario.nome,
                usuario.senha_hash,
                usuario.telefone,
                usuario.tipo_usuario,
                usuario.email,
            ]);
            if (resultado.affectedRows > 0) {
                return this.buscarUsuarioPorEmail(usuario.email);
            }
            return undefined;
        }
        catch (err) {
            console.error("Erro ao atualizar usuário no repositório:", err);
            throw err;
        }
    }
    async removerUsuario(email) {
        const query = "DELETE FROM Usuario WHERE email = ?";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [email]);
            return resultado.affectedRows > 0;
        }
        catch (err) {
            console.error("Erro ao remover usuário no repositório:", err);
            throw err;
        }
    }
}
exports.UsuarioRepository = UsuarioRepository;
