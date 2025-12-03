class PedidoModel{

    static proximoId: number = 1;

    id: number;
    usuarioId: number;
    enderecoEntrega: string;
    dataPedido: Date;
    valorTotal: number;
    statusPedido: "PENDENTE" | "PAGO" | "ENVIADO" | "CANCELADO";

    constructor(usuarioId: number, enderecoEntrega: string, dataPedido: Date, valorTotal: number, statusPedido: "PENDENTE" | "PAGO" | "ENVIADO" | "CANCELADO"){
        this.id = PedidoModel.proximoId++;
        this.usuarioId = usuarioId;
        this.enderecoEntrega = enderecoEntrega;
        this.dataPedido = dataPedido;
        this.valorTotal = valorTotal;
        this.statusPedido = statusPedido;
    }

    //GETTERS
    
    public getId(): number{
        return this.id;
    }

    public getUsuarioId(): number{
        return this.usuarioId;
    }

    public getEnderecoEntrega(): string{
        return this.enderecoEntrega;
    }

    public getDataPedido(): Date{
        return this.dataPedido;
    }

    public getValorTotal(): number{
        return this.valorTotal;
    }

    public getStatusPedido(): "PENDENTE" | "PAGO" | "ENVIADO" | "CANCELADO"{
        return this.statusPedido;
    }

    //SETTERS

    public setUsuarioId(usuarioId: number): void{
        this.usuarioId = usuarioId;
    }

    public setEnderecoEntrega(enderecoEntrega: string): void{
        this.enderecoEntrega = enderecoEntrega;
    }

    public setDataPedido(dataPedido: Date): void{
        this.dataPedido = dataPedido;
    }

    public setValorTotal(valorTotal: number): void{
        this.valorTotal = valorTotal;
    }

    public setStatusPedido(statusPedido: "PENDENTE" | "PAGO" | "ENVIADO" | "CANCELADO"): void{
        this.statusPedido = statusPedido;
    }
}