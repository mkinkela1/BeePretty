import HttpError from "@wasp/core/HttpError.js";

interface IArgs {
  postId: number;
}

export const likePost = async ({ postId }: IArgs, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Like.create({
    data: {
      user: { connect: { id: context.user.id } },
      post: { connect: { id: postId } }
    }
  });
};
