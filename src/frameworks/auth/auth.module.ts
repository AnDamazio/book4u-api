import { forwardRef, Module } from '@nestjs/common';
import { UserServicesModule } from 'src/service/use-cases/user/user-services.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { PersonalDataServicesModule } from 'src/service/use-cases/personal-data/personal-data-service.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserServicesModule, PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }), forwardRef(() => PersonalDataServicesModule)],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }
