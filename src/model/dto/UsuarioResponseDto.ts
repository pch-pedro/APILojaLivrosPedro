import { UsuarioModel, TipoUsuario } from "../entity/UsuarioModel";

export type UsuarioResponseInput = Omit<UsuarioModel, 'senha_hash'>;

export class UsuarioResponseDto {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    tipo_usuario: TipoUsuario;

    constructor(usuario: UsuarioResponseInput) { 
        this.id = usuario.id as number; 
        this.nome = usuario.nome;
        this.email = usuario.email;
        this.telefone = usuario.telefone;
        this.tipo_usuario = usuario.tipo_usuario;
    }
}