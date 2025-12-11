"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrinhoService = void 0;
const CarrinhoRepository_1 = require("../repository/CarrinhoRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CarrinhoResponseDto_1 = require("../model/dto/CarrinhoResponseDto");
const errors_1 = require("../utils/errors");
class CarrinhoService {
    carrinhoRepository;
    livroRepository;
    usuarioRepository;
    constructor(carrinhoRepository = CarrinhoRepository_1.CarrinhoRepository.getInstance(), livroRepository = LivroRepository_1.LivroRepository.getInstance(), usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance()) {
        this.carrinhoRepository = carrinhoRepository;
        this.livroRepository = livroRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async getCarrinhoRepository() { return await this.carrinhoRepository; }
    async getLivroRepository() { return await this.livroRepository; }
    async getUsuarioRepository() { return await this.usuarioRepository; }
    mapToDto(model) {
        return new CarrinhoResponseDto_1.CarrinhoResponseDto(model);
    }
    validarRequest(data) {
        const { usuario_id, livro_id, quantidade } = data;
        if (!usuario_id || !livro_id) {
            throw new errors_1.ValidationError('ID do usuário e ID do livro são obrigatórios.');
        }
        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            throw new errors_1.ValidationError('A quantidade a ser adicionada deve ser um número inteiro positivo.');
        }
    }
    async addItem(data) {
        try {
            this.validarRequest(data);
            const [carrinhoRepo, livroRepo, usuarioRepo] = await Promise.all([
                this.getCarrinhoRepository(),
                this.getLivroRepository(),
                this.getUsuarioRepository(),
            ]);
            const usuarioExists = await usuarioRepo.buscarUsuarioPorId(data.usuario_id);
            if (!usuarioExists) {
                throw new errors_1.NotFoundError(`Usuário com ID ${data.usuario_id} não encontrado.`);
            }
            const livro = await livroRepo.filtraLivroPorId(data.livro_id);
            if (!livro) {
                throw new errors_1.NotFoundError(`Livro com ID ${data.livro_id} não encontrado.`);
            }
            const itemAtual = await carrinhoRepo.buscarItens(data.usuario_id, data.livro_id);
            console.log("Item atual no carrinho:", itemAtual);
            const quantidadeAtual = itemAtual ? itemAtual.quantidade : 0;
            if (quantidadeAtual + data.quantidade > livro.estoque) {
                throw new errors_1.ConflictError(`Estoque insuficiente. Máximo que pode ser adicionado: ${livro.estoque - quantidadeAtual} unidades.`);
            }
            const createdEntity = await carrinhoRepo.inserirItem(data);
            console.log("Item inserido no carrinho:", createdEntity);
            return this.mapToDto(createdEntity);
        }
        catch (err) {
            console.error("Erro no CarrinhoService.addItem:", err);
            throw err;
        }
    }
    async getCarrinho(usuarioId) {
        console.log("Solicitação GET carrinho para usuário:", usuarioId);
        const [carrinhoRepo, usuarioRepo] = await Promise.all([
            this.getCarrinhoRepository(),
            this.getUsuarioRepository(),
        ]);
        const usuarioExists = await usuarioRepo.buscarUsuarioPorId(usuarioId);
        console.log("Usuário existe?", usuarioExists);
        if (!usuarioExists) {
            throw new errors_1.NotFoundError(`Usuário com ID ${usuarioId} não encontrado.`);
        }
        const entities = await carrinhoRepo.buscarCarrinhoPorUsuId(usuarioId);
        console.log("Carrinho bruto do repositório:", entities);
        if (!entities || entities.length === 0) {
            console.warn("Nenhum item encontrado para este usuário!");
            return [];
        }
        const dtos = entities.map(entity => this.mapToDto(entity));
        console.log("Carrinho mapeado para DTO:", dtos);
        return dtos;
    }
    async updateItemQuantity(usuarioId, livroId, quantidade) {
        if (quantidade <= 0) {
            const removed = await this.removeItem(usuarioId, livroId);
            if (!removed) {
                throw new errors_1.NotFoundError("Item não encontrado para remoção.");
            }
            return undefined;
        }
        const livroRepo = await this.getLivroRepository();
        const livro = await livroRepo.filtraLivroPorId(livroId);
        if (!livro) {
            throw new errors_1.NotFoundError(`Livro com ID ${livroId} não encontrado.`);
        }
        if (quantidade > livro.estoque) {
            throw new errors_1.ConflictError(`Não é possível definir a quantidade para ${quantidade}. Estoque máximo: ${livro.estoque}.`);
        }
        const carrinhoRepo = await this.getCarrinhoRepository();
        const updatedEntity = await carrinhoRepo.aplicarQuantidade(usuarioId, livroId, quantidade);
        if (!updatedEntity) {
            throw new errors_1.NotFoundError(`Item não encontrado para atualização.`);
        }
        return this.mapToDto(updatedEntity);
    }
    async removeItem(usuarioId, livroId) {
        const carrinhoRepo = await this.getCarrinhoRepository();
        return await carrinhoRepo.removerItem(usuarioId, livroId);
    }
    async clearCarrinho(usuarioId) {
        const carrinhoRepo = await this.getCarrinhoRepository();
        return await carrinhoRepo.limparCarrinho(usuarioId);
    }
}
exports.CarrinhoService = CarrinhoService;
