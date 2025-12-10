import { CarrinhoRepository } from '../repository/CarrinhoRepository';
import { LivroRepository } from '../repository/LivroRepository'; 
import { UsuarioRepository } from '../repository/UsuarioRepository'; 
import { CarrinhoRequestDto } from '../model/dto/CarrinhoRequestDto';
import { CarrinhoModel } from '../model/entity/CarrinhoModel';
import { CarrinhoResponseDto } from '../model/dto/CarrinhoResponseDto';
import { NotFoundError, ValidationError, ConflictError } from '../utils/errors'; 

type CarrinhoCreateOrUpdateData = Omit<CarrinhoModel, 'id' | 'data_adicao'>;

export class CarrinhoService {
    
    private readonly carrinhoRepository: Promise<CarrinhoRepository>;
    private readonly livroRepository: Promise<LivroRepository>;
    private readonly usuarioRepository: Promise<UsuarioRepository>;

    constructor(
        carrinhoRepository: Promise<CarrinhoRepository> = CarrinhoRepository.getInstance(),
        livroRepository: Promise<LivroRepository> = LivroRepository.getInstance(),
        usuarioRepository: Promise<UsuarioRepository> = UsuarioRepository.getInstance()
    ) {
        this.carrinhoRepository = carrinhoRepository; 
        this.livroRepository = livroRepository;
        this.usuarioRepository = usuarioRepository;
    }

    private async getCarrinhoRepository(): Promise<CarrinhoRepository> { return await this.carrinhoRepository; }
    private async getLivroRepository(): Promise<LivroRepository> { return await this.livroRepository; }
    private async getUsuarioRepository(): Promise<UsuarioRepository> { return await this.usuarioRepository; }


    private mapToDto(model: CarrinhoModel): CarrinhoResponseDto {
        return new CarrinhoResponseDto(model);
    }

    private validarRequest(data: CarrinhoRequestDto): void {
        const { usuario_id, livro_id, quantidade } = data;

        if (!usuario_id || !livro_id) {
            throw new ValidationError('ID do usuário e ID do livro são obrigatórios.');
        }
        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            // Regra: Não se pode adicionar quantidade negativa ou zero.
            throw new ValidationError('A quantidade a ser adicionada deve ser um número inteiro positivo.');
        }
    }
    
    async addItem(data: CarrinhoRequestDto): Promise<CarrinhoResponseDto> {
        this.validarRequest(data);
        
        const [carrinhoRepo, livroRepo, usuarioRepo] = await Promise.all([
            this.getCarrinhoRepository(),
            this.getLivroRepository(),
            this.getUsuarioRepository(),
        ]);
        
        const usuarioExists = await usuarioRepo.buscarUsuarioPorId(data.usuario_id);
        if (!usuarioExists) {
            throw new NotFoundError(`Usuário com ID ${data.usuario_id} não encontrado.`);
        }

        const livro = await livroRepo.filtraLivroPorId(data.livro_id);
        if (!livro) {
            throw new NotFoundError(`Livro com ID ${data.livro_id} não encontrado.`);
        }

        const itemAtual = await carrinhoRepo.buscarItens(data.usuario_id, data.livro_id);
        const quantidadeAtual = itemAtual ? itemAtual.quantidade : 0;
        
        if (quantidadeAtual + data.quantidade > livro.estoque) {
            throw new ConflictError(`Estoque insuficiente. Máximo que pode ser adicionado: ${livro.estoque - quantidadeAtual} unidades.`);
        }

        const createdEntity = await carrinhoRepo.inserirItem(data as CarrinhoCreateOrUpdateData);

        return this.mapToDto(createdEntity);
    }
    
    async getCarrinho(usuarioId: number): Promise<CarrinhoResponseDto[]> {
        if (!usuarioId || usuarioId <= 0) {
             throw new ValidationError('ID de Usuário inválido.');
        }

        const [carrinhoRepo, usuarioRepo] = await Promise.all([
            this.getCarrinhoRepository(),
            this.getUsuarioRepository(),
        ]);

        const usuarioExists = await usuarioRepo.buscarUsuarioPorId(usuarioId);
        if (!usuarioExists) {
            throw new NotFoundError(`Usuário com ID ${usuarioId} não encontrado.`);
        }

        const entities = await carrinhoRepo.buscarCarrinhoPorUsuId(usuarioId);
        
        return entities.map(this.mapToDto);
    }

    async updateItemQuantity(usuarioId: number, livroId: number, quantidade: number): Promise<CarrinhoResponseDto | undefined> {
        
        if (quantidade <= 0) {
            const removed = await this.removeItem(usuarioId, livroId);
            if (!removed) {
                throw new NotFoundError("Item não encontrado para remoção.");
            }
            return undefined;
        }
        
        const livroRepo = await this.getLivroRepository();
        const livro = await livroRepo.filtraLivroPorId(livroId);

        if (!livro) {
            throw new NotFoundError(`Livro com ID ${livroId} não encontrado.`);
        }
        if (quantidade > livro.estoque) {
            throw new ConflictError(`Não é possível definir a quantidade para ${quantidade}. Estoque máximo: ${livro.estoque}.`);
        }
        
        const carrinhoRepo = await this.getCarrinhoRepository();
        
        const updatedEntity = await carrinhoRepo.aplicarQuantidade(usuarioId, livroId, quantidade);
        
        if (!updatedEntity) {
            throw new NotFoundError(`Item não encontrado para atualização.`);
        }
        
        return this.mapToDto(updatedEntity);
    }

    async removeItem(usuarioId: number, livroId: number): Promise<boolean> {
        const carrinhoRepo = await this.getCarrinhoRepository();
        
        return await carrinhoRepo.removerItem(usuarioId, livroId);
    }

    async clearCarrinho(usuarioId: number): Promise<boolean> {
        const carrinhoRepo = await this.getCarrinhoRepository();
        
        return await carrinhoRepo.limparCarrinho(usuarioId);
    }
}