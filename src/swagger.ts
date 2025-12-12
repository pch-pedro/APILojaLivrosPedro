import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";
import { Express } from "express";

export function setupSwagger(app: Express) {
    const swaggerPath = path.join(__dirname, "../swagger.json"); // dist/swagger.json
    const swaggerDoc = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}