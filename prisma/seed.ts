import { CardType, PrismaClient } from "../prisma/generated";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({
  adapter,
});
async function seed() {
  await prisma.card.createMany({
    data: [
      {
        title: "Centro Histórico de São Luís",
        description:
          "Patrimônio Mundial da UNESCO, famoso por seus casarões coloniais com fachadas de azulejos portugueses.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/centro-historico.jpg",
        mapsUrl: "https://maps.app.goo.gl/gYq2mJd5t8p8qH7z7",
        longitude: -44.3049,
        latitude: -2.5297,
        type: CardType.LANDSCAPE,
      },
      {
        title: "Praia do Calhau",
        description:
          "Uma das praias urbanas mais populares, com uma longa faixa de areia e muitas barracas e restaurantes.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/praia-calhau.jpg",
        mapsUrl: "https://maps.app.goo.gl/xZk4vN9yB3s6rE9E8",
        longitude: -44.243,
        latitude: -2.493,
        type: CardType.LANDSCAPE,
      },
      {
        title: "Lagoa da Jansen",
        description:
          "Um grande parque ecológico com uma lagoa no coração da cidade, ideal para caminhadas e esportes ao ar livre.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/lagoa-jansen.jpg",
        mapsUrl: "https://maps.app.goo.gl/fWq3oP8tY7u7sN6x6",
        longitude: -44.283,
        latitude: -2.51,
        type: CardType.LANDSCAPE,
      },
      {
        title: "Espigão Costeiro",
        description:
          "Píer que avança sobre o mar na Ponta d'Areia, perfeito para ver o pôr do sol e sentir a brisa do mar.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/espigao-costeiro.jpg",
        mapsUrl: "https://maps.app.goo.gl/sD9vR5yT6wX4zF5A9",
        longitude: -44.295,
        latitude: -2.503,
        type: CardType.LANDSCAPE,
      },
      {
        title: "Palácio dos Leões",
        description:
          "Sede do governo do Maranhão, um imponente palácio com uma rica história e arquitetura deslumbrante.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/palacio-leoes.jpg",
        mapsUrl: "https://maps.app.goo.gl/bH9yG5zR4kL3xJ2A7",
        longitude: -44.306,
        latitude: -2.528,
        type: CardType.LANDSCAPE,
      },

      // == RESTAURANTES (RESTAURANT) ==
      {
        title: "Cabana do Sol",
        description:
          "Famoso pela carne de sol e pratos da culinária maranhense, com um ambiente rústico e acolhedor.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/cabana-do-sol.jpg",
        mapsUrl: "https://maps.app.goo.gl/wK8yH4tJ3zP9xS7B8",
        longitude: -44.248,
        latitude: -2.495,
        type: CardType.RESTAURANT,
      },
      {
        title: "Feijão de Corda",
        description:
          "Restaurante tradicional que serve o melhor da comida nordestina, incluindo um delicioso feijão de corda.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/feijao-de-corda.jpg",
        mapsUrl: "https://maps.app.goo.gl/cR7tY6xS5vP9zN2A9",
        longitude: -44.255,
        latitude: -2.505,
        type: CardType.RESTAURANT,
      },
      {
        title: "Restaurante Escola do Senac",
        description:
          "Localizado no Centro Histórico, oferece um buffet variado com pratos regionais e internacionais, preparado por alunos.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/senac-restaurante.jpg",
        mapsUrl: "https://maps.app.goo.gl/dF8vG3yT9uP6xM1A6",
        longitude: -44.304,
        latitude: -2.53,
        type: CardType.RESTAURANT,
      },
      {
        title: "Casa de Juja",
        description:
          "Culinária maranhense autêntica em um ambiente charmoso e familiar no coração do Centro Histórico.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/casa-de-juja.jpg",
        mapsUrl: "https://maps.app.goo.gl/aB7vC2xR8yP5zK4A7",
        longitude: -44.303,
        latitude: -2.531,
        type: CardType.RESTAURANT,
      },
      {
        title: "Bar do Nelson",
        description:
          "Um clássico de São Luís, conhecido por seus petiscos de frutos do mar e cerveja gelada na beira da praia.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/bar-do-nelson.jpg",
        mapsUrl: "https://maps.app.goo.gl/eT5vH1yS9wR4zG3B6",
        longitude: -44.235,
        latitude: -2.489,
        type: CardType.RESTAURANT,
      },

      // == EVENTOS (EVENT) ==
      {
        title: "Bumba Meu Boi de São Luís",
        description:
          "A maior festa popular do Maranhão, que acontece em junho e julho com apresentações de grupos folclóricos por toda a cidade.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/bumba-meu-boi.jpg",
        mapsUrl: "https://maps.app.goo.gl/kP9yG4tJ2zO7xS6A9",
        longitude: -44.29,
        latitude: -2.53,
        type: CardType.EVENT,
      },
      {
        title: "Festa da Juçara",
        description:
          "Evento gastronômico anual que celebra a juçara (açaí local), com dezenas de barracas servindo a iguaria.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/festa-jucara.jpg",
        mapsUrl: "https://maps.app.goo.gl/fT4vH2yS8wR3zG2B7",
        longitude: -44.285,
        latitude: -2.54,
        type: CardType.EVENT,
      },
      {
        title: "Carnaval de São Luís",
        description:
          "Um dos carnavais de rua mais tradicionais do Brasil, com blocos, trios elétricos e muita animação.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/carnaval-slz.jpg",
        mapsUrl: "https://maps.app.goo.gl/gYq2mJd5t8p8qH7z7",
        longitude: -44.3049,
        latitude: -2.5297,
        type: CardType.EVENT,
      },
      {
        title: "Festival Guarnicê de Cinema",
        description:
          "Um dos mais antigos festivais de cinema do Brasil, exibindo produções nacionais e locais em vários pontos da cidade.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/guarnice.jpg",
        mapsUrl: "https://maps.app.goo.gl/hJ8vG4tJ2zO6xS5A8",
        longitude: -44.302,
        latitude: -2.53,
        type: CardType.EVENT,
      },
      {
        title: "Reggae Sunsplash",
        description:
          "São Luís é a capital do reggae no Brasil, e este festival anual traz grandes nomes nacionais e internacionais do gênero.",
        imageUrl:
          "https://sao-luis-storage.s3.sa-east-1.amazonaws.com/reggae-sunsplash.jpg",
        mapsUrl: "https://maps.app.goo.gl/wK7yH3tJ2zP8xS6A7",
        longitude: -44.25,
        latitude: -2.5,
        type: CardType.EVENT,
      },
    ],
  });

  console.log("🔥 Criado 15 tipos de cards.");
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
