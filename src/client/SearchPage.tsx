import React, { useState } from "react";
import { useQuery } from "@wasp/queries";
import findUsers from "@wasp/queries/findUsers";
import useAuth from "@wasp/auth/useAuth";
import useDebounce from "./hooks/useDebounce";
import { withPage } from "./components/withPage";

interface IResult {
  userId: number;
  firstName: string;
  lastName: string;
  profilePic: string;
  bio: string;
  user: {
    following: { followerId: number; followingId: number }[];
    followedBy: { followerId: number; followingId: number }[];
  };
}

const SearchPage = () => {
  const { data: user } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearch = useDebounce({ value: searchQuery, delay: 500 });

  const id = user?.id;

  const {
    data: usersData,
    isFetching,
    error
  } = useQuery<any, IResult[]>(findUsers, {
    search: debouncedSearch
  });

  const usersList = usersData ?? [];

  const getFullName = (firstName?: string, lastName?: string) =>
    `${firstName ?? "John"} ${lastName ?? "Doe"}`;

  return (
    <>
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
        <ul className="flex flex-col gap-2">
          {usersList.map(
            ({
              firstName,
              lastName,
              profilePic,
              userId,
              bio,
              user: { following, followedBy }
            }) => (
              <li key={userId} className="rounded-lg bg-white p-4 shadow-md">
                <a href={userId === id ? "/app/me" : `/app/user/${userId}`}>
                  <div className="relative flex">
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
                      <p className="text-gray-600">{bio}</p>
                      <div className="flex gap-2">
                        <div>
                          <strong>Posts: </strong> {0}
                        </div>
                        <div>
                          <strong>Following: </strong>
                          {following?.length ?? 0}
                        </div>
                        <div>
                          <strong>Followers: </strong>
                          {followedBy?.length ?? 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            )
          )}
        </ul>
      ) : (
        <p className="text-gray-600">No results found.</p>
      )}
    </>
  );
};

export default withPage(SearchPage);
