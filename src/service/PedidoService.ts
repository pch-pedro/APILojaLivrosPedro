import { ItemPedidoModel } from '../model/entity/ItemPedidoModel';
import { PedidoModel } from '../model/entity/PedidoModel';
import { PedidoRepository } from '../repository/PedidoRepository';
import { PedidoRequestDto} from '../model/dto/PedidoRequestDto';
import { PedidoResponseDto, ItemPedidoResponseDto } from '../model/dto/PedidoResponseDto';
import { UsuarioRepository } from '../repository/UsuarioRepository';
import { EnderecoRepository } from '../repository/EnderecoRepository';
import { LivroRepository } from '../repository/LivroRepository';
import { PedidoStatus } from '../enums/PedidoStatus';
import { NotFoundError, ValidationError, ConflictError } from '../utils/errors'; 
import { FormaPagamento } from '../enums/FormaPagamento';


type PedidoCreateData = Omit<PedidoModel, 'id' | 'itens'>; 
type ItemPedidoCreateData = Omit<ItemPedidoModel, 'id'>; 

export class PedidoService {
    private readonly pedidoRepository: PedidoRepository;
    private readonly usuarioRepository: UsuarioRepository;
    private readonly enderecoRepository: EnderecoRepository;
    private readonly livroRepository: LivroRepository;

    constructor(
        pedidoRepository = PedidoRepository.getInstance(),
        usuarioRepository = UsuarioRepository.getInstance(),
        enderecoRepository = EnderecoRepository.getInstance(),
        livroRepository = LivroRepository.getInstance()
    ) {
        this.pedidoRepository = pedidoRepository as any; 
        this.usuarioRepository = usuarioRepository as any;
        this.enderecoRepository = enderecoRepository as any;
        this.livroRepository = livroRepository as any;
    }


    private mapToDto(pedidoModel: PedidoModel): PedidoResponseDto {
        const itensDto: ItemPedidoResponseDto[] = (pedidoModel.itens || []).map(itemModel => 
             new ItemPedidoResponseDto(itemModel)
        );
        return new PedidoResponseDto(pedidoModel, itensDto);
    }

    private validarRequest(data: PedidoRequestDto): void {
        const { usuario_id, endereco_entrega_id, forma_pagamento, itens } = data;

        if (!usuario_id || !endereco_entrega_id || !forma_pagamento || !itens || itens.length === 0) {
            throw new ValidationError('Todos os campos (usuario_id, endereco_entrega_id, forma_pagamento) e a lista de itens são obrigatórios.');
        }

        if (itens.some(item => item.quantidade <= 0)) {
            throw new ValidationError('A quantidade de cada item no pedido deve ser um número positivo.');
        }

        const formasValidas = Object.values(FormaPagamento);
        if (!formasValidas.includes(forma_pagamento)) {
            throw new ValidationError(`Forma de pagamento inválida. Opções: ${formasValidas.join(', ')}.`);
        }
    }
    
    async criarPedido(data: PedidoRequestDto): Promise<PedidoResponseDto> {
        this.validarRequest(data);
        
        const usuarioExists = await this.usuarioRepository.buscarUsuarioPorId(data.usuario_id);
        if (!usuarioExists) {
            throw new NotFoundError(`Usuário com ID ${data.usuario_id} não encontrado.`);
        }
        
        const enderecoExists = await this.enderecoRepository.buscarPorId(data.endereco_entrega_id);
        if (!enderecoExists) {
            throw new NotFoundError(`Endereço com ID ${data.endereco_entrega_id} não encontrado.`);
        }
        if (enderecoExists.usuario_id !== data.usuario_id) {
            throw new ConflictError('O endereço de entrega não pertence ao usuário especificado.');
        }
        
        const livroIds = data.itens.map(item => item.livro_id);
        const livrosNoEstoque = await this.livroRepository.validacaoLivroPorId(livroIds); 

        let valorTotal = 0;
        const itensParaInserir: ItemPedidoCreateData[] = [];

        for (const itemRequest of data.itens) {
            const livro = livrosNoEstoque.find(l => l.id === itemRequest.livro_id);
            
            if (!livro) { throw new NotFoundError(`Livro com ID ${itemRequest.livro_id} não encontrado no catálogo.`); }
            if (livro.estoque < itemRequest.quantidade) {
                throw new ConflictError(`Estoque insuficiente para o livro ${livro.titulo}. Estoque: ${livro.estoque}, Pedido: ${itemRequest.quantidade}.`);
            }

            const precoUnitario = livro.preco; 
            valorTotal += precoUnitario * itemRequest.quantidade;

            itensParaInserir.push({
                pedido_id: 0, 
                livro_id: livro.id as number,
                quantidade: itemRequest.quantidade,
                preco_unitario_pago: precoUnitario,
            });
        }
        
        const pedidoHeaderData: PedidoCreateData = {
            usuario_id: data.usuario_id,
            endereco_entrega_id: data.endereco_entrega_id,
            data_pedido: new Date(),
            valor_total: valorTotal,
            status_pedido: PedidoStatus.PENDENTE, 
            forma_pagamento: data.forma_pagamento, 
        };
        
        for (const item of data.itens) {
            await this.livroRepository.atualizarEstoque(item.livro_id, -item.quantidade);
        }

        const createdEntity = await this.pedidoRepository.inserirPedido(pedidoHeaderData, itensParaInserir);
        
        const fullPedido = await this.pedidoRepository.buscarPorId(createdEntity.id as number);

        if (!fullPedido) {
            throw new Error("Falha de integridade: Pedido inserido não pôde ser recuperado.");
        }

        return this.mapToDto(fullPedido);
    }

    async buscarPedidoPorId(id: number): Promise<PedidoResponseDto> {
        if (!id || id <= 0) throw new ValidationError('ID de pedido inválido.');
        const entity = await this.pedidoRepository.buscarPorId(id); 

        if (!entity) {
            throw new NotFoundError(`Pedido com ID ${id} não encontrado.`);
        }

        return this.mapToDto(entity);
    }
    
    async listarPedidosPorUsuario(usuarioId: number): Promise<PedidoResponseDto[]> {
        if (!usuarioId || usuarioId <= 0) {
            throw new ValidationError('ID de Usuário inválido.');
        }
        
        const usuarioExists = await this.usuarioRepository.buscarUsuarioPorId(usuarioId);
        if (!usuarioExists) {
            throw new NotFoundError(`Usuário com ID ${usuarioId} não encontrado.`);
        }
        
        const entities = await this.pedidoRepository.buscarPorUsuario(usuarioId); 

        return entities.map(pedidoModel => {
            return this.mapToDto(pedidoModel); 
        });
    }

    async atualizarPedidoStatus(id: number, status: PedidoStatus): Promise<PedidoResponseDto> {
        if (!id || id <= 0) throw new ValidationError('ID de pedido inválido.');
        if (!Object.values(PedidoStatus).includes(status)) throw new ValidationError('Status de pedido inválido.');

        const success = await this.pedidoRepository.updateStatus(id, status);

        if (!success) {
            throw new NotFoundError(`Pedido com ID ${id} não encontrado para atualização de status.`);
        }
        
        return this.buscarPedidoPorId(id);
    }
}