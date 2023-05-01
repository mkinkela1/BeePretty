import { faker } from "@faker-js/faker";

export const devSeed = async (prismaClient) => {
  for (let i = 0; i < 50; ++i) {
    const user = await createUser(prismaClient, {
      username: faker.company.name(),
      password: "BeePretty123!"
    });

    await createUserData(prismaClient, {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      bio: faker.company.catchPhrase(),
      profilePic: faker.image.imageUrl(200, 200, "face", true),
      user: { connect: { id: user.id } }
    });

    await createFeaturedImage(prismaClient, {
      imageUrl: faker.image.people(400, 400, true),
      user: { connect: { id: user.id } }
    });
  }
};

async function createUser(prismaClient, data) {
  const { password, ...newUser } = await prismaClient.user.create({ data });
  return newUser;
}

async function createUserData(prismaClient, data) {
  return await prismaClient.userData.create({ data });
}

async function createFeaturedImage(prismaClient, data) {
  return await prismaClient.featuredImage.create({ data });
}
