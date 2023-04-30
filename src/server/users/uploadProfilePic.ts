import HttpError from "@wasp/core/HttpError.js";

interface IArgs {
  profilePic: string;
}

export const uploadProfilePic = async ({ profilePic }: IArgs, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.UserData.upsert({
    where: { userId: context.user.id },
    create: { profilePic, user: { connect: { id: context.user.id } } },
    update: { profilePic }
  });
};
