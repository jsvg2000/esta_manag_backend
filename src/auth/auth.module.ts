import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    PrismaModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions:{
        expiresIn: process.env.EXPIRE_TOKEN
      }
    })
  ]
})
export class AuthModule {}
