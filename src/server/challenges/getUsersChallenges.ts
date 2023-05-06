import HttpError from "@wasp/core/HttpError.js";
import dbClient from "@wasp/dbClient.js";

interface IArgs {
  userId: number;
}

export const getUsersChallenges = async ({ userId }: IArgs, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return await dbClient.$queryRaw`
      SELECT C.id                      as "id",
             UD1."userId"              as "UD1_id",
             UD1."firstName"           as "UD1_firstName",
             UD1."lastName"            as "UD1_lastName",
             UD1."profilePic"          as "UD1_profilePic",
             UD2."userId"              as "UD2_id",
             UD2."firstName"           as "UD2_firstName",
             UD2."lastName"            as "UD2_lastName",
             UD2."profilePic"          as "UD2_profilePic",
             array_agg(CV."voteForId") as "votes"
      FROM "Challenge" C
               JOIN "User" U1 on U1.id = C."challengedById"
               JOIN "UserData" UD1 on U1.id = UD1."userId"
               JOIN "User" U2 on U2.id = C."challengerId"
               JOIN "UserData" UD2 on U2.id = UD2."userId"
               LEFT JOIN "ChallengeVote" CV on C.id = CV."challengeId"
      WHERE C."challengedById" = ${userId}
         OR C."challengerId" = ${userId}
      GROUP BY C.id,
               UD1."id",
               UD1."firstName",
               UD1."lastName",
               UD1."profilePic",
               UD2."id",
               UD2."firstName",
               UD2."lastName",
               UD2."profilePic"
  `;
};
