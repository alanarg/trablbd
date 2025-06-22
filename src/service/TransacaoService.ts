import { ClienteRepository } from '../repository/ClienteRepositoy';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { TransacaoRepository } from '../repository/TransacaoRepository';
import { ContaRepository } from '../repository/ContaRepository';
import { tipos_transacao } from '../utils/constDetails';
import { IConta } from '../interfaces/IConta';
import { ITransacao } from '../interfaces/ITransacao';
import { AnomaliaRepository } from '../repository/AnomaliaRepository';
import { IAnomalia } from '../interfaces/IAnomalia';



export class TransacaoService {
    private clienteReposiotry: ClienteRepository;
    private transacaoRepository: TransacaoRepository;
    private contaRepository: ContaRepository;
    private anomaliaRepository: AnomaliaRepository;

    constructor() {
        this.clienteReposiotry = new ClienteRepository();
        this.transacaoRepository = new TransacaoRepository();
        this.contaRepository = new ContaRepository();
        this.anomaliaRepository = new AnomaliaRepository();
    }

    public async BuscarTodos() {
        return this.clienteReposiotry.BuscarTodos();
    }

    public async GerarRandom() {
        try {
            for (let index = 0; index < 1000; index++) {
                const contas = await this.contaRepository.BuscarTwoRandom();

                if (contas.length < 2 || contas[0].id_conta === contas[1].id_conta) continue;

                const contaOrigem = contas[0].id_conta;
                const contaDestino = contas[1].id_conta;
                const valorTransacao = (Math.random() * (1000 - 10) + 10).toFixed(2);
                const dispositivo = contas[0].id_dispositivo;

                let transacaoValida = await this.validaSaldo(contaOrigem, parseFloat(valorTransacao));

                if (transacaoValida) {
                    this.transacaoRepository.create({
                        conta_transacao_id_conta_origemToconta: { connect: { id_conta: contaOrigem } },
                        conta_transacao_id_conta_destinoToconta: { connect: { id_conta: contaDestino } },
                        dispositivo: { connect: { id_dispositivo: dispositivo } },
                        valor: parseFloat(valorTransacao),
                        tipo: tipos_transacao[Math.floor(Math.random() * tipos_transacao.length)],
                        latitude: faker.location.latitude(),
                        longitude: faker.location.longitude(),
                        data_transacao: this.randomDate( new Date('2024-01-01'), new Date('2025-06-01'))
                    })
                }


            }

        } catch (error) {
            console.log(error);

        }

    }

    public async validaSaldo(contaID: Number, valorTransacao: Number): Promise<Boolean> {
        const conta: IConta | null = await this.contaRepository.findById(contaID, 'id_conta');

        if (!!conta && conta.saldo >= valorTransacao) {
            return true;
        } else {
            return false;
        }

    }


    async CriarTransacao(transacao: ITransacao): Promise<String | undefined> {
        try {
            let TResult;

            let transacaoValida = await this.validaSaldo(transacao.id_conta_origem as Number, transacao.valor as Number);

            let dataAtual = new Date();

            if (transacaoValida) {
                TResult = await this.transacaoRepository.create({
                    conta_transacao_id_conta_origemToconta: { connect: { id_conta: transacao.id_conta_origem } },
                    conta_transacao_id_conta_destinoToconta: { connect: { id_conta: transacao.id_conta_destino } },
                    dispositivo: { connect: { id_dispositivo: transacao.id_dispositivo } },
                    valor: transacao.valor,
                    tipo: transacao.tipo,
                    latitude: transacao.latitude,
                    longitude: transacao.longitude,
                    data_transacao: transacao.data_transacao
                })

            } else {
                throw new Error("Saldo insuficiente para a transação!");
            }

            let alerta = await this.AnomaliaGerada(TResult);

            return alerta?.descricao;


        } catch (err) {

            throw new Error("A transação excede o limite noturno!");

        }



    }

    public async AnomaliaGerada(transacao: ITransacao) {

        let anomaliasGeradas: IAnomalia[] = await this.anomaliaRepository
            .AnomaliasPorConta(transacao.id_transacao as number);

        return anomaliasGeradas[0];

        // let dataHoraAtual = new Date();
        // dataHoraAtual.setHours(dataHoraAtual.getHours() - 4)
        // dataHoraAtual.setMinutes(dataHoraAtual.getMinutes() - 5);


        // if (new Date(ultimoAlerta.data_alerta as Date) >= dataHoraAtual) {

        //     return ultimoAlerta;
        // }



    }

    public randomDate(start: Date, end: Date): Date {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    public gerarCPFValido(): string {
    return faker.helpers.replaceSymbols('###########');
    }


}