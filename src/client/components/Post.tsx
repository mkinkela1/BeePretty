import React from "react";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import likePost from "@wasp/actions/likePost";
import removeLike from "@wasp/actions/removeLike";

interface IProps {
  id: number;
  userId: number;
  myId: number;
  profilePic: string;
  firstName: string;
  lastName: string;
  imgUrl: string;
  title: string;
  numberOfLikes: number;
  likedByCurrentUser: boolean;
}

export const Post: React.FC<IProps> = ({
  id,
  userId,
  myId,
  profilePic,
  firstName,
  lastName,
  imgUrl,
  title,
  numberOfLikes,
  likedByCurrentUser
}) => {
  const getFullName = () => `${firstName ?? "John"} ${lastName ?? "Doe"}`;

  const toggleLike = async () => {
    try {
      if (likedByCurrentUser) await removeLike({ postId: id });
      else await likePost({ postId: id });
    } catch {
      console.error("Could not record action");
    }
  };

  return (
    <div
      key={id}
      className="mx-auto mb-4 max-w-screen-lg rounded-md bg-white p-4"
    >
      <div className="mb-2 flex items-center justify-between">
        <a
          className="flex items-center"
          href={userId === myId ? "/app/me" : `/app/user/${userId}`}
        >
          <img
            src={profilePic ?? "https://via.placeholder.com/40"}
            alt="Profile"
            className="mr-3 aspect-square h-10 w-10 rounded-full"
          />
          <span className="font-semibold text-gray-900">{getFullName()}</span>
        </a>
      </div>
      <img
        src={imgUrl ?? "https://via.placeholder.com/500x500"}
        alt="Post"
        className="mb-3 aspect-square w-full rounded-md"
      />
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleLike}
          className="text-gray-500 hover:text-red-500 focus:outline-none"
        >
          {likedByCurrentUser ? (
            <HeartIconSolid className="h-6 w-6 text-primary" />
          ) : (
            <HeartIconOutline className="h-6 w-6" />
          )}
        </button>
      </div>
      <div className="mt-2">
        <span className="font-semibold text-gray-900">Likes:</span>
        <span className="ml-1 text-gray-900">{numberOfLikes.toString()}</span>
      </div>
      <div className="mt-2">
        <span className="text-gray-700">{title}</span>
      </div>
    </div>
  );
};
