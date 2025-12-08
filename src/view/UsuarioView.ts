import { UsuarioModel } from "../model/entity/UsuarioModel";

export class UsuarioView {
    static formatarUsuario(usuario: UsuarioModel): object {
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            tipo_usuario: usuario.tipo_usuario
            // não retornar senha_hash
        };
    }

    static formatarListaUsuarios(usuarios: UsuarioModel[]): object {
        return {
            total: usuarios.length,
            usuarios: usuarios.map(usuario => this.formatarUsuario(usuario))
        };
    }

    static formatarErro(mensagem: string, statusCode: number = 400): object {
        return {
            error: true,
            statusCode,
            message: mensagem,
            timestamp: new Date().toISOString()
        };
    }

    static formatarSucesso(dados: any, mensagem: string = "Operação realizada com sucesso", statusCode: number = 200): object {
        return {
            success: true,
            statusCode,
            message: mensagem,
            data: dados,
            timestamp: new Date().toISOString()
        };
    }
}
