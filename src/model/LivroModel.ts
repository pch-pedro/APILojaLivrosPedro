export class LivroModel {
    static proximoId: number = 1;

    id: number;
    categoria_id: number;
    titulo: string;
    autor: string;
    isbn: string;
    preco: number;
    estoque: number;
    sinopse: string;
    imageURL: string;
    editora: string;
    data_publicacao: Date;
    promocao: boolean = false;

    constructor(categoria_id: number, titulo: string, autor: string, isbn: string, preco: number, estoque: number, sinopse: string, imageURL: string, editora: string, data_publicacao: Date) {
        this.id = LivroModel.proximoId++;
        this.categoria_id = categoria_id;
        this.titulo = titulo;
        this.isbn = isbn;
        this.preco = preco;
        this.estoque = estoque;
        this.sinopse = sinopse;
        this.imageURL = imageURL;
        this.autor = autor;
        this.editora = editora;
        this.data_publicacao = data_publicacao;
    }

    //GETTERS

    getId(): number{
        return this.id;
    }

    getCategoriaId(): number{
        return this.categoria_id;
    }

    getTitulo(): string{
        return this.titulo;
    }

    getIsbn(): string{
        return this.isbn;
    }

    getPreco(): number{
        return this.preco;
    }

    getEstoque(): number{
        return this.estoque;
    }

    getSinopse(): string{
        return this.sinopse;
    }

    getImageURL(): string{
        return this.imageURL;
    }

    getAutor(): string{
        return this.autor;
    }

    getEditora(): string{
        return this.editora;
    }

    getDataPublicacao(): Date{
        return this.data_publicacao;
    }

    getPromocao(): boolean{
        return this.promocao;
    }

    //SETTERS

    setCategoriaId(categoria_id: number): void{
        this.categoria_id = categoria_id;
    }

    setTitulo(titulo: string): void{
        this.titulo = titulo;
    }

    setIsbn(isbn: string): void{
        this.isbn = isbn;
    }

    setPreco(preco: number): void{
        this.preco = preco;
    }

    setEstoque(estoque: number): void{
        this.estoque = estoque;
    }

    setSinopse(sinopse: string): void{
        this.sinopse = sinopse;
    }

    setImageURL(imageURL: string): void{
        this.imageURL = imageURL;
    }

    setAutor(autor: string): void{
        this.autor = autor;
    }

    seteditora(editora: string): void{
        this.editora = editora;
    }

    setDataPublicacao(data_publicacao: Date){
        this.data_publicacao = data_publicacao;
    }

    setPromocao(promocao: boolean){
        this.promocao = promocao;
    }
}