
import express, { Request, Response, Router } from 'express';
import { ClienteService } from '../service/ClienteService';
import { AnomaliaService } from '../service/AnomaliaService';
import { IAnomalia } from '../interfaces/IAnomalia';

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

                res.status(500).json({ error: 'Erro ao buscar clientes' });
            }
        });


    /**
     * @swagger
     * /api/anomalia/evolucaoAnomalias:
     *   post:
     *     summary: Retorna a evolução das anomalias, podendo ser 'hoje', 'ultimosTrintaDias' ou 'horaria'
     *     tags:
     *       - Evolução Anomalias
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               ultimas24horas:
     *                  type: boolean
     *                  example: false
     *               ultimos30Dias:
     *                  type: boolean
     *                  example: false
     *               ultimos365Dias:
     *                 type: boolean
     *                 example: true
     *     responses:
     *       200:
     *         description: Lista de anomalias
     */
        this.router.post('/anomalia/evolucaoAnomalias', async (req: Request, res: Response) => {
            try {

                let { ultimas24horas, ultimos30Dias, ultimos365Dias } = req.body;

                let anomalias:IAnomalia[];

                if(ultimas24horas){
                    anomalias = await this.anomaliaService.EvolucaoAnomalias('horaria');

                }else if(ultimos30Dias){
                    anomalias = await this.anomaliaService.EvolucaoAnomalias('diaria');

                }else{
                    anomalias = await this.anomaliaService.EvolucaoAnomalias('mensal');
                }


                if (anomalias) {
                    res.json(anomalias);
                } else {
                    res.status(404).json({ message: 'anomalias não encontrados' });
                }
            } catch (error) {

                res.status(500).json({ error: 'Erro ao buscar clientes' });
            }
        });



        /**
         * @swagger
         * /api/anomalia/horarioMaiorIncidencia:
         *   get:
         *     summary: Top 10 horários de maior incidência de alertas e seus tipos
         *     tags:
         *       - Top 10 horários de maior incidência
         *     responses:
         *       200:
         *         description: Busca top 10 horários de maior incidência
         */
        this.router.get('/anomalia/horarioMaiorIncidencia', async (req: Request, res: Response) => {
            try {

                let anomalias = await this.anomaliaService.MaiorHorarioIncidencia();
                res.status(200).json(anomalias);
            } catch (error) {
                
                res.status(500).json({ error: 'Erro ao buscar' });
            }
        });

    }

    public getRouter(): Router {
        return this.router;
    }
}