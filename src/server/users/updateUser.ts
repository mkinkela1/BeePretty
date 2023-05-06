import HttpError from "@wasp/core/HttpError.js";

interface IArgs {
  firstName?: string;
  lastName?: string;
  bio?: string;
  profilePic?: string;
}

export const updateUser = async (
  { firstName, lastName, bio, profilePic }: IArgs,
  context: any
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.UserData.upsert({
    where: { userId: context.user.id },
    create: {
      firstName,
      lastName,
      bio,
      profilePic,
      user: { connect: { id: context.user.id } }
    },
    update: {
      firstName,
      lastName,
      bio,
      profilePic
    }
  });
};
