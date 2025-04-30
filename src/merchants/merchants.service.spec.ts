import { Test, TestingModule } from '@nestjs/testing';
import { MerchantsService } from './merchants.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MerchantsService', () => {
  let service: MerchantsService;
  let prisma: PrismaService;

  const mockPrisma = {
    merchant: {
      create: jest.fn().mockResolvedValue({
        id: 1,
        businessName: 'Test Merchant',
        registrationDate: new Date(),
        lastUpdated: new Date(),
        updatedByUserId: 1,
      }),
      findMany: jest.fn().mockResolvedValue([{ id: 1, businessName: 'Test Merchant', registrationDate: new Date() }]),
      findUnique: jest.fn().mockResolvedValue({ id: 1, businessName: 'Test Merchant', registrationDate: new Date() }),
      update: jest.fn().mockResolvedValue({
        id: 1,
        businessName: 'Updated Merchant',
        registrationDate: new Date(),
        lastUpdated: new Date(),
        updatedByUserId: 1,
      }),
      delete: jest.fn().mockResolvedValue({ id: 1 }),
      count: jest.fn().mockResolvedValue(1), 
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MerchantsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<MerchantsService>(MerchantsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a merchant', async () => {
    const dto = { name: 'Test Merchant' };
    const result = await service.create(dto as any);
    
    expect(result).toEqual({
      id: 1,
      businessName: 'Test Merchant',
      registrationDate: expect.any(Date),
      lastUpdated: expect.any(Date), 
      updatedByUserId: 1, 
    });
    
    expect(prisma.merchant.create).toHaveBeenCalledWith({
      data: {
        name: 'Test Merchant',
        lastUpdated: expect.any(Date),  
        updatedByUserId: 1,          
      },
    });
  });

  it('should return all merchants', async () => {
    const result = await service.findAll(1, 10, {});
  
    expect(result).toEqual({
      data: [
        {
          id: 1,
          businessName: 'Test Merchant',
          registrationDate: expect.any(Date), // Aseguramos que sea un valor de tipo Date
          state: { id: 1, name: 'Active' }, // Aseguramos que 'state' esté presente
        },
      ],
      lim: 10,
      pag: 1,
      totalPaginas: 1,
    });
  
    expect(prisma.merchant.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      where: {},
      include: { state: true },
    });
  });
  

  it('should return a single merchant', async () => {
    const result = await service.findOne(1);
  
    expect(result).toEqual({
      id: 1,
      businessName: 'Test Merchant',
      registrationDate: expect.any(Date),
      state: { id: 1, name: 'Active' }, // Aseguramos que 'state' esté presente
    });
  
    expect(prisma.merchant.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { state: true }, // Incluimos 'state'
    });
  });
  

  it('should update a merchant', async () => {
    const dto = { name: 'Updated Merchant' };
    const result = await service.update(1, dto as any);
    
    expect(result).toEqual({
      id: 1,
      businessName: 'Updated Merchant',
      registrationDate: expect.any(Date),
      lastUpdated: expect.any(Date),
      updatedByUserId: 1,
    });
    
    expect(prisma.merchant.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        name: 'Updated Merchant',
        lastUpdated: expect.any(Date),
        updatedByUserId: 1,
      },
    });
  });
  

  it('should delete a merchant', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ id: 1 });
    expect(prisma.merchant.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});