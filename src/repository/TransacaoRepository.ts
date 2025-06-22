import { cliente } from '../generated/prisma/index';
import { ITransacao } from '../interfaces/ITransacao';
import { BaseRepository } from './BaseRepository';

export class TransacaoRepository extends BaseRepository<ITransacao> {
  constructor() {
    super('transacao');
  }

  async BuscarTodos(): Promise<ITransacao[] | null> {
    return this.findAll();
  }


}



