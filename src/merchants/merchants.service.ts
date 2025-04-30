import { Injectable } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { unparse } from 'papaparse';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class MerchantsService {

  constructor(private prisma:PrismaService){}

  create(createMerchantDto: CreateMerchantDto) {
    return this.prisma.merchant.create({data:{...createMerchantDto,
      lastUpdated: new Date(),
      updatedByUserId: 1}});
  }

  async findAll(pag:number,lim:number, filters) {
    const skip = (pag - 1) * lim;
    const where: any = {};

    if (filters.businessName) {
      where.businessName = {
        contains: filters.businessName,
        mode: 'insensitive',
      };
    }
  
    if (filters.registrationDate) {
      where.registrationDate = filters.registrationDate;
    }
  
    if (filters.stateId) {
      where.stateId = filters.stateId;
    }

    const [total, data] = await Promise.all([
      this.prisma.merchant.count({ where }),
      this.prisma.merchant.findMany({
        where,
        skip,
        take: lim,
        orderBy: {
          id: 'asc',
        },
        include: {
          state: true,
        },
      }),
    ]);
  
    
    const merchants = data.map(merchant => ({
      id: merchant.id,
      businessName: merchant.businessName,
      registrationDate: merchant.registrationDate,
      state: merchant.state, 
    }));
  
    return {
      data: merchants,
      pag,
      lim,
      totalPaginas: Math.ceil(total / lim),
      totalRegistros: total,
    };
  }

  findOne(id: number) {
    return this.prisma.merchant.findUnique({
      where:{
        id:id
      },
      include: {
        state: true, 
      },
    });
  }

  update(id: number, updateMerchantDto: UpdateMerchantDto) {
    return this.prisma.merchant.update({
      where:{id},
      data:{
        ...updateMerchantDto,
        lastUpdated: new Date(),
        updatedByUserId: 1
      }
    });
  }

  remove(id: number) {
    return this.prisma.merchant.delete({where:{id}});
  }

  updateState(id: number, newStateId: number) {
    return this.prisma.merchant.update({
      where:{id},
      data:{
        stateId: newStateId,
        lastUpdated: new Date(),
        updatedByUserId: 1, 
      }
    });
  }

  async generateCsvActiveMerchants(): Promise<string> {
    const merchants = await this.prisma.merchant.findMany({
      where: { stateId: 1 },
      include: { establishments: true },
    });
  
    const data = merchants.map(c => {
      const cantidadEstablecimientos = c.establishments.length;
      const totalIngresos = c.establishments.reduce(
        (sum, e) => sum.plus(e.revenue),
        new Decimal(0)
      );
      const cantidadEmpleados = c.establishments.reduce((sum, e) => sum + e.numberOfEmployees, 0);
  
      return {
        nombre: c.businessName,
        municipio: c.municipality,
        telefono: c.phone,
        correo: c.email,
        fechaRegistro: c.registrationDate.toISOString().split('T')[0],
        estado: c.stateId === 1 ? 'ACTIVO' : 'INACTIVO',
        cantidadEstablecimientos,
        totalIngresos,
        cantidadEmpleados,
      };
    });
    return unparse(data, {
      delimiter: '|',
      header: true,
    });
  }

}
