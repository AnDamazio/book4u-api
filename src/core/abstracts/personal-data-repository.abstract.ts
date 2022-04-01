export abstract class IPersonalDataRepository<T> {
  abstract create(personalData: T): Promise<T>;
}
