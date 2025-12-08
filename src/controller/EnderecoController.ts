import { Controller, Route, Tags, Post, Body, Res, TsoaResponse, Get, Path, Put, Delete } from "tsoa";
import { EnderecoService } from "../service/EnderecoService";
import { EnderecoRequestDto } from "../model/dto/EnderecoRequestDto";
import { EnderecoResponseDto } from "../model/dto/EnderecoResponseDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { NotFoundError, ValidationError } from '../utils/errors';

type FailResponse = TsoaResponse<400 | 404 | 500, BasicResponseDto>;

@Route("endereco")
@Tags("Endereco")
export class EnderecoController extends Controller {
    private enderecoService = new EnderecoService();

    @Post()
    public async criarEndereco(
        @Body() dto: EnderecoRequestDto,
        @Res() fail: FailResponse,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const novoEndereco = await this.enderecoService.criarEndereco(dto);
            return success(201, new BasicResponseDto("Endereço criado com sucesso!", novoEndereco));
        } catch (err: any) {
            if (err instanceof NotFoundError) return fail(404, new BasicResponseDto(err.message, undefined));
            if (err instanceof ValidationError) return fail(400, new BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto("Erro interno ao criar endereço.", undefined));
        }
    }

    @Get("usuario/{usuarioId}")
    public async listarEnderecosDoUsuario(
        @Path() usuarioId: number,
        @Res() fail: FailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const enderecos = await this.enderecoService.listarEnderecosPorUsuario(usuarioId);
            return success(200, new BasicResponseDto("Endereços encontrados", enderecos));
        } catch (err: any) {
            if (err instanceof NotFoundError) return fail(404, new BasicResponseDto(err.message, undefined));
            if (err instanceof ValidationError) return fail(400, new BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto("Erro interno ao buscar endereços.", undefined));
        }
    }

    @Get("{id}")
    public async obterEndereco(
        @Path() id: number,
        @Res() fail: FailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const endereco = await this.enderecoService.buscarEnderecoPorId(id);
            return success(200, new BasicResponseDto("Endereço encontrado", endereco));
        } catch (err: any) {
            if (err instanceof NotFoundError) return fail(404, new BasicResponseDto(err.message, undefined));
            if (err instanceof ValidationError) return fail(400, new BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto("Erro interno.", undefined));
        }
    }

    @Put("{id}")
    public async atualizarEndereco(
        @Path() id: number,
        @Body() dto: Partial<EnderecoRequestDto>,
        @Res() fail: FailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const atualizado = await this.enderecoService.atualizarEndereco(id, dto);
            return success(200, new BasicResponseDto("Endereço atualizado com sucesso!", atualizado));
        } catch (err: any) {
            if (err instanceof NotFoundError) return fail(404, new BasicResponseDto(err.message, undefined));
            if (err instanceof ValidationError) return fail(400, new BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto("Erro interno.", undefined));
        }
    }

    @Delete("{id}")
    public async deletarEndereco(
        @Path() id: number,
        @Res() fail: FailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            await this.enderecoService.removerEndereco(id);
            return success(200, new BasicResponseDto("Endereço removido com sucesso.", undefined));
        } catch (err: any) {
            if (err instanceof NotFoundError) return fail(404, new BasicResponseDto(err.message, undefined));
            return fail(500, new BasicResponseDto("Erro interno.", undefined));
        }
    }
}