import { ICliente } from '../interfaces/ICliente';
import { ClienteRepository } from '../repository/ClienteRepositoy';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { TransacaoRepository } from '../repository/TransacaoRepository';
import { ContaRepository } from '../repository/ContaRepository';
import { tipo_contas, limites_norturno, tipos_dispositivo, sistemas_op } from '../utils/constDetails';
import { create } from 'domain';
import { AnomaliaRepository } from '../repository/AnomaliaRepository';


export class AnomaliaService {
    private clienteReposiotry: ClienteRepository;
    private anomaliaRepository: AnomaliaRepository;

    constructor() {
        this.clienteReposiotry = new ClienteRepository();
        this.anomaliaRepository = new AnomaliaRepository();
    }

    public async BuscarTodos() {
        return this.anomaliaRepository.BuscarTodos();
    }

    public async Top10ClientesAnomalias() {
        try {
            let clientes = await this.anomaliaRepository.Top10ClientesComTransacoesSuspeitas();

            return clientes;

        } catch (err) {
            console.log(err);

        }
    }

    public async MaiorHorarioIncidencia() {
        try {

            let result =  await this.anomaliaRepository.HorarioMaiorIncidencia();

            return result;
            

        } catch (err) {
            console.log(err);
            
            throw new Error("Operação falhou!")
        }
    }

    public async EvolucaoAnomalias(tipo: 'diaria' | 'horaria' | 'mensal') {
        try {
            let qtdAnomalias;

            switch (tipo) {
                case 'diaria':
                    qtdAnomalias = await this.anomaliaRepository.AnomaliasPorDia();
                    break;
                case 'horaria':
                    qtdAnomalias = await this.anomaliaRepository.AnomaliasPorHorario();
                    break;

                case 'mensal':
                    qtdAnomalias = await this.anomaliaRepository.AnomaliasPorMes();
                    break;

            }

            return qtdAnomalias;
        } catch (error) {
            throw new Error("error");
        }



    }




}