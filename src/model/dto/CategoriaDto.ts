export class CategoriaModel{

    id?: number;
    nome: string;

    constructor(nome: string, id?: number){
        this.id = id;
        this.nome = nome;
    }

    //GETTERS

    getId(): number | undefined{
        return this.id;
    }

    getNome(): string{
        return this.nome;
    }

    //SETTERS

    setNome(nome: string): void{
        this.nome = nome;
    }
}