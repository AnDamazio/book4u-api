export abstract class IPersonalDataRepository<T> {
  abstract create(personalData: T): Promise<T>;

  abstract findOneByEmail(email: string): Promise<T>;
}
