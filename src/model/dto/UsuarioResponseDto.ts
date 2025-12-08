import { TipoUsuario } from "../entity/UsuarioModel";

export class UsuarioResponseDto {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    tipo_usuario: TipoUsuario;

    constructor(usuario: { id: number, nome: string, email: string, telefone: string, tipo_usuario: TipoUsuario }) {
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.email = usuario.email;
        this.telefone = usuario.telefone;
        this.tipo_usuario = usuario.tipo_usuario;
    }
}