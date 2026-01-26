import { EntityManager, ObjectLiteral, Repository } from 'typeorm';

export abstract class TransactionalService<T extends ObjectLiteral> {
  constructor(protected repository: Repository<T>) {}

  protected getRepository(manager?: EntityManager): Repository<T> {
    return manager ? manager.getRepository(this.repository.target) : this.repository;
  }
}
