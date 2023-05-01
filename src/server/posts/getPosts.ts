import HttpError from "@wasp/core/HttpError.js";
import dbClient from "@wasp/dbClient.js";

export const getPosts = async (args: any, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return await dbClient.$queryRaw`
      SELECT P."id", P."imgUrl", P."title", UD."firstName", UD."lastName", UD."profilePic", P."userId"
      FROM "Post" P
               JOIN "User" U on U.id = p."userId"
               JOIN "UserData" UD on U.id = UD."userId"
      WHERE P."userId" IN (SELECT "followingId"
                           FROM "Follows"
                           WHERE "followerId" = ${context.user.id})
         OR P."userId" = ${context.user.id}
      ORDER BY P."id" DESC
  `;
};
