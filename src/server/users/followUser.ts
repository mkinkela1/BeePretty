import HttpError from "@wasp/core/HttpError.js";

interface IArgs {
  userId: number;
}

export const followUser = async ({ userId }: IArgs, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Follows.create({
    data: {
      following: { connect: { id: userId } },
      follower: { connect: { id: context.user.id } }
    }
  });
};
