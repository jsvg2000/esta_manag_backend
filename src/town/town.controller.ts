import { Controller, Get ,UseGuards   } from '@nestjs/common';
import { TownService } from './town.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@Controller('town')
export class TownController {
    constructor(private readonly municipiosService: TownService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getMunicipios() {
      return this.municipiosService.obtenerMunicipios();
    }
}
