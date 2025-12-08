"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaService = void 0;
const CategoriaModel_1 = require("../model/entity/CategoriaModel");
const CategoriaRepository_1 = require("../repository/CategoriaRepository");
class CategoriaService {
    categoriaRepository = CategoriaRepository_1.CategoriaRepository.getInstance();
    async novaCategoria(data) {
        // construir modelo
        const categoria = new CategoriaModel_1.CategoriaModel(data.nome, data.id);
        return await this.categoriaRepository.insereCategoria(categoria);
    }
    async listarCategoria() {
        const categoria = await this.categoriaRepository.listarCategoria();
        if (categoria.length === 0) {
            throw new Error("Nenhuma categoria encontrada no sistema");
        }
        return categoria;
    }
    async listarCategoriaPorId(id) {
        const categoria = await this.categoriaRepository.listarCategoriaPorId(id);
        if (categoria === null) {
            throw new Error("Categoria nao encontrado no sistema!");
        }
        return categoria;
    }
    async atualizaCategoria(id, novosDados) {
        const categoriaAtualizada = await this.categoriaRepository.atualizarCategoriaPorId(id, novosDados);
        if (categoriaAtualizada === null) {
            throw new Error("Erro ao atualizar categoria");
        }
        return categoriaAtualizada;
    }
    async removeCategoria(id) {
        const categoriaRemovida = await this.categoriaRepository.removeCategoriaPorId(id);
        if (!categoriaRemovida) {
            throw new Error("Categoria nao encontrado para remocao!");
        }
        return categoriaRemovida;
    }
}
exports.CategoriaService = CategoriaService;
exports.default = new CategoriaService();
