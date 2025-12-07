"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoDto = void 0;
class PedidoDto {
    static proximoId = 1;
    id;
    usuario_id;
    endereco_entrega_id;
    data_pedido;
    valor_total;
    status_pedido;
    constructor(usuario_id, endereco_entrega_id, data_pedido, valor_total, status_pedido) {
        this.id = PedidoDto.proximoId++;
        this.usuario_id = usuario_id;
        this.endereco_entrega_id = endereco_entrega_id;
        this.data_pedido = data_pedido;
        this.valor_total = valor_total;
        this.status_pedido = status_pedido;
    }
    //GETTERS
    getId() {
        return this.id;
    }
    getUsuario_Id() {
        return this.usuario_id;
    }
    getEndereco_Entrega_Id() {
        return this.endereco_entrega_id;
    }
    getData_Pedido() {
        return this.data_pedido;
    }
    getValor_Total() {
        return this.valor_total;
    }
    getStatus_Pedido() {
        return this.status_pedido;
    }
    //SETTERS
    setUsuario_Id(usuario_id) {
        this.usuario_id = usuario_id;
    }
    setEndereco_Entrega_Id(endereco_entrega_id) {
        this.endereco_entrega_id = endereco_entrega_id;
    }
    setData_Pedido(dataPedido) {
        this.data_pedido = dataPedido;
    }
    setValor_Total(valor_total) {
        this.valor_total = valor_total;
    }
    setStatus_Pedido(status_pedido) {
        this.status_pedido = status_pedido;
    }
}
exports.PedidoDto = PedidoDto;
