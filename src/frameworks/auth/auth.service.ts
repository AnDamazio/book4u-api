import { Injectable } from '@nestjs/common';
import { PersonalDataServices } from 'src/service';

@Injectable()
export class AuthService {
  constructor(private personalDataService: PersonalDataServices) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userData = await this.personalDataService.findByEmail(username);
    if (userData && userData.password === pass) {
      const { password, ...result } = userData;
      return result;
    }
    return null;
  }
}
