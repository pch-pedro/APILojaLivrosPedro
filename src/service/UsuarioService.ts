import { UsuarioModel } from "../model/entity/UsuarioModel";

export class UsuarioController{

    //Validar E-mail
    validarEmail(email: string): boolean{
        if(email.includes("@")){
            return true;
        }
        return false;
    }

    //Validar Telefone
    validarTelefone(telefone: string): boolean{
        if(telefone.length == 11){
            return true;
        }
        return false;
    }

    //Validar Tipo
    validarTipo(tipo: "CLIENTE" | "ADMIN"): boolean{
        if(tipo.toLocaleUpperCase() == "CLIENTE"){
            return true;
        }
        else if(tipo.toLocaleUpperCase() == "ADMIN"){
            return true;
        }
        return false;
    }

    //Criar Usuário
    criarUsuario(): void{

    }
}