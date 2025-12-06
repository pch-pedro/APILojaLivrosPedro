import { LivroModel } from "../model/LivroModel";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService{
    private livroRepository = LivroRepository.getInstance();

    async novoLivro(data: any): Promise<LivroModel>{
        const isbn = data.isbn;
        if(!isbn || !this.livroRepository.validacaoISBN(isbn)){
            throw new Error("É necessário 13 dígitos válidos de ISBN para cadastrar um livro!");
        }

        if(await this.livroRepository.validacaoLivroPorISBN(isbn)){
            throw new Error("Este livro já é cadastrado!");
        }

        // construir modelo
        const livro = new LivroModel(
            data.categoria_id,
            data.titulo,
            data.isbn,
            data.preco,
            data.estoque,
            data.sinopse,
            data.imageURL,
            data.autor,
            data.editora,
            data.data_publicacao ? new Date(data.data_publicacao) : new Date()
        );

        return await this.livroRepository.insereLivro(livro);
    }

    async filtrarLivro(data: any): Promise<LivroModel | null>{
        const id = data.id;
        const livro = await this.livroRepository.filtraLivroPorId(id);

        if(livro === null){
            throw new Error("Id não encontrado no sistema!");
        }

        return livro;
    }

    async removeLivro(id: number): Promise<LivroModel>{
        const livroRemovido = await this.livroRepository.removeLivroPorId(id);
        if(!livroRemovido){
            throw new Error("Livro não encontrado para remoção!");
        }
        return livroRemovido;
    }

    async listarLivros(): Promise<LivroModel[]>{
        return await this.livroRepository.listarLivros();
    }

    async atualizaLivro(data: any): Promise<LivroModel | null>{
        const id = data.id;
        const novosDados = data.novosDados;

        return await this.livroRepository.atualizarLivroPorId(id, novosDados);
    }
}

export default new LivroService();