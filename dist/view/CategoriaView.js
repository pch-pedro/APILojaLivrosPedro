"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaView = void 0;
class CategoriaView {
    static formatarCategoria(categoria) {
        return {
            id: categoria.getId(),
            nome: categoria.getNome()
        };
    }
    static formatarListaCategoria(categorias) {
        const categoriasFormatadas = [];
        for (let i = 0; i < categorias.length; i++) {
            categoriasFormatadas.push(this.formatarCategoria(categorias[i]));
        }
        return {
            total: categorias.length,
            categorias: categoriasFormatadas
        };
    }
    static formatarErro(mensagem, statusCode = 400) {
        return {
            error: true,
            statusCode,
            message: mensagem,
            timestamp: new Date().toISOString()
        };
    }
    static formatarSucesso(dados, mensagem = "Operação realizada com sucesso", statusCode = 200) {
        return {
            success: true,
            statusCode,
            message: mensagem,
            data: dados,
            timestamp: new Date().toISOString()
        };
    }
}
exports.CategoriaView = CategoriaView;
