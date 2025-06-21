
import { BaseRepository } from './BaseRepository';
import { IConta } from '../interfaces/IConta';

export class ContaRepository extends BaseRepository<IConta> {
    constructor() {
        super('conta');
    }

    async BuscarTodos(): Promise<IConta[] | null> {
        return this.findAll();
    }

    async BuscarTwoRandom(): Promise<IConta[]> {

        try {

            const contas = this.prismaClient.$queryRaw`
            SELECT ct.id_conta, d.id_dispositivo 
            FROM cliente c 
            JOIN dispositivo d ON d.id_cliente = c.id_cliente 
            JOIN conta ct ON ct.id_cliente = c.id_cliente 
            ORDER BY RANDOM() 
            LIMIT 2
        `;
            
            return contas;
        } catch (err) {
            console.log(err);
            return [];
        }

    }
}