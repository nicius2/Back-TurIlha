import 'dotenv/config';
import { CardType, PrismaClient } from "../prisma/generated";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({
  adapter,
});
async function seed() {
  console.log('🔥 Deletando todos os cards existentes...');
  await prisma.card.deleteMany({});
  console.log('✅ Cards deletados.');

  const cardsToSeed = [
    {
      title: "Centro Histórico de São Luís",
      description: "Patrimônio Mundial da UNESCO, famoso por seus casarões coloniais com fachadas de azulejos portugueses.",
      imageUrl: "https://5boziuhkz63q5dxz.public.blob.vercel-storage.com/Paisagens/centro-historico-de-sao-luis-dicas.jpg",
      mapsUrl: "https://maps.app.goo.gl/gYq2mJd5t8p8qH7z7",
      longitude: -44.3049,
      latitude: -2.5297,
      type: CardType.LANDSCAPE
    },
    {
      title: "Lagoa da Jansen",
      description: "Um grande parque ecológico com uma lagoa no coração da cidade, ideal para caminhadas e esportes ao ar livre.",
      imageUrl: "https://5boziuhkz63q5dxz.public.blob.vercel-storage.com/Paisagens/Lagoa_da_Jansen_-_S%C3%A3o_Lu%C3%ADs_-_Maranh%C3%A3o_-_Brasil_-_Lagoon_of_the_Jansen_-_S%C3%A3o_Lu%C3%ADs_-_Maranh%C3%A3o_-_Brazil_%283870641863%29.jpg",
      mapsUrl: "https://maps.app.goo.gl/fWq3oP8tY7u7sN6x6",
      longitude: -44.283,
      latitude: -2.51,
      type: CardType.LANDSCAPE
    },
    {
      title: "Espigão Costeiro",
      description: "Píer que avança sobre o mar na Ponta d'Areia, perfeito para ver o pôr do sol e sentir a brisa do mar.",
      imageUrl: "https://5boziuhkz63q5dxz.public.blob.vercel-storage.com/Paisagens/espigao.jpg",
      mapsUrl: "https://maps.app.goo.gl/sD9vR5yT6wX4zF5A9",
      longitude: -44.295,
      latitude: -2.503,
      type: CardType.LANDSCAPE
    },
    {
      title: "Palácio dos Leões",
      description: "Sede do governo do Maranhão, um imponente palácio com uma rica história e arquitetura deslumbrante.",
      imageUrl: "https://5boziuhkz63q5dxz.public.blob.vercel-storage.com/Paisagens/palacio-dos-leos.jpg",
      mapsUrl: "https://maps.app.goo.gl/bH9yG5zR4kL3xJ2A7",
      longitude: -44.306,
      latitude: -2.528,
      type: CardType.LANDSCAPE
    },
    {
      title: "Praia do Calhau",
      description: "Uma das praias urbanas mais populares, com uma longa faixa de areia e muitas barracas e restaurantes.",
      imageUrl: "https://5boziuhkz63q5dxz.public.blob.vercel-storage.com/Paisagens/praia-do-calhau.jpg",
      mapsUrl: "https://maps.app.goo.gl/xZk4vN9yB3s6rE9E8",
      longitude: -44.243,
      latitude: -2.493,
      type: CardType.LANDSCAPE
    },
    {
      title: "Cabana do Sol",
      description: "Famoso pela carne de sol e pratos da culinária maranhense, com um ambiente rústico e acolhedor.",
      imageUrl: "https://5boziuhkz63q5dxz.public.blob.vercel-storage.com/Restaurantes/cabana-do-sol.png",
      mapsUrl: "https://maps.app.goo.gl/wK8yH4tJ3zP9xS7B8",
      longitude: -44.248,
      latitude: -2.495,
      type: CardType.RESTAURANT
    },
    {
      title: "Feijão de Corda",
      description: "Restaurante tradicional que serve o melhor da comida nordestina, incluindo um delicioso feijão de corda.",
      imageUrl: "https://5boziuhkz63q5dxz.public.blob.vercel-storage.com/Restaurantes/feijap-de-corda.jpg",
      mapsUrl: "https://maps.app.goo.gl/cR7tY6xS5vP9zN2A9",
      longitude: -44.255,
      latitude: -2.505,
      type: CardType.RESTAURANT
    },
    {
      title: "Show dos Guns N' Roses",
      description: "o Guns N' Roses confirmou um show inédito em São Luís! Será uma data histórica, pois faz parte da nova turnê mundial da banda (chamada de \"Because What You Want and What You Get Are Two Completely Different Things\") e marca a primeira vez deles na capital maranhens",
      imageUrl: "https://5boziuhkz63q5dxz.public.blob.vercel-storage.com/Eventos/guns-n-roses.jpg",
      mapsUrl: "https://maps.app.goo.gl/kP9yG4tJ2zO7xS6A9",
      longitude: -44.29,
      latitude: -2.53,
      type: CardType.EVENT
    },
    {
      title: "Reggae Sunsplash",
      description: "São Luís é a capital do reggae no Brasil, e este festival anual traz grandes nomes nacionais e internacionais do gênero.",
      imageUrl: "https://5boziuhkz63q5dxz.public.blob.vercel-storage.com/Eventos/early-birds-sun-splash-outdoor-2025-2.jpg",
      mapsUrl: "https://maps.app.goo.gl/wK7yH3tJ2zP8xS6A7",
      longitude: -44.25,
      latitude: -2.5,
      type: CardType.EVENT
    }
  ];

  await prisma.card.createMany({
    data: cardsToSeed,
  });

  console.log(`🔥 Criado(s) ${cardsToSeed.length} card(s) a partir do seed.`);
}

seed()
  .then(async () => {
    console.log("Seeding finished.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });