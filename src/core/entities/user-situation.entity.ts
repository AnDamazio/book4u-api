import { EnumUserSituation } from "../enums";

export class UserSituation {
    name: keyof typeof EnumUserSituation;
}