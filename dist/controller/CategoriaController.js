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
exports.CategoriaController = void 0;
const CategoriaService_1 = require("../service/CategoriaService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const CategoriaDto_1 = require("../model/dto/CategoriaDto");
let CategoriaController = class CategoriaController {
    categoriaService = new CategoriaService_1.CategoriaService();
    async novaCategoria(dto, fail, success) {
        try {
            const categoria = await this.categoriaService.novaCategoria(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Categoria cadastrada com sucesso!", categoria));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async listarCategoria(fail, success) {
        try {
            const categoria = await this.categoriaService.listarCategoria();
            return success(202, new BasicResponseDto_1.BasicResponseDto("Categorias cadastradas: ", categoria));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async listarCategoriaPorId(id, fail, success) {
        try {
            const categoriaEncontrada = await this.categoriaService.listarCategoriaPorId(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Categoria encontrada com sucesso!", categoriaEncontrada));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async atualizaCategoria(id, dto, fail, success) {
        try {
            dto.id = id;
            const categoriaAtualizada = await this.categoriaService.atualizaCategoria(id, { nome: dto.nome });
            return success(200, new BasicResponseDto_1.BasicResponseDto("Categoria atualizada com sucesso!", categoriaAtualizada));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async removeCategoria(id, fail, success) {
        try {
            const categoriaRemovida = await this.categoriaService.removeCategoria(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Categoria removida com sucesso!", categoriaRemovida));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
};
exports.CategoriaController = CategoriaController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoriaDto_1.CategoriaDto, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "novaCategoria", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "listarCategoria", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "listarCategoriaPorId", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CategoriaDto_1.CategoriaDto, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "atualizaCategoria", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "removeCategoria", null);
exports.CategoriaController = CategoriaController = __decorate([
    (0, tsoa_1.Route)("categoria"),
    (0, tsoa_1.Tags)("Categoria")
], CategoriaController);
