export const getUsersByUsername = async (args: {search:string}, context: { entities: { User: { findMany: (arg0: {}) => any } } }) => {
  return context.entities.User.findMany({where:{username:{contains:args.search}}})
}