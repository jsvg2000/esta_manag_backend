import { Injectable  } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TownService {
    constructor(
        private readonly httpService: HttpService,
    ) {}

    async obtenerMunicipios(): Promise<any[]> {
        const url = 'https://api-colombia.com/api/v1/City';
    
        try {
          const response$ = this.httpService.get(url);
          const response = await lastValueFrom(response$);
          return response.data;
        } catch (error) {
          console.error('Error al obtener municipios:', error);
          throw new Error('No se pudieron obtener los municipios');
        }
      }
}
