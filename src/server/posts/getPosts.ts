import HttpError from "@wasp/core/HttpError.js";
import dbClient from "@wasp/dbClient.js";

export const getPosts = async (args: any, context: any) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return await dbClient.$queryRaw`
      SELECT P."id",
             P."imgUrl",
             P."title",
             UD."firstName",
             UD."lastName",
             UD."profilePic",
             P."userId",
             count(L."id")                                                      AS "numberOfLikes",
             CASE WHEN L."userId" = ${context.user.id} THEN TRUE ELSE FALSE END AS "likedByCurrentUser"
      FROM "Post" P
               JOIN "User" U ON U.id = P."userId"
               JOIN "UserData" UD ON U.id = UD."userId"
               LEFT JOIN "Like" L ON P."id" = L."postId"
      WHERE P."userId" IN (SELECT "followingId"
                           FROM "Follows"
                           WHERE "followerId" = ${context.user.id})
         OR P."userId" = ${context.user.id}
      GROUP BY P."id", P."imgUrl", P."title", UD."firstName", UD."lastName", UD."profilePic", P."userId", L."userId"
      ORDER BY P."id" DESC
  `;
};
