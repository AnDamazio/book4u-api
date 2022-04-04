import { Module } from '@nestjs/common';
import { UserServicesModule } from 'src/service/use-cases/user/user-services.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { PersonalDataServicesModule } from 'src/service/use-cases/personal-data/personal-data-service.module';

@Module({
  imports: [UserServicesModule, PassportModule, PersonalDataServicesModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
