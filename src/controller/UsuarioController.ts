import { Controller, Route, Tags, Post, Body, Res, TsoaResponse, Get, Path, Put, Delete } from "tsoa";
import { UsuarioService } from "../service/UsuarioService";
import { UsuarioRequestDto } from "../model/dto/UsuarioRequestDto";
import { UsuarioResponseDto } from "../model/dto/UsuarioResponseDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { NotFoundError, ConflictError, ValidationError } from '../utils/errors'; 
import { UsuarioUpdateDto } from "../model/dto/UsuarioUpdateDto";
type UsuarioFailResponse = TsoaResponse<400 | 404 | 409 | 500, BasicResponseDto>;

const usuarioService = new UsuarioService();

@Route("usuarios")
@Tags("Usuario")
export class UsuarioController extends Controller {

    @Post()
    public async criarUsuario(
        @Body() dto: UsuarioRequestDto,
        @Res() fail: UsuarioFailResponse,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const newUsuarioDto = await usuarioService.criarUsuario(dto);
            return success(201, new BasicResponseDto("Usuário cadastrado com sucesso!", newUsuarioDto));
            
        } catch (err: any) {
            if (err instanceof ValidationError) {
                return fail(400, new BasicResponseDto(err.message, undefined)); 
            }
            if (err instanceof ConflictError) {
                return fail(409, new BasicResponseDto(err.message, undefined));
            }
            return fail(500, new BasicResponseDto("Erro interno do servidor ao criar usuário: " + err.message, undefined));
        }
    }

    @Get()
    public async ListarUsuarios(
        @Res() fail: UsuarioFailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const usuarioDto = await usuarioService.listarUsuarios();
            return success(200, new BasicResponseDto("Usuarios cadastrados no sistema listado com sucesso", usuarioDto));
        }catch(err: any){
            return fail(500, new BasicResponseDto("Erro ao listar usuarios " + err.message, undefined));
        }
    }

    @Get("{id}")
    public async buscarUsuario(
        @Path() id: number,
        @Res() fail: UsuarioFailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto> 
    ): Promise<void> {
        try {
            const userDto = await usuarioService.buscarUsuarioPorId(id);
            return success(200, new BasicResponseDto("Usuário encontrado com sucesso!", userDto));
        } catch (err: any) {
            if (err instanceof NotFoundError) {
                return fail(404, new BasicResponseDto(err.message, undefined)); // 404 Not Found
            }
            return fail(err instanceof ValidationError ? 400 : 500, new BasicResponseDto(err.message, undefined));
        }
    }

    @Put("{id}")
    public async atualizarUsuario(
        @Path() id: number,
        @Body() dto: UsuarioUpdateDto,
        @Res() fail: UsuarioFailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const updatedUserDto = await usuarioService.atualizarUsuario(id, dto);
            return success(200, new BasicResponseDto("Usuário atualizado com sucesso!", updatedUserDto));
        } catch (err: any) {
            if (err instanceof ValidationError) {
                return fail(400, new BasicResponseDto(err.message, undefined));
            }
            if (err instanceof NotFoundError) {
                return fail(404, new BasicResponseDto(err.message, undefined));
            }
            return fail(500, new BasicResponseDto("Erro interno do servidor ao atualizar usuário.", undefined));
        }
    }

    @Delete("{id}")
    public async removerUsuario(
        @Path() id: number,
        @Res() fail: UsuarioFailResponse,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            await usuarioService.removerUsuario(id);
            return success(200, new BasicResponseDto("Usuário removido com sucesso.", undefined));
        } catch (err: any) {
            if (err instanceof NotFoundError) {
                return fail(404, new BasicResponseDto(err.message, undefined));
            }

            return fail(500, new BasicResponseDto("Erro interno do servidor ao remover usuário.", undefined));
        }
    }
}