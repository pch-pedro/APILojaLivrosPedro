import { LivroModel } from "../model/entity/LivroModel";

export class LivroView {
    static formatarLivro(livro: LivroModel): object {
        return {
            id: livro.id,
            categoria_id: livro.categoria_id,
            titulo: livro.titulo,
            autor: livro.autor,            
            isbn: livro.isbn,
            preco: livro.preco,
            estoque: livro.estoque,
            sinopse: livro.sinopse,
            imageURL: livro.imageurl,
            editora: livro.editora,
            data_publicacao: livro.data_publicacao?.toISOString(),
            promocao: livro.promocao
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
