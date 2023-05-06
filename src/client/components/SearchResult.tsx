import React from "react";

interface IProps {
  userId: number;
  myId?: number;
  profilePic: string;
  firstName: string;
  lastName: string;
  bio: string;
  following: any[];
  followedBy: any[];
  posts: any[];
}

export const SearchResult: React.FC<IProps> = ({
  userId,
  myId,
  profilePic,
  firstName,
  lastName,
  bio,
  following,
  followedBy,
  posts
}) => {
  const getFullName = (firstName?: string, lastName?: string) =>
    `${firstName ?? "John"} ${lastName ?? "Doe"}`;

  return (
    <li key={userId} className="rounded-lg bg-white p-4 shadow-md">
      <a href={userId === myId ? "/app/me" : `/app/user/${userId}`}>
        <div className="relative flex gap-2">
          <div>
            <img
              src={profilePic ?? "https://via.placeholder.com/300x300"}
              alt="Profile"
              className="mr-4 aspect-square w-20 rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {getFullName(firstName, lastName)}
            </h1>
            <p className="text-gray-600">{bio}</p>
            <div className="flex gap-2">
              <div>
                <strong>Posts: </strong> {posts?.length ?? 0}
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
  );
};
