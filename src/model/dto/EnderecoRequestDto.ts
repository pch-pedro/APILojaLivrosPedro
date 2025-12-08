export class EnderecoRequestDto {
    usuario_id: number; 
    cep: string;
    rua: string;
    numero: string;
    complemento?: string; 
    cidade: string;
    estado: string;

    constructor(usuario_id: number, cep: string, rua: string, numero: string, complemento: string, cidade: string, estado: string) {
        this.usuario_id = usuario_id;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.estado = estado;
    }
}