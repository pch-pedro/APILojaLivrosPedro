"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const UsuarioController_1 = require("./../controller/UsuarioController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const LivroController_1 = require("./../controller/LivroController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CategoriaController_1 = require("./../controller/CategoriaController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "TipoUsuario": {
        "dataType": "refEnum",
        "enums": ["CLIENTE", "ADMIN"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsuarioRequestDto": {
        "dataType": "refObject",
        "properties": {
            "nome": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "senha_hash": { "dataType": "string", "required": true },
            "telefone": { "dataType": "string", "required": true },
            "tipo_usuario": { "ref": "TipoUsuario", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "object": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "categoria_id": { "dataType": "double", "required": true },
            "titulo": { "dataType": "string", "required": true },
            "autor": { "dataType": "string", "required": true },
            "isbn": { "dataType": "string", "required": true },
            "preco": { "dataType": "double", "required": true },
            "estoque": { "dataType": "double", "required": true },
            "sinopse": { "dataType": "string", "required": true },
            "imageURL": { "dataType": "string", "required": true },
            "editora": { "dataType": "string", "required": true },
            "data_publicacao": { "dataType": "datetime", "required": true },
            "promocao": { "dataType": "boolean", "default": false },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoriaDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "titulo": { "dataType": "string", "required": true },
            "nome": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsUsuarioController_criarUsuario = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioRequestDto" },
        fail: { "in": "res", "name": "500", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/usuario', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.criarUsuario)), async function UsuarioController_criarUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_criarUsuario, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'criarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_buscarUsuario = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "500", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/usuario/:id', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.buscarUsuario)), async function UsuarioController_buscarUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_buscarUsuario, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'buscarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_atualizarUsuario = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioRequestDto" },
        fail: { "in": "res", "name": "500", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/usuario/:id', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.atualizarUsuario)), async function UsuarioController_atualizarUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizarUsuario, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'atualizarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_removerUsuario = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "500", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/usuario/:id', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.removerUsuario)), async function UsuarioController_removerUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_removerUsuario, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'removerUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_criarLivro = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/livro', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.criarLivro)), async function LivroController_criarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_criarLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'criarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_listarLivros = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "202", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/livro', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.listarLivros)), async function LivroController_listarLivros(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_listarLivros, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'listarLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_filtrarLivro = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/livro/:id', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.filtrarLivro)), async function LivroController_filtrarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_filtrarLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'filtrarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_atualizarLivro = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/livro/:id', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.atualizarLivro)), async function LivroController_atualizarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_atualizarLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'atualizarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_removerLivro = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/livro/:id', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.removerLivro)), async function LivroController_removerLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_removerLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'removerLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoriaController_novaCategoria = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "CategoriaDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/categoria', ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController.prototype.novaCategoria)), async function CategoriaController_novaCategoria(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaController_novaCategoria, request, response });
            const controller = new CategoriaController_1.CategoriaController();
            await templateService.apiHandler({
                methodName: 'novaCategoria',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoriaController_listarCategoria = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "202", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/categoria', ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController.prototype.listarCategoria)), async function CategoriaController_listarCategoria(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaController_listarCategoria, request, response });
            const controller = new CategoriaController_1.CategoriaController();
            await templateService.apiHandler({
                methodName: 'listarCategoria',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoriaController_listarCategoriaPorId = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/categoria/:id', ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController.prototype.listarCategoriaPorId)), async function CategoriaController_listarCategoriaPorId(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaController_listarCategoriaPorId, request, response });
            const controller = new CategoriaController_1.CategoriaController();
            await templateService.apiHandler({
                methodName: 'listarCategoriaPorId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoriaController_atualizaCategoria = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "CategoriaDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/categoria/:id', ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController.prototype.atualizaCategoria)), async function CategoriaController_atualizaCategoria(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaController_atualizaCategoria, request, response });
            const controller = new CategoriaController_1.CategoriaController();
            await templateService.apiHandler({
                methodName: 'atualizaCategoria',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoriaController_removeCategoria = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/categoria/:id', ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController.prototype.removeCategoria)), async function CategoriaController_removeCategoria(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaController_removeCategoria, request, response });
            const controller = new CategoriaController_1.CategoriaController();
            await templateService.apiHandler({
                methodName: 'removeCategoria',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
