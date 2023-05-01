import HttpError from "@wasp/core/HttpError.js";

interface IArgs {
  imgUrl: string;
  title: string;
}

export const createPost = async ({ imgUrl, title }: IArgs, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Post.create({
    data: {
      imgUrl,
      title,
      user: { connect: { id: context.user.id } }
    }
  });
};
