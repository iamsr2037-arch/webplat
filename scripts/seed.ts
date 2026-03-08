import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create admin user
  const adminEmail = "admin@marketplace.com";
  const adminPassword = await bcrypt.hash("admin123456", 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: adminPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  });

  console.log("Admin user created:", admin.email);

  // Create sample customer
  const customerEmail = "customer@example.com";
  const customerPassword = await bcrypt.hash("customer123456", 10);

  const customer = await prisma.user.upsert({
    where: { email: customerEmail },
    update: {},
    create: {
      email: customerEmail,
      password: customerPassword,
      name: "John Doe",
      role: "CUSTOMER",
    },
  });

  console.log("Sample customer created:", customer.email);

  // Create sample products
  const products = [
    {
      title: "E-Commerce Store Template",
      description:
        "A complete, ready-to-use e-commerce platform with shopping cart, product management, and payment integration.",
      category: "E-Commerce",
      price: 49.99,
      demoUrl: "https://demo.example.com/ecommerce",
      features: [
        "Product Management",
        "Shopping Cart",
        "Payment Gateway Integration",
        "Order Tracking",
        "User Reviews",
      ],
      images: [
        "https://images.unsplash.com/photo-1460925895917-adf4e565d871?w=500",
      ],
      installationService: true,
    },
    {
      title: "SaaS Dashboard Template",
      description:
        "Professional dashboard template perfect for SaaS applications with analytics, user management, and reporting.",
      category: "Dashboard",
      price: 79.99,
      demoUrl: "https://demo.example.com/saas",
      features: [
        "Analytics Dashboard",
        "User Management",
        "Reports",
        "Dark Mode",
        "Responsive Design",
      ],
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
      ],
      installationService: false,
    },
    {
      title: "Booking System Platform",
      description:
        "Complete booking and appointment system with calendar integration and automated reminders.",
      category: "Booking",
      price: 59.99,
      demoUrl: "https://demo.example.com/booking",
      features: [
        "Calendar Integration",
        "Appointment Scheduling",
        "Automated Reminders",
        "Payment Integration",
        "Email Notifications",
      ],
      images: [
        "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500",
      ],
      installationService: true,
    },
  ];

  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { title: product.title },
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: product as any,
      });
      console.log(`Product created: ${product.title}`);
    }
  }

  console.log("Database seed completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
