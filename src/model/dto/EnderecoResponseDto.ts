export class EnderecoResponseDto {
    id: number;
    usuario_id: number; 
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    cidade: string;
    estado: string;

    constructor(endereco: { id: number, usuario_id: number, cep: string, rua: string, numero: string, complemento?: string, cidade: string, estado: string }) {
        this.id = endereco.id;
        this.usuario_id = endereco.usuario_id;
        this.cep = endereco.cep;
        this.rua = endereco.rua;
        this.numero = endereco.numero;
        this.complemento = endereco.complemento;
        this.cidade = endereco.cidade;
        this.estado = endereco.estado;
    }
}