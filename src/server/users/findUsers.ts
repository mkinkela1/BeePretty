import { isEmpty } from "@wasp/shared/helpers.js";

interface IArgs {
  search?: string;
}

export const findUsers = async ({ search }: IArgs, context: any) => {
  if (isEmpty(search)) return [];
  return context.entities.UserData.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          lastName: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    },
    include: {
      user: {
        select: {
          id: true,
          following: true,
          followedBy: true,
          posts: true
        }
      }
    }
  });
};
