import { cliente } from '../generated/prisma/index';
import { IAnomalia } from '../interfaces/IAnomalia';
import { ICliente } from '../interfaces/ICliente';
import { BaseRepository } from './BaseRepository';

export class AnomaliaRepository extends BaseRepository<IAnomalia> {
    constructor() {
        super('alerta_anomalia');
    }

    async BuscarTodos(): Promise<IAnomalia[] | null> {
        return this.findAll();
    }

    async Top10ClientesComTransacoesSuspeitas() {
        try {
            const resultados = await this.prismaClient.$queryRaw`
                 SELECT cl.nome,
                    count(a.id_alerta) AS total_anomalias
                FROM alerta_anomalia a
                    JOIN transacao t ON t.id_transacao = a.id_transacao
                    JOIN conta ct ON ct.id_conta = t.id_conta_origem
                    JOIN cliente cl ON cl.id_cliente = ct.id_cliente
                GROUP BY cl.nome
                ORDER BY (count(a.id_alerta)) DESC
                LIMIT 10;
                `;
            const top10 = resultados.map((row: any) => ({
                ...row,
                total_anomalias: Number(row.total_anomalias)
            }));
            return top10;
        } catch (err) {
            console.log(err);

        }


    }

    async AnomaliasPorConta(contaID: number): Promise<IAnomalia[]> {


        try {
            const alertas = await this.prismaClient.$queryRaw`
                    SELECT a.* 
                    FROM alerta_anomalia a
                    JOIN transacao t ON a.id_transacao = t.id_transacao
                    WHERE t.id_conta_origem = ${contaID}
                    ORDER BY a.data_alerta DESC
                    `;


            return alertas;


        } catch (err) {

            return [];

        }
    }

    async AnomaliasPorHorario() {
        try {
            const alertas = await this.prismaClient.$queryRaw`
                SELECT 
                DATE_TRUNC('hour', t.data_transacao) as hora,
                COUNT(*) as total_alertas
                FROM alerta_anomalia aa JOIN transacao t ON aa.id_transacao = t.id_transacao
                WHERE t.data_transacao >= NOW() - INTERVAL '24 hours'
                GROUP BY hora
                ORDER BY hora ASC
                    `;

            return alertas.map((row: any) => ({
                ...row,
                total_alertas: Number(row.total_alertas)
            }));


        } catch (err) {

            return [];

        }

    }

    async AnomaliasPorDia() {
        try {
            const alertas = await this.prismaClient.$queryRaw`
                SELECT 
                DATE_TRUNC('day',t.data_transacao) as dia,
                COUNT(*) as total_alertas
                FROM alerta_anomalia  aa JOIN transacao t ON aa.id_transacao = t.id_transacao
                WHERE t.data_transacao >= NOW() - INTERVAL '30 days'
                GROUP BY dia
                ORDER BY dia ASC
                    `;


            return alertas.map((row: any) => ({
                ...row,
                total_alertas: Number(row.total_alertas)
            }));


        } catch (err) {

            return [];

        }
    }

    async AnomaliasPorMes() {
        try {
            const alertas = await this.prismaClient.$queryRaw`
                SELECT 
                DATE_TRUNC('month', t.data_transacao) as mes,
                    COUNT(*) as total_alertas
                    FROM alerta_anomalia aa JOIN transacao t ON aa.id_transacao = t.id_transacao
                    WHERE t.data_transacao >= NOW() - INTERVAL '1 year'
                    GROUP BY mes
                ORDER BY mes ASC
                    `;


            return alertas.map((row: any) => ({
                ...row,
                total_alertas: Number(row.total_alertas)
            }));


        } catch (err) {

            return [];

        }

    }


    async HorarioMaiorIncidencia() {
        try {
            const alertas = await this.prismaClient.$queryRaw`
               SELECT 
              EXTRACT(HOUR FROM t.data_transacao) AS hora,
              COUNT(*) AS total_transacoes,
              aa.tipo_anomalia
            FROM alerta_anomalia aa JOIN transacao t ON aa.id_transacao = t.id_transacao
            GROUP BY hora, aa.tipo_anomalia
            ORDER BY total_transacoes DESC LIMIT 10;
                    `;
            
            return alertas.map((row: any) => ({
              ...row,
              total_transacoes: Number(row.total_transacoes)
            }));


        } catch (err) {
            console.log(err);
            
            return [];

        }

    }





}