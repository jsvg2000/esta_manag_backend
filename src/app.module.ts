import { Module } from '@nestjs/common';
import { MerchantsModule } from './merchants/merchants.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports:[MerchantsModule, AuthModule],
    controllers:[],
    providers:[]
})
export class AppModule{}