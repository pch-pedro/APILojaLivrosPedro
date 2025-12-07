"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// POST /usuarios - criar novo usuário
router.post('/', (req, res) => {
    res.status(201).json({ message: 'Criar usuário - não implementado' });
});
// GET /usuarios - listar usuários
router.get('/', (req, res) => {
    res.json({ message: 'Listar usuários - não implementado' });
});
// GET /usuarios/:id - buscar usuário por id
router.get('/:id', (req, res) => {
    res.json({ message: 'Buscar usuário - não implementado' });
});
// PUT /usuarios/:id - atualizar usuário
router.put('/:id', (req, res) => {
    res.json({ message: 'Atualizar usuário - não implementado' });
});
// DELETE /usuarios/:id - remover usuário
router.delete('/:id', (req, res) => {
    res.json({ message: 'Remover usuário - não implementado' });
});
exports.default = router;
