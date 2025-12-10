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
exports.ItemPedidoController = void 0;
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const ItemPedidoService_1 = require("../service/ItemPedidoService");
const errors_1 = require("../utils/errors");
const itemPedidoService = new ItemPedidoService_1.ItemPedidoService();
let ItemPedidoController = class ItemPedidoController extends tsoa_1.Controller {
    async removerItem(itemId, fail, success) {
        try {
            await itemPedidoService.removeItemDoPedido(itemId);
            return success(200, new BasicResponseDto_1.BasicResponseDto(`Item de pedido ${itemId} removido com sucesso.`, undefined));
        }
        catch (err) {
            if (err instanceof errors_1.NotFoundError) {
                return fail(404, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            if (err instanceof errors_1.ConflictError) {
                return fail(409, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            if (err instanceof errors_1.ValidationError) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(err.message, undefined));
            }
            return fail(500, new BasicResponseDto_1.BasicResponseDto(`Erro interno: ${err.message}`, undefined));
        }
    }
};
exports.ItemPedidoController = ItemPedidoController;
__decorate([
    (0, tsoa_1.Delete)("{itemId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], ItemPedidoController.prototype, "removerItem", null);
exports.ItemPedidoController = ItemPedidoController = __decorate([
    (0, tsoa_1.Route)("item-pedido"),
    (0, tsoa_1.Tags)("ItemPedido")
], ItemPedidoController);
