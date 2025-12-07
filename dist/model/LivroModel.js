"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroModel = void 0;
class LivroModel {
    static proximoId = 1;
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
    promocao = false;
    constructor(categoria_id, titulo, autor, isbn, preco, estoque, sinopse, imageURL, editora, data_publicacao, promocao = false) {
        this.id = LivroModel.proximoId++;
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
        this.promocao = false;
    }
    //GETTERS
    getId() {
        return this.id;
    }
    getCategoriaId() {
        return this.categoria_id;
    }
    getTitulo() {
        return this.titulo;
    }
    getIsbn() {
        return this.isbn;
    }
    getPreco() {
        return this.preco;
    }
    getEstoque() {
        return this.estoque;
    }
    getSinopse() {
        return this.sinopse;
    }
    getImageURL() {
        return this.imageURL;
    }
    getAutor() {
        return this.autor;
    }
    getEditora() {
        return this.editora;
    }
    getDataPublicacao() {
        return this.data_publicacao;
    }
    getPromocao() {
        return this.promocao ?? false;
    }
    //SETTERS
    setCategoriaId(categoria_id) {
        this.categoria_id = categoria_id;
    }
    setTitulo(titulo) {
        this.titulo = titulo;
    }
    setIsbn(isbn) {
        this.isbn = isbn;
    }
    setPreco(preco) {
        this.preco = preco;
    }
    setEstoque(estoque) {
        this.estoque = estoque;
    }
    setSinopse(sinopse) {
        this.sinopse = sinopse;
    }
    setImageURL(imageURL) {
        this.imageURL = imageURL;
    }
    setAutor(autor) {
        this.autor = autor;
    }
    seteditora(editora) {
        this.editora = editora;
    }
    setDataPublicacao(data_publicacao) {
        this.data_publicacao = data_publicacao;
    }
    setPromocao(promocao) {
        this.promocao = promocao;
    }
}
exports.LivroModel = LivroModel;
