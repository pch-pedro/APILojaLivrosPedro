export class PedidoModel{

    static proximoId: number = 1;

    id: number;
    usuario_id: number;
    endereco_entrega_id: number;
    data_pedido: Date;
    valor_total: number;
    status_pedido: "PENDENTE" | "PAGO" | "ENVIADO" | "CANCELADO";

    constructor(usuario_id: number, endereco_entrega_id: number, data_pedido: Date, valor_total: number, status_pedido: "PENDENTE" | "PAGO" | "ENVIADO" | "CANCELADO"){
        this.id = PedidoModel.proximoId++;
        this.usuario_id = usuario_id;
        this.endereco_entrega_id = endereco_entrega_id;
        this.data_pedido = data_pedido;
        this.valor_total = valor_total;
        this.status_pedido = status_pedido;
    }

    //GETTERS
    
    public getId(): number{
        return this.id;
    }

    public getUsuario_Id(): number{
        return this.usuario_id;
    }

    public getEndereco_Entrega_Id(): number{
        return this.endereco_entrega_id;
    }

    public getData_Pedido(): Date{
        return this.data_pedido;
    }

    public getValor_Total(): number{
        return this.valor_total;
    }

    public getStatus_Pedido(): "PENDENTE" | "PAGO" | "ENVIADO" | "CANCELADO"{
        return this.status_pedido;
    }

    //SETTERS

    public setUsuario_Id(usuario_id: number): void{
        this.usuario_id = usuario_id;
    }

    public setEndereco_Entrega_Id(endereco_entrega_id: number): void{
        this.endereco_entrega_id = endereco_entrega_id;
    }

    public setData_Pedido(dataPedido: Date): void{
        this.data_pedido = dataPedido;
    }

    public setValor_Total(valor_total: number): void{
        this.valor_total = valor_total;
    }

    public setStatus_Pedido(status_pedido: "PENDENTE" | "PAGO" | "ENVIADO" | "CANCELADO"): void{
        this.status_pedido = status_pedido;
    }
}