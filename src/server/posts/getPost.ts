import HttpError from "@wasp/core/HttpError.js";

interface IArgs {
  id: number;
}

export const getPost = async ({ id }: IArgs, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Post.findUnique({
    where: { id },
    include: {
      user: { select: { userData: true } },
      likes: true
    }
  });
};
