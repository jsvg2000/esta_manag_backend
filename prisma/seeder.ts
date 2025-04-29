import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear roles
  const [adminRole, auxRole] = await Promise.all([
    prisma.role.upsert({
      where: { name: 'Administrador' },
      update: {},
      create: { name: 'Administrador' },
    }),
    prisma.role.upsert({
      where: { name: 'Auxiliar de Registro' },
      update: {},
      create: { name: 'Auxiliar de Registro' },
    }),
  ]);

  // Crear usuarios
  const [adminUser, auxUser] = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Marlon Antonio Sanchez',
        email: 'antonio.sanchez@ol.com',
        password: 'D7p$3r!uVg9q@1ZwTb8&', 
        roleId: adminRole.id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Carlos Moreno Nuñez',
        email: 'carlos.moreno@ol.com',
        password: 'D7p$3r!uVg9q@1ZwTb8&',
        roleId: auxRole.id,
      },
    }),
  ]);

  // Crear estados de comerciantes
  const [activo, inactivo] = await Promise.all([
    prisma.merchantState.create({ data: { name: 'Activo' } }),
    prisma.merchantState.create({ data: { name: 'Inactivo' } }),
  ]);

  // Crear comerciantes
  const merchants = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.merchant.create({
        data: {
          businessName: `Comerciante ${i + 1}`,
          municipality: `Municipio ${i + 1}`,
          phone: `300000000${i + 1}`,
          email: `comerciante${i + 1}@correo.com`,
          stateId: [activo, inactivo, inactivo][i % 3].id,
          updatedByUserId: adminUser.id,
        },
      })
    )
  );

  // Crear establecimientos
  let estIndex = 1;
  for (const merchant of merchants) {
    await Promise.all(
      Array.from({ length: 2 }).map((_) =>
        prisma.establishment.create({
          data: {
            name: `Establecimiento ${estIndex}`,
            revenue: (1000000 * estIndex).toFixed(2),
            numberOfEmployees: 5 + estIndex,
            merchantId: merchant.id,
            updatedByUserId: auxUser.id,
          },
        }).then(() => estIndex++)
      )
    );
  }

  console.log('✅ Seed completado con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
