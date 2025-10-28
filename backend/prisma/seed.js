const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
        console.log('Admin already exists!');
        console.log(`Email: ${existingAdmin.email}`);
        console.log(`Role: ${existingAdmin.role}`);
        console.log('Skipping admin creation.');
        return;
    }

    // Creatingg new admin
    const adminPassword = await bcrypt.hash('Admin@123', 10);

    const admin = await prisma.user.create({
        data: {
            email: 'admin@gmail.com',
            password: adminPassword,
            name: 'Admin User',
            role: 'ADMIN'
        }
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@gmail.com');
    console.log('Password: Admin@123');
    console.log('Role: ADMIN');
}

main()
    .catch((e) => {
        console.error('Error:', e.message);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
