export abstract class ILanguageRepository<T> {
    abstract create(language: T): Promise<T>;
  
    abstract findAll(): Promise<T[]>;

    abstract findOneByName(name: string): Promise<T>

    abstract checkIfExists(name: string): boolean;

  }
  