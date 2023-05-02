import HttpError from "@wasp/core/HttpError.js";

interface IArgs {
  userId: number;
}

export const createChallenge = async ({ userId }: IArgs, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  try {
    context.entities.Challenge.create({
      data: {
        challenger: { connect: { id: userId } },
        challengedBy: { connect: { id: context.user.id } }
      }
    });
  } catch {
    throw new HttpError(400);
  }
};
