import { LivroService } from "../service/LivroService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags } from "tsoa";
import type { TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LivroDto } from "../model/dto/LivroDto";

@Route("livro")
@Tags("Livro")
export class LivroController extends Controller{
    livroService = new LivroService();

    @Post()
    async criarLivro(
        @Body() dto: LivroDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void>{
        try{
            dto.isbn = String(dto.isbn);
            const livro = await this.livroService.novoLivro(dto);
            return success(201, new BasicResponseDto("Livro cadastrado com sucesso!", livro));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get()
    async listarLivros(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<202, BasicResponseDto>
    ): Promise<void>{
        try{
            const livros = await this.livroService.listarLivros();
            return success(202, new BasicResponseDto("Livros Cadastrados: ", livros));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get("{id}")
    async filtrarLivro(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<LivroDto>{
        try{
            const livroEncontrado = await this.livroService.filtrarLivro({id});
            return success(200, new BasicResponseDto("Livro encontrado com sucesso!", livroEncontrado));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Put("{id}")
    async atualizarLivro(
        @Path() id: number,
        @Body() dto: LivroDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            dto.id = id;
            const livroAtualizado = await this.livroService.atualizaLivro({
                id: id,
                novosDados: dto
            });

            return success(200, new BasicResponseDto("Livro atualizado com sucesso!", livroAtualizado));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Delete("{id}")
    async removerLivro(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try{
           const livroRemovido = await this.livroService.removeLivro(id);
           return success(200, new BasicResponseDto("Livro Removido com sucesso!", livroRemovido));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

}