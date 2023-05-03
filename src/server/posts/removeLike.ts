import HttpError from "@wasp/core/HttpError.js";

interface IArgs {
  postId: number;
}

export const removeLike = async ({ postId }: IArgs, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Like.deleteMany({
    where: {
      AND: [
        {
          userId: context.user.id,
          postId
        }
      ]
    }
  });
};
