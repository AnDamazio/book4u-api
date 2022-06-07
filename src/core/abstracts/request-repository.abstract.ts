export abstract class IRequestRepository<T> {
  abstract create(request: T): Promise<T>;

  abstract findAllRequest(id: string): Promise<T[]>;

  abstract deleteRequest(id: string): Promise<any>;
}
