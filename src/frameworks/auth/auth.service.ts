import { Injectable } from '@nestjs/common';
import { PersonalDataServices } from 'src/service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private personalDataService: PersonalDataServices) {}

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
}
