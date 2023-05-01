import { isEmpty } from "../helpers.js";

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
            contains: search
          }
        },
        {
          lastName: {
            contains: search
          }
        }
      ]
    },
    include: {
      user: {
        select: {
          id: true,
          following: true,
          followedBy: true
        }
      }
    }
  });
};