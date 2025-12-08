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
exports.UsuarioController = void 0;
const tsoa_1 = require("tsoa");
const UsuarioService_1 = require("../service/UsuarioService");
const UsuarioRequestDto_1 = require("../model/dto/UsuarioRequestDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const errors_1 = require("../utils/errors");
const usuarioService = new UsuarioService_1.UsuarioService();
let UsuarioController = class UsuarioController extends tsoa_1.Controller {
    async criarUsuario(dto, fail, success) {
        try {
            const newUsuarioDto = await usuarioService.createUsuario(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Usuário cadastrado com sucesso!", newUsuarioDto));
        }
        catch (err) {
            if (err instanceof errors_1.ValidationError) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            if (err instanceof errors_1.ConflictError) {
                return fail(409, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno do servidor ao criar usuário: " + err.message, undefined));
        }
    }
    async buscarUsuario(id, fail, success // Status de sucesso esperado
    ) {
        try {
            const userDto = await usuarioService.getUsuarioById(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuário encontrado com sucesso!", userDto));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError) {
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined)); // 404 Not Found
            }
            return fail(err instanceof errors_1.ValidationError ? 400 : 500, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
        }
    }
    async atualizarUsuario(id, dto, fail, success) {
        try {
            const updatedUserDto = await usuarioService.updateUsuario(id, dto);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuário atualizado com sucesso!", updatedUserDto));
        }
        catch (err) {
            if (err instanceof errors_1.ValidationError) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            if (err instanceof errors_1.NotFoundError) {
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno do servidor ao atualizar usuário.", undefined));
        }
    }
    async removerUsuario(id, fail, success) {
        try {
            await usuarioService.deleteUsuario(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuário removido com sucesso.", undefined));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError) {
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno do servidor ao remover usuário.", undefined));
        }
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioRequestDto_1.UsuarioRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "criarUsuario", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "buscarUsuario", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UsuarioRequestDto_1.UsuarioRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "atualizarUsuario", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "removerUsuario", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, tsoa_1.Route)("usuario"),
    (0, tsoa_1.Tags)("Usuario")
], UsuarioController);
