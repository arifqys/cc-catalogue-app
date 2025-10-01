const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleCards = [
  {
    name: "BNI Mastercard Gold",
    imageUrl: "https://image.cermati.com/c_fit,h_240,w_360/v1/credit-card/lfhn6zufknivytspkkjc.webp",
    description: "Nikmati keleluasaan dan kenyamanan tiada batas bersama dengan Kartu Kredit BNI MasterCard Gold di mana pun Anda berada sebagai bentuk perwujudan pengakuan dan penghormatan untuk pribadi sukses seperti Anda. Kartu Kredit BNI MasterCard Gold siap menemani langkah sukses anda baik untuk bertransaksi bisnis, pribadi, maupun menikmati waktu luang bersama keluarga tercinta.",
    features: [
      "Fasilitas cicilan tetap",
      "BNI Rewards Point",
      "Rp2.500 = 1 reward point",
    ],
    annualFee: 300000,
    applyLink: "https://applycreditcard.bni.co.id"
  },
  {
    name: "Mayapada Skorcard",
    imageUrl: "https://image.cermati.com/c_fit,h_240,w_360/urlntu5yaglj9t7unop8.webp",
    description: "Skorcard adalah kartu kredit co-branded yang diterbitkan oleh Bank Mayapada bersama Skorcard Teknologi Indonesia. Dirancang untuk pengguna yang ingin punya kartu kredit tanpa ribet sekaligus menawarkan banyak keuntungan.",
    features: [
      "100% Digital",
      "Welcome bonus hingga Rp2 juta",
      "Skorpoint di tiap transaksi",
    ],
    annualFee: 300000,
    applyLink: "https://skorcard.app"
  },
];

async function main() {
  console.log('Starting to seed the database...');

  // Clear existing data
  await prisma.card.deleteMany({});
  console.log('Cleared existing card data');

  // Insert sample data
  for (const cardData of sampleCards) {
    const card = await prisma.card.create({
      data: cardData
    });
    console.log(`Created card: ${card.name}`);
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
