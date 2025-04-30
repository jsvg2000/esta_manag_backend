import { Controller, Get, Post, Body, Patch, Param, Delete,Query, UseGuards,Req  } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { MerchantEntity } from './entities/merchant.entity';
import { ApiCreatedResponse,ApiQuery,ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { UpdateMerchantStateDto } from './dto/update-state.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.interface';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';


@Controller('merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Post()
  @Roles([1])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @ApiCreatedResponse({type:MerchantEntity})
  create(@Req() req:AuthenticatedRequest,@Body() createMerchantDto: CreateMerchantDto) {
    req.user;
    return this.merchantsService.create(createMerchantDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({type:MerchantEntity, isArray:true})
  @ApiQuery({name:'businessName', required: false})
  @ApiQuery({name:'registrationDate', required: false})
  @ApiQuery({name:'stateId', required: false})
  findAll(
    @Query('page') page:string,
    @Query('limit') limit:string,  
    @Query('businessName') businessName?: string,
    @Query('registrationDate') registrationDate?: string,
    @Query('stateId') stateId?: string,
  ){

    const pag:number = parseInt(page) || 1;
    const lim:number = parseInt(limit) || 5;
    
    return this.merchantsService.findAll(pag,lim,{
      businessName:businessName ? String(businessName): undefined,
      registrationDate: registrationDate ? new Date(registrationDate) : undefined,
      stateId: stateId ? Number(stateId) : undefined,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({type:MerchantEntity})
  findOne(@Param('id') id: string) {
    return this.merchantsService.findOne(+id);
  }

  @Patch(':id')
  @Roles([1])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @ApiCreatedResponse({type:MerchantEntity})
  update(@Param('id') id: string, @Body() updateMerchantDto: UpdateMerchantDto) {
    return this.merchantsService.update(+id, updateMerchantDto);
  }

  @Delete(':id')
  @Roles([1])
  @UseGuards(JwtAuthGuard,RolesGuard)
  @ApiCreatedResponse({type:MerchantEntity})
  remove(@Param('id') id: string) {
    return this.merchantsService.remove(+id);
  }


  @Patch('/update-state/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'ID del comerciante', type: Number })
  @ApiOkResponse({ type: MerchantEntity, description: 'Estado actualizado con éxito' })
  updateState(@Param('id') id: string,
    @Body() updateStateDto: UpdateMerchantStateDto
  ) {
    return this.merchantsService.updateState(+id, updateStateDto.stateId);
  }

}
