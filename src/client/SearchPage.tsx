import React, { useState } from "react";
import { useQuery } from "@wasp/queries";
import findUsers from "@wasp/queries/findUsers";
import useAuth from "@wasp/auth/useAuth";
import useDebounce from "./hooks/useDebounce";
import { withPage } from "./components/withPage";
import { SearchResultSkeleton } from "./components/SearchResultSkeleton";
import { SearchResult } from "./components/SearchResult";

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

  const { data: usersData, isFetching } = useQuery<any, IResult[]>(findUsers, {
    search: debouncedSearch
  });

  const usersList = usersData ?? [];

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
      {isFetching ? (
        <SearchResultSkeleton />
      ) : usersList.length > 0 ? (
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
              <SearchResult
                profilePic={profilePic}
                myId={id}
                following={following}
                followedBy={followedBy}
                bio={bio}
                userId={userId}
                firstName={firstName}
                lastName={lastName}
              />
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
