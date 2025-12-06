import { Router, type Request, type Response } from 'express';

const router = Router();

// POST /usuarios - criar novo usuário
router.post('/', (req: Request, res: Response) => {
    res.status(201).json({ message: 'Criar usuário - não implementado' });
});

// GET /usuarios - listar usuários
router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Listar usuários - não implementado' });
});

// GET /usuarios/:id - buscar usuário por id
router.get('/:id', (req: Request, res: Response) => {
    res.json({ message: 'Buscar usuário - não implementado' });
});

// PUT /usuarios/:id - atualizar usuário
router.put('/:id', (req: Request, res: Response) => {
    res.json({ message: 'Atualizar usuário - não implementado' });
});

// DELETE /usuarios/:id - remover usuário
router.delete('/:id', (req: Request, res: Response) => {
    res.json({ message: 'Remover usuário - não implementado' });
});

export default router;
