import { ICliente } from '../interfaces/ICliente';
import { ClienteRepository } from '../repository/ClienteRepositoy';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { TransacaoRepository } from '../repository/TransacaoRepository';
import { ContaRepository } from '../repository/ContaRepository';
import {tipo_contas, limites_norturno, tipos_dispositivo, sistemas_op} from '../utils/constDetails';
import { create } from 'domain';


export class ClienteService {
    private clienteReposiotry: ClienteRepository;
    private transacaoRepository: TransacaoRepository;
    private contaRepository: ContaRepository;

    constructor() {
        this.clienteReposiotry = new ClienteRepository();
        this.transacaoRepository = new TransacaoRepository();
        this.contaRepository = new ContaRepository();
    }

    public async BuscarTodos() {
        return this.clienteReposiotry.BuscarTodos();
    }

    public async GerarRandom() {
        try {
            for (let index = 0; index < 100; index++) {

                const nome = faker.person.fullName();
                const email = faker.internet.email();
                const telefone = faker.phone.number({ style: 'international' }).substring(0, 10);
                const dataNascimento = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
                const numeroCpf = this.gerarCPFValido();

                let dp = faker.date.past();

                await this.clienteReposiotry.create({
                    nome,
                    email,
                    telefone,
                    data_nasc: dataNascimento,
                    cpf: numeroCpf,
                    conta: {
                        create: {
                            tipo_conta: tipo_contas[Math.floor(Math.random() * tipo_contas.length)],
                            saldo: Math.random() * (20000 - 5000) + 5000,
                            data_criacao: dp,
                            limite_noturno: limites_norturno[Math.floor(Math.random() * limites_norturno.length)]
                        }
                    },
                    dispositivo: {
                        create: {
                            tipo: tipos_dispositivo[Math.floor(Math.random() * tipos_dispositivo.length)],
                            sistema_operacional: sistemas_op[Math.floor(Math.random() * sistemas_op.length)],
                            endereco_ip: faker.internet.ip()
                        }
                    }

                } as ICliente).then((res: any) => {

                })

            }
        } catch (err) {
            console.log(err);

        }
    }

    public gerarCPFValido(): string {
        return faker.helpers.replaceSymbols('###########');
    }


}