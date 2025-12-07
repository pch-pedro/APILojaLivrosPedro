export class EnderecoDto{
    static proximoId: number = 1;

    id: number;
    usuario_id: number;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    cidade: string;
    estado: string;

    constructor(usuario_id: number, cep: string, rua: string, numero: string, complemento: string, cidade: string, estado: string){
        this.id = EnderecoDto.proximoId++;
        this.usuario_id = usuario_id;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.estado = estado;
    }

    //GETTERS

    getId(): number{
        return this.id;
    }

    getUsuario_Id(): number{
        return this.usuario_id;
    }

    getCep(): string{
        return this.cep;
    }

    getRua(): string{
        return this.rua;
    }

    getNumero(): string{
        return this.numero;
    }

    getComplemento(): string{
        return this.complemento;
    }

    getCidade(): string{
        return this.cidade;
    }

    getEstado(): string{
        return this.estado;
    }

    //SETTERS

    setUsuarioId(usuario_id: number){
        this.usuario_id = usuario_id;
    }

    setCep(cep: string){
        this.cep = cep;
    }

    setRua(rua: string){
        this.rua = rua;
    }

    setNumero(numero: string){
        this.numero = numero;
    }

    setComplemento(complemento: string){
        this.complemento = complemento;
    }

    setCidade(cidade: string){
        this.cidade = cidade;
    }

    setEstado(estado: string){
        this.estado = estado;
    }
}