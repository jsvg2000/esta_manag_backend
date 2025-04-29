import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MerchantsModule } from './merchants/merchants.module';

@Module({
  imports: [PrismaModule, MerchantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
