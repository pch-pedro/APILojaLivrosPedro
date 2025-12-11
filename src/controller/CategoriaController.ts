import { CategoriaService } from "../service/CategoriaService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags } from "tsoa";
import type { TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaDto } from "../model/dto/CategoriaDto";

@Route("categorias")
@Tags("Categoria")
export class CategoriaController{
    categoriaService = new CategoriaService();

    @Post()
    async novaCategoria(
        @Body() dto: CategoriaDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void>{
        try{
            const categoria = await this.categoriaService.novaCategoria(dto);
            return success(201, new BasicResponseDto("Categoria cadastrada com sucesso!", categoria));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get()
    async listarCategoria(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<202, BasicResponseDto>
    ): Promise<void>{
        try{
            const categoria = await this.categoriaService.listarCategoria();
            return success(202, new BasicResponseDto("Categorias cadastradas: ", categoria));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Get("{id}")
    async listarCategoriaPorId(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const categoriaEncontrada = await this.categoriaService.listarCategoriaPorId(id);
            return success(200, new BasicResponseDto("Categoria encontrada com sucesso!", categoriaEncontrada));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Put("{id}")
    async atualizaCategoria(
        @Path() id: number,
        @Body() dto: CategoriaDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            dto.id = id;
            const categoriaAtualizada = await this.categoriaService.atualizaCategoria(id, {nome: dto.nome});

            return success(200, new BasicResponseDto("Categoria atualizada com sucesso!", categoriaAtualizada));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }

    @Delete("{id}")
    async removeCategoria(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
           const categoriaRemovida = await this.categoriaService.removeCategoria(id);
           return success(200, new BasicResponseDto("Categoria removida com sucesso!", categoriaRemovida));
        } catch(err: any){
            return fail(400, new BasicResponseDto(err.message, undefined));
        }
    }
}