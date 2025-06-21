
import express, { Request, Response, Router } from 'express';
import { ClienteService } from '../service/ClienteService';

export class ClienteRoutes {
    private router: Router;
    private clienteService: ClienteService;

    constructor() {
        this.router = express.Router();
        this.clienteService = new ClienteService();
        this.configureRoutes();
    }

    private configureRoutes() {

          this.router.get('/cliente/getAll', async (req: Request, res: Response) => {
            try {

                const clientes = await this.clienteService.BuscarTodos();

                if (clientes) {
                    res.json(clientes);
                } else {
                    res.status(404).json({ message: 'Clientes não encontrados' });
                }
            } catch (error) {
                res.status(500).json({ error: 'Erro ao buscar clientes' });
            }
        });

         /**
     * @swagger
     * /api/cliente/gerarClientesRandom:
     *   post:
     *     summary: Gera automaticamente 100 clientes, com contas e dispositivos.
     *     tags:
     *       - Geração clientes
     *     responses:
     *       200:
     *         description: Gera 100 clientes
     */

        this.router.post('/cliente/gerarClientesRandom', async (req: Request, res: Response) => {
            try {

                 await this.clienteService.GerarRandom().then(()=>{
                    return res.status(200).json({ message: 'Clientes gerados' });

                 });

                
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