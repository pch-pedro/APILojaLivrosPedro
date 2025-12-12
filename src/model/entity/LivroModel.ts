export class LivroModel {

    id?: number;
    categoria_id: number;
    titulo: string;
    autor: string;
    isbn: string;
    preco: number;
    estoque: number;
    sinopse: string;
    image_url: string;
    editora: string;
    data_publicacao: Date;
    promocao? : boolean;

    constructor(categoria_id: number, titulo: string, autor: string, isbn: string, preco: number, estoque: number, sinopse: string, image_url: string, editora: string, data_publicacao: Date, promocao?: boolean, id?: number) {
        this.id = id;
        this.categoria_id = categoria_id;
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.preco = preco;
        this.estoque = estoque;
        this.sinopse = sinopse;
        this.image_url = image_url;
        this.editora = editora;
        this.data_publicacao = data_publicacao;
        this.promocao = promocao ?? false;
    }
}
