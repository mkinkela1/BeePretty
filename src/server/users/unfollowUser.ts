import HttpError from "@wasp/core/HttpError.js";

interface IArgs {
  userId: number;
}

export const unfollowUser = async ({ userId }: IArgs, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Follows.deleteMany({
    where: {
      AND: [
        {
          followingId: userId,
          followerId: context.user.id
        }
      ]
    }
  });
};
