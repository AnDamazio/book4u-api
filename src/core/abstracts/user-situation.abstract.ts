export abstract class IUserSituationRepository<T> {
    abstract findAll(): Promise<T[]>

    abstract create(userSituation: T): Promise<T>;

    abstract checkIfExist(situationExist: string): Promise<Boolean>

    abstract findOneByName(nameSituation: string): Promise<T>;

}