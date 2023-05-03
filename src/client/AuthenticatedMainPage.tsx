import TopMenu from "./components/TopMenu";
import { useQuery } from "@wasp/queries";
import getPosts from "@wasp/queries/getPosts";
import useAuth from "@wasp/auth/useAuth";
import { Post } from "./components/Post";

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
    <div className="bg-gray-100">
      <TopMenu />
      <div className="mx-auto max-w-screen-md p-4">
        {posts?.map((post: IPost) => (
          <Post {...post} myId={me?.id ?? 0} />
        ))}
      </div>
    </div>
  );
};

export default AuthenticatedMainPage;
