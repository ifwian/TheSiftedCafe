import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

/**
 * Development-only seed data (spec section 38). Credentials below are
 * placeholders for local development ONLY -- never reuse them anywhere
 * real, and never commit real production credentials to this file.
 */
const DEV_ADMIN_EMAIL = 'admin@thesiftedcafe.dev'
const DEV_ADMIN_PASSWORD = 'ChangeMe123!' // dev-only, hashed before storing

const CATEGORIES = [
  { name: 'Coffee', slug: 'coffee' },
  { name: 'Non-Coffee', slug: 'non-coffee' },
  { name: 'Food', slug: 'food' },
  { name: 'Pastries', slug: 'pastries' },
  { name: 'Desserts', slug: 'desserts' },
]

const MENU_ITEMS_BY_CATEGORY = {
  coffee: [
    {
      name: 'Spanish Latte',
      slug: 'spanish-latte',
      description: 'Smooth espresso blended with creamy milk and a touch of sweetness.',
      price: 150,
      imageUrl: 'https://placehold.co/640x480/6F4E37/F7F3ED?text=Spanish+Latte',
      isFeatured: true,
    },
    {
      name: 'Iced Caramel Macchiato',
      slug: 'iced-caramel-macchiato',
      description: 'Espresso layered over cold milk with a swirl of caramel.',
      price: 165,
      imageUrl: 'https://placehold.co/640x480/6F4E37/F7F3ED?text=Caramel+Macchiato',
      isFeatured: true,
    },
  ],
  'non-coffee': [
    {
      name: 'Matcha Latte',
      slug: 'matcha-latte',
      description: 'Stone-ground matcha whisked with steamed milk.',
      price: 175,
      imageUrl: 'https://placehold.co/640x480/8AA07A/F7F3ED?text=Matcha+Latte',
      isFeatured: true,
    },
    {
      name: 'Strawberry Yogurt Smoothie',
      slug: 'strawberry-yogurt-smoothie',
      description: 'Fresh strawberries blended with yogurt and honey.',
      price: 160,
      imageUrl: 'https://placehold.co/640x480/E7A7A0/211C18?text=Strawberry+Smoothie',
      isFeatured: false,
    },
  ],
  food: [
    {
      name: 'Truffle Mushroom Pasta',
      slug: 'truffle-mushroom-pasta',
      description: 'Creamy pasta tossed with mushrooms and truffle oil.',
      price: 265,
      imageUrl: 'https://placehold.co/640x480/C89B6D/211C18?text=Truffle+Pasta',
      isFeatured: true,
    },
    {
      name: 'Chicken Pesto Sandwich',
      slug: 'chicken-pesto-sandwich',
      description: 'Grilled chicken, basil pesto, and greens on sourdough.',
      price: 195,
      imageUrl: 'https://placehold.co/640x480/C89B6D/211C18?text=Pesto+Sandwich',
      isFeatured: false,
    },
  ],
  pastries: [
    {
      name: 'Classic Croissant',
      slug: 'classic-croissant',
      description: 'Buttery, flaky croissant baked fresh every morning.',
      price: 95,
      imageUrl: 'https://placehold.co/640x480/C89B6D/211C18?text=Croissant',
      isFeatured: false,
    },
    {
      name: 'Butter Cookie Box',
      slug: 'butter-cookie-box',
      description: 'A tin of six house-made butter cookies.',
      price: 120,
      imageUrl: 'https://placehold.co/640x480/C89B6D/211C18?text=Butter+Cookies',
      isFeatured: false,
      isAvailable: false,
    },
  ],
  desserts: [
    {
      name: 'Basque Burnt Cheesecake',
      slug: 'basque-burnt-cheesecake',
      description: 'Rich, caramelized cheesecake with a soft, jammy center.',
      price: 145,
      imageUrl: 'https://placehold.co/640x480/211C18/F7F3ED?text=Cheesecake',
      isFeatured: false,
    },
  ],
}

const REVIEWS = [
  {
    customerName: 'Andrea M.',
    rating: 5,
    comment: 'Beautiful space, great coffee, and such a relaxing atmosphere.',
    isPublished: true,
  },
  {
    customerName: 'Jonas R.',
    rating: 5,
    comment: 'The Spanish latte is unreal, and the staff always remembers my order.',
    isPublished: true,
  },
  {
    customerName: 'Bea T.',
    rating: 4,
    comment: 'I get so much work done here. Good wifi, better coffee.',
    isPublished: true,
  },
]

async function main() {
  console.log('Seeding database...')

  const passwordHash = await bcrypt.hash(DEV_ADMIN_PASSWORD, 10)
  await prisma.user.upsert({
    where: { email: DEV_ADMIN_EMAIL },
    update: {},
    create: {
      name: 'Admin',
      email: DEV_ADMIN_EMAIL,
      passwordHash,
      role: 'ADMIN',
    },
  })
  console.log(`Admin user ready: ${DEV_ADMIN_EMAIL} (dev-only password)`)

  for (const category of CATEGORIES) {
    const savedCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })

    const items = MENU_ITEMS_BY_CATEGORY[category.slug] ?? []
    for (const item of items) {
      await prisma.menuItem.upsert({
        where: { slug: item.slug },
        update: {},
        create: {
          ...item,
          isAvailable: item.isAvailable ?? true,
          categoryId: savedCategory.id,
        },
      })
    }
  }
  console.log('Categories and menu items seeded.')

  for (const review of REVIEWS) {
    const existing = await prisma.review.findFirst({
      where: { customerName: review.customerName, comment: review.comment },
    })
    if (!existing) {
      await prisma.review.create({ data: review })
    }
  }
  console.log('Reviews seeded.')

  console.log('Seed complete.')
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
