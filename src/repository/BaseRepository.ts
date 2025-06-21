import { PrismaPromise } from '@prisma/client/runtime/library';
import prisma from '../database/index';


export abstract class BaseRepository<T> {
  protected model: string;
  protected prismaClient: any;

  
  constructor(model: string) {
    this.model = model;
    this.prismaClient = prisma;

  }

  async findAll(): Promise<T[]> {
    return (prisma as any)[this.model].findMany();
  }

  async findById(id: Number, pk_name:string): Promise<T | null> {

    return (prisma as any)[this.model].findUnique({
      where: { [pk_name]: id }
    });
  }

  async create(data: T): Promise<T> {
    return (prisma as any)[this.model].create({ data });
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return (prisma as any)[this.model].update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await (prisma as any)[this.model].delete({ where: { id } });
  }

  async query(operation: string, args?: any): Promise<any> {
    if (operation === 'rawQuery') {

      return prisma.$queryRaw`${args.toString()}`;
    }
    return (prisma as any)[this.model][operation](args);
  }


}