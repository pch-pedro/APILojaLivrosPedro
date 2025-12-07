export class UsuarioModel{

    static proximoId: number = 1;

    id: number;
    nome: string;
    email: string;
    senha_hash: string;
    telefone: string;
    tipo_usuario: "CLIENTE" | "ADMIN";

    constructor(nome: string, email: string, senha_hash: string, telefone: string, tipo_usuario: "CLIENTE" | "ADMIN"){
        this.id = UsuarioModel.proximoId++;
        this.nome = nome,
        this.email = email,
        this.senha_hash = senha_hash,
        this.telefone = telefone,
        this.tipo_usuario = tipo_usuario;
    }

    //GETTERS

    getId(): number{
        return this.id;
    }

    getNome(): string{
        return this.nome;
    }

    getEmail(): string{
        return this.email;
    }

    getSenha_Hash(): string{
        return this.senha_hash;
    }

    getTelefone(): string{
        return this.telefone;
    }

    getTipoUsuario(): string{
        return this.tipo_usuario;
    }

    //SETTERS

    setNome(nome: string): void{
        this.nome = nome;
    }

    setEmail(email: string): void{
        this.email = email;
    }

    setSenha_Hash(senha_hash: string): void{
        this.senha_hash = senha_hash;
    }

    setTelefone(telefone: string): void{
        this.telefone = telefone;
    }

    setTipoUsuario(tipo_usuario: "CLIENTE" | "ADMIN"){
        this.tipo_usuario = tipo_usuario;
    }

    //Verificações

    ehAdmin(): boolean{
        return this.tipo_usuario === "ADMIN";
    }

    ehCliente(): boolean{
        return this.tipo_usuario === "CLIENTE";
    }
}