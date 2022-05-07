import { Injectable } from '@nestjs/common';
import { PersonalDataServices } from 'src/service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private personalDataService: PersonalDataServices,
    private jwtService: JwtService
  ) { }

  async validatePassword(pass: string, passHash: string) {
    return bcrypt.compareSync(pass, passHash);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const userData = await this.personalDataService.findUserDataByEmail(
      username,
    );
    if (userData && await this.validatePassword(pass, userData.password)) {
      const { password, ...result } = userData;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
