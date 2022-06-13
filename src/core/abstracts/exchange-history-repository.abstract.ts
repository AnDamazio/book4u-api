export abstract class IExchangeHistoryRepository<T> {
  abstract create(exchangeHistory): Promise<T>;
  abstract findOne(userId: number): Promise<any>;
}
