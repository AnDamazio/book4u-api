export abstract class IPublisherRepository<T> {
  abstract create(publisher: T): Promise<T>;

  abstract findAll(): Promise<T[]>;

  abstract findOneByName(name: string): Promise<T>;

  abstract checkIfExists(name: string): Promise<boolean>;
}
