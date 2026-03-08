import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string(),
  price: z.number().positive(),
  demoUrl: z.string().url().optional(),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  installationService: z.boolean().optional(),
});

// Demo products for development
const DEMO_PRODUCTS = [
  {
    id: "1",
    title: "Modern E-Commerce Platform",
    description: "A fully-featured e-commerce solution with shopping cart, checkout, and admin panel.",
    price: 2999,
    category: "E-Commerce",
    demoUrl: "https://example.com/demo/ecommerce",
    features: ["Shopping Cart", "Payment Integration", "Admin Dashboard", "Product Management"],
    installationService: true,
  },
  {
    id: "2",
    title: "SaaS Dashboard Template",
    description: "Responsive SaaS dashboard with analytics, user management, and reports.",
    price: 1499,
    category: "Dashboard",
    demoUrl: "https://example.com/demo/dashboard",
    features: ["Analytics", "Real-time Data", "User Management", "Custom Reports"],
    installationService: true,
  },
  {
    id: "3",
    title: "Booking System Script",
    description: "Complete appointment and booking system with calendar and notifications.",
    price: 1899,
    category: "Booking",
    demoUrl: "https://example.com/demo/booking",
    features: ["Calendar View", "Email Notifications", "Payment Processing", "Client Portal"],
    installationService: true,
  },
  {
    id: "4",
    title: "CRM Platform",
    description: "Customer relationship management system for sales teams and agencies.",
    price: 3499,
    category: "CRM",
    demoUrl: "https://example.com/demo/crm",
    features: ["Lead Management", "Sales Pipeline", "Email Integration", "Reporting"],
    installationService: true,
  },
  {
    id: "5",
    title: "Blog & Content Platform",
    description: "SEO-optimized blogging platform with comments and category management.",
    price: 799,
    category: "Blog",
    demoUrl: "https://example.com/demo/blog",
    features: ["SEO Optimization", "Comments System", "Social Sharing", "Analytics"],
    installationService: false,
  },
  {
    id: "6",
    title: "Landing Page Builder",
    description: "Drag-and-drop landing page builder with conversion optimization tools.",
    price: 599,
    category: "Landing Page",
    demoUrl: "https://example.com/demo/landing",
    features: ["Drag & Drop", "A/B Testing", "Form Builder", "Email Integration"],
    installationService: false,
  },
  {
    id: "7",
    title: "Admin Panel Pro",
    description: "Professional admin panel template with user, product, and order management.",
    price: 1299,
    category: "Admin Panel",
    demoUrl: "https://example.com/demo/admin",
    features: ["User Management", "Product Management", "Order Tracking", "Financial Reports"],
    installationService: true,
  },
  {
    id: "8",
    title: "Multi-vendor Marketplace",
    description: "Full-featured marketplace where multiple vendors can sell products.",
    price: 4999,
    category: "E-Commerce",
    demoUrl: "https://example.com/demo/marketplace",
    features: ["Vendor Management", "Commission System", "Multi-currency", "Escrow Payments"],
    installationService: true,
  },
];

// GET all products with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const skip = parseInt(searchParams.get("skip") || "0");
    const take = parseInt(searchParams.get("take") || "12");

    try {
      const where: any = {};

      if (category) {
        where.category = category;
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ];
      }

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take,
          orderBy: { createdAt: "desc" },
        }),
        prisma.product.count({ where }),
      ]);

      return NextResponse.json({
        products,
        pagination: {
          total,
          skip,
          take,
          pages: Math.ceil(total / take),
        },
      });
    } catch (dbError) {
      // If database fails, return demo products
      console.log("[v0] Database not ready, returning demo products");
      let filtered = DEMO_PRODUCTS;

      if (category && category !== "All") {
        filtered = filtered.filter((p) => p.category === category);
      }

      if (search) {
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      const total = filtered.length;
      const paginatedProducts = filtered.slice(skip, skip + take);

      return NextResponse.json({
        products: paginatedProducts,
        pagination: {
          total,
          skip,
          take,
          pages: Math.ceil(total / take),
        },
      });
    }
  } catch (error) {
    console.error("[v0] Get products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST create new product (admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add admin authentication check
    const body = await request.json();

    const validation = productSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: validation.data as any,
    });

    return NextResponse.json(
      { message: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("[v0] Create product error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
