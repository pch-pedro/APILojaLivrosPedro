"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnderecoRepository = void 0;
const EnderecoModel_1 = require("../model/entity/EnderecoModel");
// Ajuste este caminho se necessário
const mysql_1 = require("../database/mysql");
class EnderecoRepository {
    static instance;
    constructor() { }
    static async getInstance() {
        if (!EnderecoRepository.instance) {
            EnderecoRepository.instance = new EnderecoRepository();
            await EnderecoRepository.instance.createTable();
        }
        return EnderecoRepository.instance;
    }
    mapToModel(row) {
        return new EnderecoModel_1.EnderecoModel(row.usuario_id, row.cep, row.rua, row.numero, row.complemento, row.cidade, row.estado, row.id);
    }
    async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS Endereco (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                cep VARCHAR(10) NOT NULL,
                rua VARCHAR(100) NOT NULL,
                numero VARCHAR(10) NOT NULL,
                complemento VARCHAR(50),
                cidade VARCHAR(100) NOT NULL,
                estado VARCHAR(50) NOT NULL,
                FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE
            )`;
        await (0, mysql_1.executarComandoSQL)(query, []);
    }
    async inserirEndereco(data) {
        const query = `
            INSERT INTO Endereco 
            (usuario_id, cep, rua, numero, complemento, cidade, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.usuario_id,
            data.cep,
            data.rua,
            data.numero,
            data.complemento || null,
            data.cidade,
            data.estado,
        ];
        const resultado = await (0, mysql_1.executarComandoSQL)(query, values);
        return new EnderecoModel_1.EnderecoModel(data.usuario_id, data.cep, data.rua, data.numero, data.complemento, data.cidade, data.estado, resultado.insertId);
    }
    async buscarPorId(id) {
        const query = `
            SELECT id, usuario_id, cep, rua, numero, complemento, cidade, estado 
            FROM Endereco 
            WHERE id = ?
        `;
        let result;
        try {
            result = await (0, mysql_1.executarComandoSQL)(query, [id]);
            console.log("Resultado bruto do SQL (buscarPorId):", result);
        }
        catch (err) {
            console.error("Erro ao executar query de endereço por ID:", err);
            throw err;
        }
        let rows = [];
        if (Array.isArray(result) && result.length > 0 && Array.isArray(result[0])) {
            rows = result[0];
        }
        else if (Array.isArray(result)) {
            rows = result;
        }
        if (rows.length === 0) {
            return undefined;
        }
        return this.mapToModel(rows[0]);
    }
    async buscarUsuarioPorId(usuarioId) {
        const query = `
            SELECT id, usuario_id, cep, rua, numero, complemento, cidade, estado 
            FROM Endereco 
            WHERE usuario_id = ?
        `;
        let result;
        try {
            result = await (0, mysql_1.executarComandoSQL)(query, [usuarioId]);
            console.log("Resultado bruto do SQL (endereços):", result);
        }
        catch (err) {
            console.error("Erro ao executar query de endereços:", err);
            throw err;
        }
        let rows = [];
        if (Array.isArray(result) && result.length > 0 && Array.isArray(result[0])) {
            rows = result[0];
        }
        else if (Array.isArray(result)) {
            rows = result;
        }
        return rows.map(row => this.mapToModel(row));
    }
    async atualizarDadosEndereco(id, data) {
        const fields = [];
        const values = [];
        if (data.cep !== undefined) {
            fields.push('cep = ?');
            values.push(data.cep);
        }
        if (data.rua !== undefined) {
            fields.push('rua = ?');
            values.push(data.rua);
        }
        if (data.numero !== undefined) {
            fields.push('numero = ?');
            values.push(data.numero);
        }
        if (data.complemento !== undefined) {
            fields.push('complemento = ?');
            values.push(data.complemento || null);
        }
        if (data.cidade !== undefined) {
            fields.push('cidade = ?');
            values.push(data.cidade);
        }
        if (data.estado !== undefined) {
            fields.push('estado = ?');
            values.push(data.estado);
        }
        if (fields.length === 0) {
            return this.buscarPorId(id);
        }
        values.push(id);
        const query = `UPDATE Endereco SET ${fields.join(', ')} WHERE id = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, values);
        return resultado.affectedRows > 0 ? this.buscarPorId(id) : undefined;
    }
    async removerEndereco(id) {
        const query = 'DELETE FROM Endereco WHERE id = ?';
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        return resultado.affectedRows > 0;
    }
}
exports.EnderecoRepository = EnderecoRepository;
