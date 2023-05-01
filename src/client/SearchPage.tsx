import { useState } from "react";
import TopMenu from "./components/TopMenu";
import { useQuery } from "@wasp/queries";
import findUsers from "@wasp/queries/findUsers";

interface IResult {
  userId: number;
  firstName: string;
  lastName: string;
  profilePic: string;
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: usersData,
    isFetching,
    error
  } = useQuery<any, IResult[]>(findUsers, {
    search: searchQuery
  });

  const usersList = usersData ?? [];

  const getFullName = (firstName?: string, lastName?: string) =>
    `${firstName ?? "John"} ${lastName ?? "Doe"}`;

  return (
    <div className="min-h-screen bg-gray-100">
      <TopMenu />
      <div className="mx-auto max-w-screen-lg p-4">
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border-gray-300 focus:ring-blue-500 flex-1 rounded-md border px-4 py-2 focus:outline-none focus:ring-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {usersList.length > 0 ? (
          <ul className="rounded-lg bg-white p-4 shadow-md">
            {usersList.map(({ firstName, lastName, profilePic, userId }) => (
              <li key={userId}>
                <a
                  href={`/app/user/${userId}`}
                  className="text-blue-500 hover:underline"
                >
                  <div className="relative mb-4 flex">
                    <div>
                      <img
                        src={
                          profilePic ?? "https://via.placeholder.com/300x300"
                        }
                        alt="Profile"
                        className="mr-4 h-20 w-20 rounded-full"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">
                        {getFullName(firstName, lastName)}
                      </h1>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
