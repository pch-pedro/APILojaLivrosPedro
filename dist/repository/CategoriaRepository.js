"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaRepository = void 0;
const mysql_1 = require("../database/mysql");
const CategoriaModel_1 = require("../model/entity/CategoriaModel");
class CategoriaRepository {
    static instance;
    constructor() {
        this.criarTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaRepository();
        }
        return this.instance;
    }
    async criarTable() {
        const query = `CREATE TABLE IF NOT EXISTS Categoria(
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL
                )ENGINE=InnoDB`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela de Categoria criada com Sucesso!', resultado);
        }
        catch (err) {
            console.error('Erro ao executar a query de Categoria: ', err);
        }
    }
    async insereCategoria(categoria) {
        //Validação Adicionada: Verificando se já há uma categoria com o mesmo nome no sistema
        const resultadoExistente = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Categoria WHERE LOWER(nome) = LOWER(?)", [categoria.nome.trim()]);
        if (resultadoExistente && resultadoExistente.length > 0) {
            throw new Error("Categoria com este nome já existe!");
        }
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO Categoria (nome) values (?)", [
            categoria.nome.trim()
        ]);
        console.log("Categoria criada com Sucesso: ", resultado);
        return new CategoriaModel_1.CategoriaModel(categoria.nome, resultado.insertId);
    }
    async listarCategoria() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Categoria ORDER BY nome ASC", []);
        const categoria = [];
        if (resultado && resultado.length > 0) {
            for (let i = 0; i < resultado.length; i++) {
                const user = resultado[i];
                categoria.push(new CategoriaModel_1.CategoriaModel(user.id, user.nome));
            }
        }
        return categoria;
    }
    async listarCategoriaPorId(id) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Categoria WHERE id = ?", [id]);
        if (resultado && resultado.length > 0) {
            const user = resultado[0];
            return new CategoriaModel_1.CategoriaModel(user.id, user.nome);
        }
        return null;
    }
    async atualizarCategoriaPorId(id, novosDados) {
        const campos = [];
        const valores = [];
        if (novosDados.nome) {
            const existente = await (0, mysql_1.executarComandoSQL)("SELECT * FROM Categoria WHERE LOWER(nome) = LOWER(?) AND id <> ?", [novosDados.nome.trim(), id]);
            if (existente && existente.length > 0) {
                throw new Error("Ja existe uma categoria com este nome");
            }
            campos.push("nome = ?");
            valores.push(novosDados.nome.trim());
        }
        if (campos.length === 0) {
            throw new Error("Nenhum campo para atualizar");
        }
        const sql = `UPDATE Categoria SET ${campos.join(", ")} WHERE id = ?`;
        valores.push(id);
        const resultado = await (0, mysql_1.executarComandoSQL)(sql, valores);
        console.log(resultado);
        return await this.listarCategoriaPorId(id);
    }
    async removeCategoriaPorId(id) {
        const categoria = await this.listarCategoriaPorId(id);
        if (!categoria) {
            return null;
        }
        await (0, mysql_1.executarComandoSQL)("DELETE FROM Categoria where id = ?", [id]);
        return categoria;
    }
}
exports.CategoriaRepository = CategoriaRepository;
