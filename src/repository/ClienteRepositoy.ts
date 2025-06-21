import { cliente } from '../generated/prisma/index';
import { ICliente } from '../interfaces/ICliente';
import { BaseRepository } from './BaseRepository';

export class ClienteRepository extends BaseRepository<ICliente> {
  constructor() {
    super('cliente');
  }

  async BuscarTodos(): Promise<ICliente[] | null> {
    return this.findAll();
  }
}