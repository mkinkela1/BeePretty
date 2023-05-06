import HttpError from "@wasp/core/HttpError.js";

interface IArgs {
  userId: number;
}

export const getUserById = async ({ userId }: IArgs, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.User.findUnique({
    where: {
      id: userId
    },
    include: {
      userData: true,
      featuredImage: true,
      following: true,
      followedBy: true,
      challenger: true,
      posts: true
    }
  });
};
