import { ModuleRef } from "@nestjs/core";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { PersonalDataServices } from "src/service/use-cases/personal-data";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => PersonalDataServices))
    private personalDataServices: PersonalDataServices
  ) {}

  async validatePassword(pass: string, passHash: string) {
    return bcrypt.compareSync(pass, passHash);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const userData = await this.personalDataServices.findUserDataByEmail(
      username
    );

    if (userData && (await this.validatePassword(pass, userData.password))) {
      const { password, ...result } = userData;
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    const personalDataFound = await this.personalDataServices.findByEmail(
      user.email
    );
    const id = await this.personalDataServices.getIdFromPersonalData(
      personalDataFound
    );
    personalDataFound.token = token;
    await this.personalDataServices.insertToken(Number(id), personalDataFound);
    await this.personalDataServices.refreshToken(token);
    return {
      access_token: token,
    };
  }
}
