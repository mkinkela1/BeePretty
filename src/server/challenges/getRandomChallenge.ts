import HttpError from "@wasp/core/HttpError.js";
import dbClient from "@wasp/dbClient.js";

export const getRandomChallenge = async (args: any, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return await dbClient.$queryRaw`
      SELECT C.id           as "C_id",
             U1.id          as "U1_id",
             U2.id          as "U2_id",
             FI1."imageUrl" as "FI1_image",
             FI2."imageUrl" as "FI2_image"
      FROM "Challenge" C
               JOIN "User" U1 on U1.id = C."challengedById"
               JOIN "FeaturedImage" FI1 on U1.id = FI1."userId"
               JOIN "User" U2 on U2.id = C."challengerId"
               JOIN "FeaturedImage" FI2 on U2.id = FI2."userId"
      WHERE U1.id <> ${context.user.id}
        AND U2.id <> ${context.user.id}
        AND NOT (${context.user.id} IN (select CV."userId" from "ChallengeVote" CV WHERE C.id = CV."challengeId"))
      ORDER BY RANDOM()
      LIMIT 1
  `;
};
