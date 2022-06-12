export abstract class IExchangeHistoryRepository<T> {
  abstract create(exchangeHistory): Promise<T>;
}
