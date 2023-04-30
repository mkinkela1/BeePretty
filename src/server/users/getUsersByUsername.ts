interface IArgs {
  search?: string
}

export const getUsersByUsername = async (args: IArgs, context: any) => {
  return context.entities.User.findMany({
    where: {
      username: {
        contains: args.search
      }
    }
  })
}