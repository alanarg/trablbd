import {Server}  from './server';
import { ClienteRoutes } from './controllers/ClienteController';
import { TransacaoRoutes } from './controllers/TransacaoController';
import { AnomaliaRoutes } from './controllers/AnomaliaController';

export class Index {
    private server: Server;
    private clienteRoutes: ClienteRoutes;
    private transacaoRoutes: TransacaoRoutes;
    private anomaliaRoutes: AnomaliaRoutes;

    constructor() {
        this.server = new Server();
        this.clienteRoutes = new ClienteRoutes();
        this.transacaoRoutes = new TransacaoRoutes();
        this.anomaliaRoutes = new AnomaliaRoutes();
        
        this.server.registerRoutes(this.clienteRoutes);
        this.server.registerRoutes(this.transacaoRoutes);
        this.server.registerRoutes(this.anomaliaRoutes);

        this.startServer();
    }

    private startServer() {
        this.server.runServer();
    }
}

new Index();