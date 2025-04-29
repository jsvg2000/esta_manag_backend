// src/merchant/dto/update-merchant-state.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMerchantStateDto {
  @ApiProperty({ description: 'Nuevo ID del estado del comerciante' })
  @IsInt()
  @IsNotEmpty()
  stateId: number;
}