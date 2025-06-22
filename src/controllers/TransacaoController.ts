
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
         *                 example: 0
         *               id_conta_destino:
         *                 type: number
         *                 example: 0
         *               id_dispositivo:
         *                 type: number
         *                 example: 0
         *               valor:
         *                 type: number
         *                 example: 100.00
         *               tipo:
         *                 type: string
         *                 example: "PIX"
         *               latitude:
         *                 type: number
         *                 example: 0
         *               longitude:
         *                 type: number
         *                 example: 0
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

                console.log(error);



                let message = error as Error;
                
                res.status(500).send({ error: message.message });
            }
        });




    }

    public getRouter(): Router {
        return this.router;
    }
}