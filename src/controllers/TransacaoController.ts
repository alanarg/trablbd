
import express, { Request, Response, Router } from 'express';
import { TransacaoService } from '../service/TransacaoService';
import { ContaRepository } from '../repository/ContaRepository';

export class TransacaoRoutes {
    private router: Router;
    private transacaoService: TransacaoService;
    private contaRepository: ContaRepository;

    constructor() {
        this.router = express.Router();
        this.transacaoService = new TransacaoService();
        this.contaRepository = new ContaRepository();
        this.configureRoutes();
    }

    private configureRoutes() {
        /**
        * @swagger
        * /api/transacao/gerarMilTransacoes:
        *   post:
        *     summary: Gera automaticamente 1000 transações de clientes previamente cadastrados.
        *     tags:
        *       - Geração transações
        *     responses:
        *       200:
        *         description:  Gera automaticamente 1000 transações
        */

        this.router.post('/transacao/gerarMilTransacoes', async (req: Request, res: Response) => {
            try {

                await this.transacaoService.GerarRandom();
                res.status(200).json({ message: 'Transações geradas com sucesso' });
            } catch (error) {
                res.status(500).json({ error: 'Erro ao gerar' });
            }
        });
        /**
         * @swagger
         * /api/transacao/criar:
         *   post:
         *     summary: Criar uma nova transação
         *     tags:
         *       - Transações
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               id_conta_origem:
         *                 type: number
         *                 example: 401
         *               id_conta_destino:
         *                 type: number
         *                 example: 402
         *               id_dispositivo:
         *                 type: number
         *                 example: 301
         *               valor:
         *                 type: number
         *                 example: 10000.00
         *               tipo:
         *                 type: string
         *                 example: "PIX"
         *               data_transacao:
         *                  type: date
         *                  example: "2025-06-22T10:41:21.338Z"
         *               latitude:
         *                 type: string
         *                 example: "-33.433900"
         *               longitude:
         *                 type: string
         *                 example: "149.460900"
         *     responses:
         *       200:
         *         description: Transação criada com sucesso
         */
        this.router.post('/transacao/criar', async (req: Request, res: Response) => {
            try {
                
                let result = await this.transacaoService.CriarTransacao(req.body);

                if (result) {
                    res.status(200).json({ message: `Transações geradas com alertas:${result}` });

                } else {
                    res.status(200).json({ message: `Transações geradas com sucesso` });

                }

            } catch (error) {


                let message = error as Error;
                
                res.status(500).send({ error: message.message });
            }
        });




    }

    public getRouter(): Router {
        return this.router;
    }
}