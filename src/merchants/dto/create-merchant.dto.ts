import { IsString, IsOptional, IsEmail, IsInt, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMerchantDto {
  @ApiProperty({ description: 'Nombre del negocio' })
  @IsString()
  businessName: string;

  @ApiProperty({ description: 'Municipio donde opera el negocio' })
  @IsString()
  municipality: string;

  @ApiPropertyOptional({ description: 'Número telefónico del negocio' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico del negocio' })
  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  email?: string;

  @ApiProperty({ description: 'Fecha de registro del comerciante', type: String, format: 'date-time' })
  @Type(() => Date)
  @IsDate()
  registrationDate: Date;

  @ApiProperty({ description: 'ID del estado del comerciante (relación con MerchantState)' })
  @IsInt()
  stateId: number;
}
