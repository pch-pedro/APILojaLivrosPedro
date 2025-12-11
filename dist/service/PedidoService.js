"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoService = void 0;
const PedidoResponseDto_1 = require("../model/dto/PedidoResponseDto");
const PedidoStatus_1 = require("../enums/PedidoStatus");
const errors_1 = require("../utils/errors");
const FormaPagamento_1 = require("../enums/FormaPagamento");
class PedidoService {
    pedidoRepository;
    usuarioRepository;
    enderecoRepository;
    livroRepository;
    constructor(pedidoRepository, usuarioRepository, enderecoRepository, livroRepository) {
        this.pedidoRepository = pedidoRepository;
        this.usuarioRepository = usuarioRepository;
        this.enderecoRepository = enderecoRepository;
        this.livroRepository = livroRepository;
    }
    mapToDto(pedidoModel) {
        const itensDto = (pedidoModel.itens || []).map(itemModel => new PedidoResponseDto_1.ItemPedidoResponseDto(itemModel));
        return new PedidoResponseDto_1.PedidoResponseDto(pedidoModel, itensDto);
    }
    validarRequest(data) {
        if (!data || typeof data !== 'object') {
            throw new errors_1.ValidationError('Dados do pedido são obrigatórios e devem ser um objeto válido.');
        }
        const { usuario_id, endereco_entrega_id, forma_pagamento, itens } = data;
        if (!usuario_id || !endereco_entrega_id || !forma_pagamento || !itens || itens.length === 0) {
            throw new errors_1.ValidationError('Todos os campos (usuario_id, endereco_entrega_id, forma_pagamento) e a lista de itens são obrigatórios.');
        }
        if (itens.some(item => item.quantidade <= 0)) {
            throw new errors_1.ValidationError('A quantidade de cada item no pedido deve ser um número positivo.');
        }
        const formasValidas = Object.values(FormaPagamento_1.FormaPagamento);
        if (!formasValidas.includes(forma_pagamento)) {
            throw new errors_1.ValidationError(`Forma de pagamento inválida. Opções: ${formasValidas.join(', ')}.`);
        }
    }
    async criarPedido(data) {
        this.validarRequest(data);
        const usuarioExists = await this.usuarioRepository.buscarUsuarioPorId(data.usuario_id);
        if (!usuarioExists) {
            throw new errors_1.NotFoundError(`Usuário com ID ${data.usuario_id} não encontrado.`);
        }
        const enderecoExists = await this.enderecoRepository.buscarPorId(data.endereco_entrega_id);
        if (!enderecoExists) {
            throw new errors_1.NotFoundError(`Endereço com ID ${data.endereco_entrega_id} não encontrado.`);
        }
        if (enderecoExists.usuario_id !== data.usuario_id) {
            throw new errors_1.ConflictError('O endereço de entrega não pertence ao usuário especificado.');
        }
        const livroIds = data.itens.map(item => item.livro_id);
        const livrosNoEstoque = await this.livroRepository.filtrarLivrosPorIds(livroIds);
        let valorTotal = 0;
        const itensParaInserir = [];
        for (const itemRequest of data.itens) {
            const livro = livrosNoEstoque.find(l => l.id === itemRequest.livro_id);
            if (!livro) {
                throw new errors_1.NotFoundError(`Livro com ID ${itemRequest.livro_id} não encontrado no catálogo.`);
            }
            if (livro.estoque < itemRequest.quantidade) {
                throw new errors_1.ConflictError(`Estoque insuficiente para o livro ${livro.titulo}. Estoque: ${livro.estoque}, Pedido: ${itemRequest.quantidade}.`);
            }
            const precoUnitario = livro.preco;
            valorTotal += precoUnitario * itemRequest.quantidade;
            itensParaInserir.push({
                livro_id: livro.id,
                quantidade: itemRequest.quantidade,
                preco_unitario_pago: precoUnitario,
            });
        }
        const pedidoHeaderData = {
            usuario_id: data.usuario_id,
            endereco_entrega_id: data.endereco_entrega_id,
            data_pedido: new Date(),
            valor_total: valorTotal,
            status_pedido: PedidoStatus_1.PedidoStatus.PENDENTE,
            forma_pagamento: data.forma_pagamento,
        };
        for (const item of data.itens) {
            await this.livroRepository.atualizarEstoque(item.livro_id, -item.quantidade);
        }
        const createdEntity = await this.pedidoRepository.inserirPedido(pedidoHeaderData, itensParaInserir);
        const fullPedido = await this.pedidoRepository.buscarPorId(createdEntity.id);
        if (!fullPedido) {
            throw new Error("Falha de integridade: Pedido inserido não pôde ser recuperado.");
        }
        return this.mapToDto(fullPedido);
    }
    async buscarPedidoPorId(id) {
        if (!id || id <= 0)
            throw new errors_1.ValidationError('ID de pedido inválido.');
        const entity = await this.pedidoRepository.buscarPorId(id);
        if (!entity) {
            throw new errors_1.NotFoundError(`Pedido com ID ${id} não encontrado.`);
        }
        return this.mapToDto(entity);
    }
    async listarPedidosPorUsuario(usuarioId) {
        if (!usuarioId || usuarioId <= 0) {
            throw new errors_1.ValidationError('ID de Usuário inválido.');
        }
        const usuarioExists = await this.usuarioRepository.buscarUsuarioPorId(usuarioId);
        if (!usuarioExists) {
            throw new errors_1.NotFoundError(`Usuário com ID ${usuarioId} não encontrado.`);
        }
        const entities = await this.pedidoRepository.buscarPorUsuario(usuarioId);
        return entities.map(pedidoModel => {
            return this.mapToDto(pedidoModel);
        });
    }
    async atualizarPedidoStatus(id, status) {
        if (!id || id <= 0)
            throw new errors_1.ValidationError('ID de pedido inválido.');
        if (!Object.values(PedidoStatus_1.PedidoStatus).includes(status))
            throw new errors_1.ValidationError('Status de pedido inválido.');
        const success = await this.pedidoRepository.updateStatus(id, status);
        if (!success) {
            throw new errors_1.NotFoundError(`Pedido com ID ${id} não encontrado para atualização de status.`);
        }
        return this.buscarPedidoPorId(id);
    }
}
exports.PedidoService = PedidoService;
