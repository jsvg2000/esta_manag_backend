import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MerchantEntity {
    @ApiProperty({ description: 'ID del comerciante' })
    id: number;
  
    @ApiProperty({ description: 'Nombre o razón social del comerciante' })
    businessName: string;
  
    @ApiProperty({ description: 'Municipio donde opera el comerciante' })
    municipality: string;
  
    @ApiPropertyOptional({ description: 'Teléfono del comerciante (opcional)' })
    phone?: string;
  
    @ApiPropertyOptional({ description: 'Correo electrónico del comerciante (opcional)' })
    email?: string;
  
    @ApiProperty({ description: 'Fecha de registro del comerciante', type: String, format: 'date-time' })
    registrationDate: Date;
  
    @ApiProperty({ description: 'ID del estado actual del comerciante' })
    stateId: number;
  
    @ApiProperty({ description: 'Fecha de última actualización', type: String, format: 'date-time' })
    lastUpdated: Date;
  
    @ApiPropertyOptional({ description: 'ID del usuario que actualizó por última vez (opcional)' })
    updatedByUserId?: number;
  }