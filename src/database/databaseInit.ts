import { UsuarioRepository } from '../repository/UsuarioRepository.js';
import { EnderecoRepository } from '../repository/EnderecoRepository.js';
import { LivroRepository } from '../repository/LivroRepository.js';
import { CategoriaRepository } from '../repository/CategoriaRepository.js';
import { PedidoRepository } from '../repository/PedidoRepository.js';
import { CarrinhoRepository } from '../repository/CarrinhoRepository.js';

export async function inicializarTabelas() {
    console.log("⬆️ Iniciando criação das tabelas...");

    await UsuarioRepository.getInstance(); 
    console.log("✔ 1. Usuario OK"); 

    await CategoriaRepository.getInstance(); 
    console.log("✔ 2. Categoria OK");

    try{
        await EnderecoRepository.getInstance();
        console.log("✔ 3. Endereco OK"); 
    }catch(err){
        console.error("❌ Erro ao criar tabela Endereco:", err);
        throw err;
    }

    await LivroRepository.getInstance(); 
    console.log("✔ 4. Livro OK"); 

    await PedidoRepository.getInstance();
    console.log("✔ 5. Pedido OK"); 

    await CarrinhoRepository.getInstance(); 
    console.log("✔ 6. Carrinho OK");

    console.log("🎉 Todas as tabelas criadas com sucesso!");
}