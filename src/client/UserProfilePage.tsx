import TopMenu from "./components/TopMenu";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@wasp/queries";
import getUserById from "@wasp/queries/getUserById";

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
}

const UserProfilePage = ({
  match: {
    params: { id }
  }
}: IRouteParams) => {
  const {
    data: user,
    isFetching,
    error
  } = useQuery<any, IResult>(getUserById, {
    userId: id
  });

  const getFullName = () =>
    `${user?.userData?.firstName ?? "John"} ${
      user?.userData?.lastName ?? "Doe"
    }`;

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
              <div className="text-black flex items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 focus:outline-none">
                <UserPlusIcon className="h-5 w-5" />
                <span>Follow</span>
              </div>
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
