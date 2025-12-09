import { Controller, Route, Tags, Post, Body, Res, TsoaResponse, Get, Path, Put } from "tsoa";

// Importações dos DTOs e Service
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { PedidoRequestDto } from "../model/dto/PedidoRequestDto";
import { PedidoResponseDto } from "../model/dto/PedidoResponseDto";
import { PedidoStatus } from "../enums/PedidoStatus";
import { PedidoService } from "../service/PedidoService";
import { NotFoundError, ValidationError, ConflictError } from '../utils/errors'; 

type PedidoFailResponse = TsoaResponse<400 | 404 | 409 | 500, BasicResponseDto>;

const pedidoService = new PedidoService(); 

@Route("pedidos")
@Tags("Pedido")
export class PedidoController extends Controller {

    @Post()
    public async criarPedido(
        @Body() dto: PedidoRequestDto,
        @Res() fail: PedidoFailResponse, 
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const novoPedidoDto = await pedidoService.criarPedido(dto);
            return success(201, new BasicResponseDto("Pedido realizado com sucesso!", novoPedidoDto));
            
        } catch (err: any) {
            if (err instanceof NotFoundError) {
                return fail(404, new BasicResponseDto(err.message, undefined)); 
            }
            if (err instanceof ValidationError) {
                return fail(400, new BasicResponseDto(err.message, undefined)); 
            }
            if (err instanceof ConflictError) {
                return fail(409, new BasicResponseDto(err.message, undefined));
            }
            
            return fail(500, new BasicResponseDto(`Erro interno do servidor: ${err.message}`, undefined));
        }
    }

    @Get("{id}")
    public async buscarPedidoPorId(
        @Path() id: number,
        @Res() fail: PedidoFailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pedidoDto = await pedidoService.buscarPedidoPorId(id);
            
            return success(200, new BasicResponseDto("Pedido encontrado com sucesso!", pedidoDto));
        } catch (err: any) {
            if (err instanceof NotFoundError) {
                return fail(404, new BasicResponseDto(err.message, undefined)); 
            }
            if (err instanceof ValidationError) {
                return fail(400, new BasicResponseDto(err.message, undefined)); 
            }
            
            return fail(500, new BasicResponseDto("Erro interno do servidor ao buscar pedido.", undefined));
        }
    }
    
    @Get("usuario/{usuarioId}")
    public async listarPedidosPorUsuario(
        @Path() usuarioId: number,
        @Res() fail: PedidoFailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pedidos = await pedidoService.listarPedidosPorUsuario(usuarioId);
            
            return success(200, new BasicResponseDto("Histórico de pedidos listado com sucesso!", pedidos));
        } catch (err: any) {
            if (err instanceof NotFoundError) {
                return fail(404, new BasicResponseDto(err.message, undefined)); 
            }
            if (err instanceof ValidationError) {
                return fail(400, new BasicResponseDto(err.message, undefined)); 
            }
            
            return fail(500, new BasicResponseDto("Erro interno do servidor ao listar pedidos.", undefined));
        }
    }

    @Put("{id}/status")
    public async atualizarStatusPedido(
        @Path() id: number,
        @Body() body: { status: PedidoStatus },
        @Res() fail: PedidoFailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const updatedPedido = await pedidoService.atualizarPedidoStatus(id, body.status);

            return success(200, new BasicResponseDto(`Status do pedido ${id} atualizado para ${body.status}`, updatedPedido));
        } catch (err: any) {
            if (err instanceof NotFoundError) {
                return fail(404, new BasicResponseDto(err.message, undefined));
            }
            if (err instanceof ValidationError) {
                return fail(400, new BasicResponseDto(err.message, undefined));
            }
            
            return fail(500, new BasicResponseDto("Erro interno do servidor ao atualizar status.", undefined));
        }
    }
}