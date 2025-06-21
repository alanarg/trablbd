
import express, { Request, Response, Router } from 'express';
import { ClienteService } from '../service/ClienteService';
import { AnomaliaService } from '../service/AnomaliaService';

export class AnomaliaRoutes {
    private router: Router;
    private anomaliaService: AnomaliaService;

    constructor() {
        this.router = express.Router();
        this.anomaliaService = new AnomaliaService();
        this.configureRoutes();
    }

    private configureRoutes() {

        this.router.get('/anomalia/getAll', async (req: Request, res: Response) => {
            try {

                const anomalias = await this.anomaliaService.BuscarTodos();
                console.log(anomalias);

                res.status(200);
            } catch (error) {
                res.status(500).json({ error: 'Erro ao buscar clientes' });
            }
        });
 /**
     * @swagger
     * /api/anomalia/top10ClientesAnomalias:
     *   get:
     *     summary: Retorna o top 10 clientes com mais anomalias
     *     tags:
     *       - Top 10 clientes anomalias
     *     responses:
     *       200:
     *         description: Lista de anomalias
     */

        this.router.get('/anomalia/top10ClientesAnomalias', async (req: Request, res: Response) => {
            try {

                const anomalias = await this.anomaliaService.Top10ClientesAnomalias();

                if (anomalias) {
                    res.json(anomalias);
                } else {
                    res.status(404).json({ message: 'anomalias não encontrados' });
                }
            } catch (error) {
                console.log(error);

                res.status(500).json({ error: 'Erro ao buscar clientes' });
            }
        });


    /**
     * @swagger
     * /api/anomalia/evolucaoAnomalias:
     *   post:
     *     summary: Retorna a evolução das anomalias, podendo ser 'diaria', 'mensal' ou 'horaria'
     *     tags:
     *       - Evolução Anomalias
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               tipo:
     *                 type: string
     *                 example: "mensal"
     *     responses:
     *       200:
     *         description: Lista de anomalias
     */
        this.router.post('/anomalia/evolucaoAnomalias', async (req: Request, res: Response) => {
            try {

                let { tipo } = req.body;
                const anomalias = await this.anomaliaService.EvolucaoAnomalias(tipo);

                if (anomalias) {
                    res.json(anomalias);
                } else {
                    res.status(404).json({ message: 'anomalias não encontrados' });
                }
            } catch (error) {
                console.log(error);

                res.status(500).json({ error: 'Erro ao buscar clientes' });
            }
        });

    }

    public getRouter(): Router {
        return this.router;
    }
}