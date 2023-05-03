import { useQuery } from "@wasp/queries";
import getPosts from "@wasp/queries/getPosts";
import useAuth from "@wasp/auth/useAuth";
import { Post } from "./components/Post";
import { withPage } from "./components/withPage";
import React from "react";

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
  const { data: posts } = useQuery<any, IPost[]>(getPosts);

  return (
    <>
      {posts?.map((post: IPost) => (
        <Post {...post} myId={me?.id ?? 0} />
      ))}
    </>
  );
};

export default withPage(AuthenticatedMainPage);
