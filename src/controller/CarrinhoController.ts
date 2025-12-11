import { Controller, Route, Tags, Post, Body, Res, TsoaResponse, Get, Path, Put, Delete } from "tsoa";
import { CarrinhoService } from "../service/CarrinhoService";
import { CarrinhoRequestDto } from "../model/dto/CarrinhoRequestDto";
import { CarrinhoResponseDto } from "../model/dto/CarrinhoResponseDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { NotFoundError, ValidationError, ConflictError } from '../utils/errors'; 

type CarrinhoFailResponse = TsoaResponse<400 | 404 | 409 | 500, BasicResponseDto>;

const carrinhoService = new CarrinhoService(); 

@Route("carrinho")
@Tags("Carrinho")
export class CarrinhoController extends Controller {

    @Post()
    public async adicionarItem(
        @Body() dto: CarrinhoRequestDto,
        @Res() fail: CarrinhoFailResponse, 
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const itemAtualizado = await carrinhoService.addItem(dto);
            return success(201, new BasicResponseDto("Item adicionado/atualizado no carrinho.", itemAtualizado));
            
        } catch (err: any) {
            console.error(err);
            if (err instanceof NotFoundError) return fail(404, new BasicResponseDto(err.message, undefined));
            if (err instanceof ValidationError) return fail(400, new BasicResponseDto(err.message, undefined));
            if (err instanceof ConflictError) return fail(409, new BasicResponseDto(err.message, undefined));
            
            return fail(500, new BasicResponseDto("Erro interno ao adicionar item.", err));
        }
    }

    @Get("{usuarioId}")
    public async listarCarrinho(
        @Path() usuarioId: number,
        @Res() fail: CarrinhoFailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const itensCarrinho = await carrinhoService.getCarrinho(usuarioId);
            
            return success(200, new BasicResponseDto("Carrinho retornado com sucesso.", itensCarrinho));
        } catch (err: any) {
            if (err instanceof NotFoundError) return fail(404, new BasicResponseDto(err.message, undefined));
            if (err instanceof ValidationError) return fail(400, new BasicResponseDto(err.message, undefined));
            
            return fail(500, new BasicResponseDto("Erro interno ao listar carrinho.", undefined));
        }
    }
    
    @Put("{usuarioId}/item/{livroId}")
    public async atualizarQuantidade(
        @Path() usuarioId: number,
        @Path() livroId: number,
        @Body() body: { quantidade: number },
        @Res() fail: CarrinhoFailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const { quantidade } = body;
            
            const itemAtualizado = await carrinhoService.updateItemQuantity(usuarioId, livroId, quantidade);
            
            if (!itemAtualizado) {
                 return success(200, new BasicResponseDto("Item removido do carrinho (quantidade definida como 0).", undefined));
            }
            
            return success(200, new BasicResponseDto("Quantidade do item atualizada com sucesso.", itemAtualizado));

        } catch (err: any) {
            if (err instanceof NotFoundError) return fail(404, new BasicResponseDto(err.message, undefined));
            if (err instanceof ValidationError) return fail(400, new BasicResponseDto(err.message, undefined));
            if (err instanceof ConflictError) return fail(409, new BasicResponseDto(err.message, undefined));
            
            return fail(500, new BasicResponseDto("Erro interno ao atualizar quantidade.", undefined));
        }
    }

    @Delete("{usuarioId}/item/{livroId}")
    public async removerItem(
        @Path() usuarioId: number,
        @Path() livroId: number,
        @Res() fail: CarrinhoFailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const successDelete = await carrinhoService.removeItem(usuarioId, livroId);
            
            if (!successDelete) {
                throw new NotFoundError("Item não encontrado no carrinho para remoção.");
            }
            
            return success(200, new BasicResponseDto("Item removido do carrinho com sucesso.", undefined));
        } catch (err: any) {
            if (err instanceof NotFoundError) return fail(404, new BasicResponseDto(err.message, undefined));
            
            return fail(500, new BasicResponseDto("Erro interno ao remover item.", undefined));
        }
    }
}