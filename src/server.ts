
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';


export class Server {
    public app: Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '3000');
        this.configureMiddleware();
    }

    private configureMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
       this. app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
    


    public registerRoutes(routes: any) {
        this.app.use('/api', routes.getRouter());
    }

    public runServer() {
        this.app.listen(this.port, () => {
            console.log(`Servidor rodando em http://localhost:${this.port}`);
        });
    }
}