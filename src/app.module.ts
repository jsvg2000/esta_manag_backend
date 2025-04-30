import { Module  } from '@nestjs/common';
import { MerchantsModule } from './merchants/merchants.module';
import { AuthModule } from './auth/auth.module';
import { TownController } from './town/town.controller';
import { HttpModule } from '@nestjs/axios';
import { TownService } from './town/town.service';
import { TownModule } from './town/town.module';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Module({
    imports:[AuthModule,HttpModule,MerchantsModule, TownModule],
    controllers:[TownController],
    providers:[TownService]
})
export class AppModule{}