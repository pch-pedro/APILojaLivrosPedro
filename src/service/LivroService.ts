import { LivroModel } from "../model/entity/LivroModel";
import { LivroRepository } from "../repository/LivroRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { NotFoundError, ConflictError, ValidationError } from '../utils/errors'; 
import { CategoriaRepository } from "../repository/CategoriaRepository";
import { LivroUpdateDto } from "../model/dto/LivroUpdateDto";
import { LivroRequestDto } from "../model/dto/LivroRequestDto";

export class LivroService {
    private readonly livroRepository: Promise<LivroRepository>; 
    private readonly usuarioRepository: Promise<UsuarioRepository>;
    private readonly categoriaRepository: CategoriaRepository;

    constructor(
        livroRepository: Promise<LivroRepository> = LivroRepository.getInstance(),
        usuarioRepository: Promise<UsuarioRepository> = UsuarioRepository.getInstance(),
        categoriaRepository: CategoriaRepository = CategoriaRepository.getInstance()
    ) {
        this.livroRepository = livroRepository; 
        this.usuarioRepository = usuarioRepository; 
        this.categoriaRepository = categoriaRepository;
    }


    private async getLivroRepository(): Promise<LivroRepository> {
        return await this.livroRepository;
    }

    async novoLivro(data: LivroRequestDto): Promise<LivroModel>{

        const categoriaValida = await this.categoriaRepository.listarCategoriaPorId(data.categoria_id);

        if(categoriaValida === null){
            throw new Error("A categoria informada nao existe no sistema");
        }

        const repo = await this.getLivroRepository();
        const isbn = data.isbn;

        if(!isbn || !repo.validacaoISBN(isbn)){
            throw new ValidationError("É necessário 13 dígitos válidos de ISBN para cadastrar um livro!");
        }

        if(await repo.validacaoLivroPorISBN(isbn)){
            throw new ConflictError("Este livro já é cadastrado!");
        }

        const livro = new LivroModel(
            data.categoria_id,
            data.titulo,
            data.autor,            
            data.isbn,
            data.preco,
            data.estoque,
            data.sinopse,
            data.imageURL,
            data.editora,
            data.data_publicacao ? new Date(data.data_publicacao) : new Date(),
            data.promocao
        );

        return await repo.insereLivro(livro);
    }

    async filtrarLivro(data: { id: number }): Promise<LivroModel>{
        const repo = await this.getLivroRepository();
        const id = data.id;
        
        const livro = await repo.filtraLivroPorId(id);

        if(livro === null){
            throw new NotFoundError("Id não encontrado no sistema!");
        }

        return livro;
    }

    async filtrarLivroPorISBN(isbn: string): Promise<LivroModel | null> {
        const repo = await this.getLivroRepository();
        const livro = await repo.filtraLivroPorISBN(isbn); 
        if (!livro) {
            throw new NotFoundError('ISBN não encontrado no sistema!');
        }
        return livro;
    }

    async filtrarLivroISBN(data: { isbn: string }): Promise<LivroModel>{
        const repo = await this.getLivroRepository();
        const isbn = data.isbn;

        if(repo.validacaoISBN(isbn) === false){
            throw new ValidationError("O ISBN informado é inválido. É necessário 13 caracteres");
        }

        const livro = await repo.filtraLivroPorISBN(isbn);

        if(livro === null){
            throw new NotFoundError("Livro com o ISBN:" + isbn + " não encontrado no sistema");
        }

        return livro;
    }

    async removeLivro(id: number): Promise<LivroModel>{
        const repo = await this.getLivroRepository();
        const livroRemovido = await repo.removeLivroPorId(id); 
        
        if(!livroRemovido){
            throw new NotFoundError("Livro não encontrado para remoção!");
        }
        return livroRemovido;
    }

    async listarLivros(): Promise<LivroModel[]>{
        const repo = await this.getLivroRepository();
        return await repo.listarLivros();
    }

    async atualizaLivro(data: { id: number, novosDados: LivroUpdateDto }): Promise<LivroModel | null>{
        const repo = await this.getLivroRepository();
        const id = data.id;
        const novosDados = data.novosDados;

        const livroValido = await repo.filtraLivroPorId(id);
        if(livroValido === null){
            throw new Error("Livro nao encontrado para atualizacao");
        }

        if(novosDados.categoria_id !== undefined){
            const categoriaValida = await this.categoriaRepository.listarCategoriaPorId(novosDados.categoria_id);

            if(categoriaValida === null){
                throw new Error("A categoria informada nao existe no sistema");
            }
        }

        if(novosDados.isbn !== undefined){
            if(novosDados.isbn && repo.validacaoISBN(novosDados.isbn) === false){
                throw new ValidationError("ISBN inválido. Precisa ter 13 dígitos");
            }

            const livroISBNIgual = await repo.filtraLivroPorISBN(novosDados.isbn);

            if(livroISBNIgual && livroISBNIgual.id !== id){
                throw new Error("Este ISBN informado ja está cadastrado em um outro livro")
            }
        }

        if(novosDados.data_publicacao){
            novosDados.data_publicacao = new Date(novosDados.data_publicacao);
        }
        return await repo.atualizarLivroPorId(id, novosDados);
    }
}