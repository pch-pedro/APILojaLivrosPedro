class EnderecoModel{
    
    static proximoId: number = 1;

    id: number;
    usuarioId: number;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    cidade: string;
    estado: string;

    constructor(usuarioId: number, cep: string, rua: string, numero: string, complemento: string, cidade: string, estado: string){
        this.id = EnderecoModel.proximoId++;
        this.usuarioId = usuarioId;
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

    getUsuarioid(): number{
        return this.usuarioId;
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

    setUsuarioId(usuarioId: number){
        this.usuarioId = usuarioId;
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