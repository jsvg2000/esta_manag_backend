import { Module  } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TownService } from './town.service';
import { TownController } from './town.controller';

@Module({
    imports: [
      HttpModule
    ],
    controllers: [TownController],
    providers: [TownService],
  })
export class TownModule {}
