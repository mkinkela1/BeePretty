import HttpError from "@wasp/core/HttpError.js";

interface IArgs {
  imageUrl: string;
}

export const uploadFeaturedImage = async (
  { imageUrl }: IArgs,
  context: any
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.FeaturedImage.upsert({
    where: { userId: context.user.id },
    create: { imageUrl, user: { connect: { id: context.user.id } } },
    update: { imageUrl }
  });
};
