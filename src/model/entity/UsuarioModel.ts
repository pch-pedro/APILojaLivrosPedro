export enum TipoUsuario {
    CLIENTE = 'CLIENTE',
    ADMIN = 'ADMIN'
}

export class UsuarioModel{

    static proximoId: number = 1;

    id: number;
    nome: string;
    email: string;
    senha_hash: string;
    telefone: string;
    tipo_usuario: TipoUsuario;

    constructor(nome: string, email: string, senha_hash: string, telefone: string, tipo_usuario: TipoUsuario){
        if (!nome || !email || !senha_hash || !telefone) {
            throw new Error('Todos os campos (nome, email, senha_hash, telefone) são obrigatórios.');
        }
        this.id = UsuarioModel.proximoId++;
        this.nome = nome,
        this.email = email,
        this.senha_hash = senha_hash,
        this.telefone = telefone,
        this.tipo_usuario = tipo_usuario;
    }
}