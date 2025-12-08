export class UsuarioRequestDto{

    static proximoId: number = 1;

    id: number;
    nome: string;
    email: string;
    senha_hash: string;
    telefone: string;
    tipo_usuario: "CLIENTE" | "ADMIN";

    constructor(nome: string, email: string, senha_hash: string, telefone: string, tipo_usuario: "CLIENTE" | "ADMIN"){
        this.id = UsuarioRequestDto.proximoId++;
        this.nome = nome,
        this.email = email,
        this.senha_hash = senha_hash,
        this.telefone = telefone,
        this.tipo_usuario = tipo_usuario;
    }

}