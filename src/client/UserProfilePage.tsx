import TopMenu from "./components/TopMenu";
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@wasp/queries";
import getUserById from "@wasp/queries/getUserById";
import followUser from "@wasp/actions/followUser";
import unfollowUser from "@wasp/actions/unfollowUser";
import useAuth from "@wasp/auth/useAuth";

interface IRouteParams {
  match: { params: { id: number } };
}

interface IResult {
  id: number;
  username: string;
  userData: {
    userId: number;
    firstName: string;
    lastName: string;
    profilePic: string;
    bio: string;
  };
  featuredImage: {
    imageUrl: string;
  };
  following: { followerId: number; followingId: number }[];
  followedBy: { followerId: number; followingId: number }[];
}

const UserProfilePage = ({
  match: {
    params: { id }
  }
}: IRouteParams) => {
  const { data: me } = useAuth();
  const {
    data: user,
    isFetching,
    error
  } = useQuery<any, IResult>(getUserById, {
    userId: +id
  });

  const getFullName = () =>
    `${user?.userData?.firstName ?? "John"} ${
      user?.userData?.lastName ?? "Doe"
    }`;

  const alreadyFollowing = () => {
    const followers =
      user?.followedBy?.filter(({ followerId }) => followerId === me?.id) ?? [];

    return followers.length > 0;
  };

  const handleFollow = async () => {
    try {
      await followUser({ userId: +id });
    } catch {
      console.error("Follow not successfull");
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser({ userId: +id });
    } catch {
      console.error("Follow not successfull");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopMenu />
      <div className="mx-auto max-w-screen-lg p-4">
        <div className="mx-auto max-w-screen-lg p-4">
          <header className="relative mb-4 flex">
            <div>
              <img
                src={
                  user?.userData?.profilePic ??
                  "https://via.placeholder.com/300x300"
                }
                alt="Profile"
                className="mr-4 h-20 w-20 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{getFullName()}</h1>
              <p className="text-gray-600">{user?.userData?.bio}</p>
              <div className="flex gap-2">
                <div>
                  <strong>Posts: </strong> {0}
                </div>
                <div>
                  <strong>Following: </strong>
                  {user?.following?.length ?? 0}
                </div>
                <div>
                  <strong>Followers: </strong>
                  {user?.followedBy?.length ?? 0}
                </div>
              </div>
              {alreadyFollowing() ? (
                <div
                  onClick={handleUnfollow}
                  className="text-black flex items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 focus:outline-none"
                >
                  <UserMinusIcon className="h-5 w-5" />
                  <span>Unfollow</span>
                </div>
              ) : (
                <div
                  onClick={handleFollow}
                  className="text-black flex items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 focus:outline-none"
                >
                  <UserPlusIcon className="h-5 w-5" />
                  <span>Follow</span>
                </div>
              )}
            </div>
          </header>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {user?.featuredImage?.imageUrl && (
            <img
              src={user?.featuredImage?.imageUrl}
              alt="featured image"
              className="h-48 w-full rounded-lg border-4 border-primary object-cover"
            />
          )}
          {/*{posts.map((post, index) => (*/}
          {/*  <img*/}
          {/*    key={index}*/}
          {/*    src={post}*/}
          {/*    alt={`Post ${index + 1}`}*/}
          {/*    className="h-48 w-full rounded-lg object-cover"*/}
          {/*  />*/}
          {/*))}*/}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
