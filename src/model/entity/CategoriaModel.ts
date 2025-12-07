export class CategoriaModel{

    static proximoId: number = 1;

    id: number;
    titulo: string;
    nome: string;

    constructor(titulo: string, nome: string){
        this.id = CategoriaModel.proximoId++;
        this.titulo = titulo;
        this.nome = nome;
    }

    //GETTERS

    getId(): number{
        return this.id;
    }

    getTitulo(): string{
        return this.titulo;
    }

    getNome(): string{
        return this.nome;
    }

    //SETTERS

    setTitulo(titulo: string): void{
        this.titulo = titulo;
    }

    setNome(nome: string): void{
        this.nome = nome;
    }
}