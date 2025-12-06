import { LivroModel } from "../model/LivroModel";

export class LivroView {
    static formatarLivro(livro: LivroModel): object {
        return {
            id: livro.getId(),
            categoria_id: livro.getCategoriaId(),
            titulo: livro.getTitulo(),
            isbn: livro.getIsbn(),
            preco: livro.getPreco(),
            estoque: livro.getEstoque(),
            sinopse: livro.getSinopse(),
            imageURL: livro.getImageURL(),
            autor: livro.getAutor(),
            editora: livro.getEditora(),
            data_publicacao: livro.getDataPublicacao(),
            promocao: livro.getPromocao()
        };
    }

    static formatarListaLivros(livros: LivroModel[]): object {
        return {
            total: livros.length,
            livros: livros.map(livro => this.formatarLivro(livro))
        };
    }

    static formatarErro(mensagem: string, statusCode: number = 400): object {
        return {
            error: true,
            statusCode,
            message: mensagem,
            timestamp: new Date().toISOString()
        };
    }

    static formatarSucesso(dados: any, mensagem: string = "Operação realizada com sucesso", statusCode: number = 200): object {
        return {
            success: true,
            statusCode,
            message: mensagem,
            data: dados,
            timestamp: new Date().toISOString()
        };
    }
}
