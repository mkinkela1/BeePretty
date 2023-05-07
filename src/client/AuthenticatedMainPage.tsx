import useAuth from "@wasp/auth/useAuth";
import { Post } from "./components/Post";
import { withPage } from "./components/withPage";
import React from "react";
import { PostSkeleton } from "./components/PostSkeleton";
import { useQuery } from "@wasp/queries";
import getPosts from "@wasp/queries/getPosts";

interface IPost {
  id: number;
  imgUrl: string;
  title: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  userId: number;
  numberOfLikes: number;
  likedByCurrentUser: boolean;
}

const AuthenticatedMainPage = () => {
  const { data: me } = useAuth();
  const { data, isLoading } = useQuery(getPosts);

  const posts: IPost[] = data as IPost[];

  return isLoading ? (
    <PostSkeleton />
  ) : (
    <>
      {posts?.map((post: IPost) => (
        <Post {...post} myId={me?.id ?? 0} />
      ))}
    </>
  );
};

export default withPage(AuthenticatedMainPage);
