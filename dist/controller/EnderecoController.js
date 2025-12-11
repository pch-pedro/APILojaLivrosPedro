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
exports.EnderecoController = void 0;
const tsoa_1 = require("tsoa");
const EnderecoService_1 = require("../service/EnderecoService");
const EnderecoRequestDto_1 = require("../model/dto/EnderecoRequestDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const errors_1 = require("../utils/errors");
let EnderecoController = class EnderecoController extends tsoa_1.Controller {
    enderecoService = new EnderecoService_1.EnderecoService();
    async criarEndereco(dto, fail, success) {
        try {
            const novoEndereco = await this.enderecoService.criarEndereco(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Endereço criado com sucesso!", novoEndereco));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError)
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            if (err instanceof errors_1.ValidationError)
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno ao criar endereço.", undefined));
        }
    }
    async listarEnderecosDoUsuario(usuarioId, fail, success) {
        try {
            const enderecos = await this.enderecoService.listarEnderecosPorUsuario(usuarioId);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Endereços encontrados", enderecos));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError)
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            if (err instanceof errors_1.ValidationError)
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno ao buscar endereços.", undefined));
        }
    }
    async obterEndereco(id, fail, success) {
        try {
            const endereco = await this.enderecoService.buscarEnderecoPorId(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Endereço encontrado", endereco));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError)
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            if (err instanceof errors_1.ValidationError)
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno.", undefined));
        }
    }
    async atualizarEndereco(id, dto, fail, success) {
        try {
            const atualizado = await this.enderecoService.atualizarEndereco(id, dto);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Endereço atualizado com sucesso!", atualizado));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError)
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            if (err instanceof errors_1.ValidationError)
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno.", undefined));
        }
    }
    async deletarEndereco(id, fail, success) {
        try {
            await this.enderecoService.removerEndereco(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Endereço removido com sucesso.", undefined));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError)
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno.", undefined));
        }
    }
};
exports.EnderecoController = EnderecoController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EnderecoRequestDto_1.EnderecoRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "criarEndereco", null);
__decorate([
    (0, tsoa_1.Get)("usuario/{usuarioId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "listarEnderecosDoUsuario", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "obterEndereco", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function, Function]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "atualizarEndereco", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "deletarEndereco", null);
exports.EnderecoController = EnderecoController = __decorate([
    (0, tsoa_1.Route)("endereco"),
    (0, tsoa_1.Tags)("Endereco")
], EnderecoController);
