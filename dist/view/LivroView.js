"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroView = void 0;
class LivroView {
    static formatarLivro(livro) {
        return {
            id: livro.getId(),
            categoria_id: livro.getCategoriaId(),
            titulo: livro.getTitulo(),
            autor: livro.getAutor(),
            isbn: livro.getIsbn(),
            preco: livro.getPreco(),
            estoque: livro.getEstoque(),
            sinopse: livro.getSinopse(),
            imageURL: livro.getImageURL(),
            editora: livro.getEditora(),
            data_publicacao: livro.getDataPublicacao(),
            promocao: livro.getPromocao()
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
