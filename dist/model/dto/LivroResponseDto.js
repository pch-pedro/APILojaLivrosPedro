"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroResponseDto = void 0;
class LivroResponseDto {
    id;
    categoria_id;
    titulo;
    autor;
    isbn;
    preco;
    estoque;
    sinopse;
    imageURL;
    editora;
    data_publicacao;
    promocao;
    constructor(id, categoria_id, titulo, autor, isbn, preco, estoque, sinopse, imageURL, editora, data_publicacao, promocao = false) {
        this.id = id;
        this.categoria_id = categoria_id;
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.preco = preco;
        this.estoque = estoque;
        this.sinopse = sinopse;
        this.imageURL = imageURL;
        this.editora = editora;
        this.data_publicacao = data_publicacao;
        this.promocao = promocao;
    }
}
exports.LivroResponseDto = LivroResponseDto;
