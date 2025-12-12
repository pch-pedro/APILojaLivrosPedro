import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';
import path from 'path';
import fs from 'fs';

export const setupSwagger = (app: Express) => {
    const swaggerPath = path.join(__dirname, 'swagger.json'); // agora fica junto do arquivo compilado
    const swaggerSpec = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
