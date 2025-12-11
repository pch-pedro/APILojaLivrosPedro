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
exports.PedidoController = void 0;
exports.getPedidoService = getPedidoService;
const tsoa_1 = require("tsoa");
// Importações dos DTOs e Service
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const PedidoRequestDto_1 = require("../model/dto/PedidoRequestDto");
const PedidoService_1 = require("../service/PedidoService");
const errors_1 = require("../utils/errors");
const PedidoRepository_1 = require("../repository/PedidoRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const EnderecoRepository_1 = require("../repository/EnderecoRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
async function getPedidoService() {
    const pedidoRepo = await PedidoRepository_1.PedidoRepository.getInstance();
    const usuarioRepo = await UsuarioRepository_1.UsuarioRepository.getInstance();
    const enderecoRepo = await EnderecoRepository_1.EnderecoRepository.getInstance();
    const livroRepo = await LivroRepository_1.LivroRepository.getInstance();
    return new PedidoService_1.PedidoService(pedidoRepo, usuarioRepo, enderecoRepo, livroRepo);
}
let PedidoController = class PedidoController extends tsoa_1.Controller {
    async criarPedido(dto, fail, success) {
        if (!dto) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto("Corpo da requisição (body) é obrigatório e deve conter os dados do pedido.", undefined));
        }
        try {
            const pedidoService = await getPedidoService();
            const novoPedidoDto = await pedidoService.criarPedido(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Pedido realizado com sucesso!", novoPedidoDto));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError) {
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            if (err instanceof errors_1.ValidationError) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            if (err instanceof errors_1.ConflictError) {
                return fail(409, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            return fail(500, new BasicResponseDto_1.BasicResponseDto(`Erro interno do servidor: ${err.message}`, undefined));
        }
    }
    async buscarPedidoPorId(id, fail, success) {
        try {
            const pedidoService = await getPedidoService();
            const pedidoDto = await pedidoService.buscarPedidoPorId(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Pedido encontrado com sucesso!", pedidoDto));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError) {
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            if (err instanceof errors_1.ValidationError) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno do servidor ao buscar pedido.", undefined));
        }
    }
    async listarPedidosPorUsuario(usuarioId, fail, success) {
        try {
            const pedidoService = await getPedidoService();
            const pedidos = await pedidoService.listarPedidosPorUsuario(usuarioId);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Histórico de pedidos listado com sucesso!", pedidos));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError) {
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            if (err instanceof errors_1.ValidationError) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno do servidor ao listar pedidos.", undefined));
        }
    }
    async atualizarStatusPedido(id, body, fail, success) {
        try {
            const pedidoService = await getPedidoService();
            const updatedPedido = await pedidoService.atualizarPedidoStatus(id, body.status);
            return success(200, new BasicResponseDto_1.BasicResponseDto(`Status do pedido ${id} atualizado para ${body.status}`, updatedPedido));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError) {
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            if (err instanceof errors_1.ValidationError) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            return fail(500, new BasicResponseDto_1.BasicResponseDto("Erro interno do servidor ao atualizar status.", undefined));
        }
    }
};
exports.PedidoController = PedidoController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PedidoRequestDto_1.PedidoRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "criarPedido", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "buscarPedidoPorId", null);
__decorate([
    (0, tsoa_1.Get)("usuario/{usuarioId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "listarPedidosPorUsuario", null);
__decorate([
    (0, tsoa_1.Put)("{id}/status"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function, Function]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "atualizarStatusPedido", null);
exports.PedidoController = PedidoController = __decorate([
    (0, tsoa_1.Route)("pedidos"),
    (0, tsoa_1.Tags)("Pedido")
], PedidoController);
