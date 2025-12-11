"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrinhoController = void 0;
const tsoa_1 = require("tsoa");
const CarrinhoService_1 = require("../service/CarrinhoService");
const CarrinhoRequestDto_1 = require("../model/dto/CarrinhoRequestDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const errors_1 = require("../utils/errors");
const carrinhoService = new CarrinhoService_1.CarrinhoService();
let CarrinhoController = class CarrinhoController extends tsoa_1.Controller {
    async adicionarItem(dto, fail, success) {
        try {
            const itemAtualizado = await carrinhoService.addItem(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Item adicionado/atualizado no carrinho.", itemAtualizado));
        }
        catch (err) {
            console.error(err);
            if (err instanceof errors_1.NotFoundError)
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            if (err instanceof errors_1.ValidationError)
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            if (err instanceof errors_1.ConflictError)
                return fail(409, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno ao adicionar item.", err));
        }
    }
    async listarCarrinho(usuarioId, fail, success) {
        try {
            const itensCarrinho = await carrinhoService.getCarrinho(usuarioId);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Carrinho retornado com sucesso.", itensCarrinho));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError)
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            if (err instanceof errors_1.ValidationError)
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno ao listar carrinho.", undefined));
        }
    }
    async atualizarQuantidade(usuarioId, livroId, body, fail, success) {
        try {
            const { quantidade } = body;
            const itemAtualizado = await carrinhoService.updateItemQuantity(usuarioId, livroId, quantidade);
            if (!itemAtualizado) {
                return success(200, new BasicResponseDto_1.BasicResponseDto("Item removido do carrinho (quantidade definida como 0).", undefined));
            }
            return success(200, new BasicResponseDto_1.BasicResponseDto("Quantidade do item atualizada com sucesso.", itemAtualizado));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError)
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            if (err instanceof errors_1.ValidationError)
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            if (err instanceof errors_1.ConflictError)
                return fail(409, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno ao atualizar quantidade.", undefined));
        }
    }
    async removerItem(usuarioId, livroId, fail, success) {
        try {
            const successDelete = await carrinhoService.removeItem(usuarioId, livroId);
            if (!successDelete) {
                throw new errors_1.NotFoundError("Item não encontrado no carrinho para remoção.");
            }
            return success(200, new BasicResponseDto_1.BasicResponseDto("Item removido do carrinho com sucesso.", undefined));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError)
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno ao remover item.", undefined));
        }
    }
};
exports.CarrinhoController = CarrinhoController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CarrinhoRequestDto_1.CarrinhoRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], CarrinhoController.prototype, "adicionarItem", null);
__decorate([
    (0, tsoa_1.Get)("{usuarioId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], CarrinhoController.prototype, "listarCarrinho", null);
__decorate([
    (0, tsoa_1.Put)("{usuarioId}/item/{livroId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __param(3, (0, tsoa_1.Res)()),
    __param(4, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Function, Function]),
    __metadata("design:returntype", Promise)
], CarrinhoController.prototype, "atualizarQuantidade", null);
__decorate([
    (0, tsoa_1.Delete)("{usuarioId}/item/{livroId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Function, Function]),
    __metadata("design:returntype", Promise)
], CarrinhoController.prototype, "removerItem", null);
exports.CarrinhoController = CarrinhoController = __decorate([
    (0, tsoa_1.Route)("carrinho"),
    (0, tsoa_1.Tags)("Carrinho")
], CarrinhoController);
