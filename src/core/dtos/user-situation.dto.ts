import { IsEnum, IsString } from "class-validator";
import { EnumUserSituation } from "../enums/user-situation.enum";

export class UserSituationDto {
    @IsEnum(EnumUserSituation)
    @IsString()
    name: keyof typeof EnumUserSituation;
}