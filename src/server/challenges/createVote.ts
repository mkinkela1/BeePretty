import HttpError from "@wasp/core/HttpError.js";

interface IArgs {
  challengeId?: number;
  voteForId?: number;
}

export const createVote = async (
  { challengeId, voteForId }: IArgs,
  context: any
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  try {
    await context.entities.ChallengeVote.create({
      data: {
        voteForId,
        user: { connect: { id: context.user.id } },
        challenge: { connect: { id: challengeId } }
      }
    });
  } catch (e) {
    throw new HttpError(400);
  }
};
