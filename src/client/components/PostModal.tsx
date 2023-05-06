import React from "react";
import { useQuery } from "@wasp/queries";
import getPost from "@wasp/queries/getPost";
import Skeleton from "react-loading-skeleton";
import { Post } from "./Post";
import useAuth from "@wasp/auth/useAuth";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface IProps {
  postId: number;
  onClose: () => void;
}

interface IPost {
  id: number;
  title: string;
  imgUrl: string;
  userId: number;
  user: {
    userData: {
      id: number;
      firstName: string;
      lastName: string;
      profilePic: string;
    };
  };
  likes: { userId: number }[];
}

export const PostModal: React.FC<IProps> = ({ postId, onClose }) => {
  const { data: me } = useAuth();
  const { data: post, isLoading } = useQuery<any, IPost>(getPost, {
    id: postId
  });

  const {
    id,
    title,
    imgUrl,
    userId,
    likes,
    user: {
      userData: { firstName, lastName, profilePic }
    }
  } = post || { user: { userData: {} } };

  const likedByCurrentUser = () => {
    const filteredLikes =
      likes?.filter(({ userId }) => userId === me?.id) ?? [];

    return filteredLikes.length > 0;
  };

  if (isLoading)
    return (
      <div className="w-screen-lg mx-auto mb-4 rounded-md bg-white p-4 shadow-md">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton circle height={50} width={50} className="mr-3" />
            <Skeleton width={100} height={25} />
          </div>
        </div>
        <Skeleton className="mb-3 aspect-video w-full rounded-md" />
        <Skeleton width={100} height={25} />
        <Skeleton count={2} height={25} />
      </div>
    );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="min-w-2xl mx-auto flex max-w-2xl flex-col rounded-2xl bg-white">
        <div className="flex justify-end">
          <XMarkIcon onClick={onClose} className="m-2 h-6 w-6" />
        </div>
        {isLoading ? (
          <div className="mx-auto mb-4 max-w-screen-lg rounded-md bg-white p-4 shadow-md">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton circle height={50} width={50} className="mr-3" />
                <Skeleton width={100} height={25} />
              </div>
            </div>
            <Skeleton className="mb-3 aspect-video w-full rounded-md" />
            <Skeleton width={100} height={25} />
            <Skeleton count={2} height={25} />
          </div>
        ) : (
          <Post
            id={id ?? 0}
            title={title ?? ""}
            userId={userId ?? 0}
            imgUrl={imgUrl ?? ""}
            firstName={firstName ?? ""}
            lastName={lastName ?? ""}
            profilePic={profilePic ?? ""}
            numberOfLikes={likes?.length ?? 0}
            likedByCurrentUser={likedByCurrentUser()}
            myId={me?.id ?? 0}
          />
        )}
      </div>
    </div>
  );
};
