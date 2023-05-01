import HttpError from "@wasp/core/HttpError.js";

export const getMe = async (args: any, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.User.findUnique({
    where: {
      id: context.user.id
    },
    include: {
      userData: true,
      featuredImage: true,
      following: true,
      followedBy: true
    }
  });
};
