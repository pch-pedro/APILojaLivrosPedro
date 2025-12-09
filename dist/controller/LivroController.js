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
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const LivroRequestDto_1 = require("../model/dto/LivroRequestDto");
let LivroController = class LivroController extends tsoa_1.Controller {
    livroService = new LivroService_1.LivroService();
    async criarLivro(dto, fail, success) {
        try {
            dto.isbn = String(dto.isbn);
            const livro = await this.livroService.novoLivro(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Livro cadastrado com sucesso!", livro));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async listarLivros(fail, success) {
        try {
            const livros = await this.livroService.listarLivros();
            return success(202, new BasicResponseDto_1.BasicResponseDto("Livros Cadastrados: ", livros));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async filtrarLivro(id, fail, success) {
        try {
            const livroEncontrado = await this.livroService.filtrarLivro({ id });
            return success(200, new BasicResponseDto_1.BasicResponseDto("Livro encontrado com sucesso!", livroEncontrado));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async atualizarLivro(id, dto, fail, success) {
        try {
            const livroAtualizado = await this.livroService.atualizaLivro({
                id: id,
                novosDados: dto
            });
            return success(200, new BasicResponseDto_1.BasicResponseDto("Livro atualizado com sucesso!", livroAtualizado));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async removerLivro(id, fail, success) {
        try {
            const livroRemovido = await this.livroService.removeLivro(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Livro Removido com sucesso!", livroRemovido));
        }
        catch (err) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
};
exports.LivroController = LivroController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LivroRequestDto_1.LivroRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "criarLivro", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "listarLivros", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "filtrarLivro", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, LivroRequestDto_1.LivroRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "atualizarLivro", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "removerLivro", null);
exports.LivroController = LivroController = __decorate([
    (0, tsoa_1.Route)("livros"),
    (0, tsoa_1.Tags)("Livro")
], LivroController);
