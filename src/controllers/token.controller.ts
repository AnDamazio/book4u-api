import { AuthService } from 'src/frameworks/auth/auth.service';
import { Body, Controller, Put } from "@nestjs/common";
import { RefreshTokenDto } from "src/core/dtos/refresh-token.dto";
import { PersonalDataServices } from "src/service/use-cases/personal-data";

@Controller('token')
export class TokenController {
    constructor(
        private personalDataServices: PersonalDataServices,
        private authService: AuthService
    ) { }

    @Put('refresh')
    async refreshToken(@Body() oldToken: RefreshTokenDto['token']) {
        try {
             const user = await this.personalDataServices.refreshToken(oldToken)
             return await this.authService.login(user)
        } catch (error) {
            return error.message
        }
    }
}