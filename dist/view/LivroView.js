"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroView = void 0;
class LivroView {
    static formatarLivro(livro) {
        return {
            id: livro.id,
            categoria_id: livro.categoria_id,
            titulo: livro.titulo,
            autor: livro.autor,
            isbn: livro.isbn,
            preco: livro.preco,
            estoque: livro.estoque,
            sinopse: livro.sinopse,
            imageURL: livro.imageURL,
            editora: livro.editora,
            data_publicacao: livro.data_publicacao?.toISOString(),
            promocao: livro.promocao
        };
    }
    static formatarListaLivros(livros) {
        return {
            total: livros.length,
            livros: livros.map(livro => this.formatarLivro(livro))
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
exports.LivroView = LivroView;
