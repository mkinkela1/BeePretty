import TopMenu from "./components/TopMenu";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@wasp/queries";
import getPosts from "@wasp/queries/getPosts";
import useAuth from "@wasp/auth/useAuth";

interface IPost {
  id: number;
  imgUrl: string;
  title: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  userId: number;
}

const AuthenticatedMainPage = () => {
  const { data: me } = useAuth();
  const { data: posts } = useQuery<any, IPost[]>(getPosts);

  const getFullName = (firstName?: string, lastName?: string) =>
    `${firstName ?? "John"} ${lastName ?? "Doe"}`;

  return (
    <div className="bg-gray-100">
      <TopMenu />
      <div className="mx-auto max-w-screen-md p-4">
        {posts?.map(
          ({ id, imgUrl, title, firstName, lastName, profilePic, userId }) => (
            <div
              key={id}
              className="mx-auto mb-4 max-w-screen-lg rounded-md bg-white p-4 shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <a
                  className="flex items-center"
                  href={userId === me?.id ? "/app/me" : `/app/user/${userId}`}
                >
                  <img
                    src={profilePic ?? "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="mr-3 h-10 w-10 rounded-full"
                  />
                  <span className="font-semibold text-gray-900">
                    {getFullName(firstName, lastName)}
                  </span>
                </a>
              </div>
              <img
                src={imgUrl ?? "https://via.placeholder.com/500x500"}
                alt="Post"
                className="mb-3 w-full rounded-md"
              />
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-red-500 focus:outline-none">
                  <HeartIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-2">
                <span className="font-semibold text-gray-900">Likes:</span>
                <span className="text-gray-700 ml-1">100</span>
              </div>
              <div className="mt-2">
                <span className="font-semibold text-gray-900">Caption:</span>
                <span className="text-gray-700 ml-1">{title}</span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AuthenticatedMainPage;
