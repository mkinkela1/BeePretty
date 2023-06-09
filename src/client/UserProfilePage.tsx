import {
  TrophyIcon,
  UserMinusIcon,
  UserPlusIcon
} from "@heroicons/react/24/outline";
import { useQuery } from "@wasp/queries";
import getUserById from "@wasp/queries/getUserById";
import followUser from "@wasp/actions/followUser";
import unfollowUser from "@wasp/actions/unfollowUser";
import useAuth from "@wasp/auth/useAuth";
import createChallenge from "@wasp/actions/createChallenge";
import { withPage } from "./components/withPage";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import { isNotNullOrUndefined } from "@wasp/shared/helpers";
import { PostModal } from "./components/PostModal";
import { useState } from "react";
import { ChallengesList } from "./components/ChallengesList";
import { toast } from "react-toastify";

interface IRouteParams {
  match: { params: { id: number } };
}

interface IResult {
  id: number;
  username: string;
  userData: {
    userId: number;
    firstName: string;
    lastName: string;
    profilePic: string;
    bio: string;
  };
  featuredImage: {
    imageUrl: string;
  };
  following: { followerId: number; followingId: number }[];
  followedBy: { followerId: number; followingId: number }[];
  challenger: { challengedById: number; challengerId: number }[];
  posts: {
    id: number;
    title: string;
    imgUrl: string;
  }[];
}

enum ActiveTab {
  POSTS = "POSTS",
  CHALLENGES = "CHALLENGES"
}

const UserProfilePage = ({
  match: {
    params: { id }
  }
}: IRouteParams) => {
  const { data: me } = useAuth();
  const { data: user, isFetching } = useQuery<any, IResult>(getUserById, {
    userId: +id
  });
  const [postModal, setPostModal] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.POSTS);

  const getFullName = () =>
    `${user?.userData?.firstName ?? "John"} ${
      user?.userData?.lastName ?? "Doe"
    }`;

  const alreadyFollowing = () => {
    const followers =
      user?.followedBy?.filter(({ followerId }) => followerId === me?.id) ?? [];

    return followers.length > 0;
  };

  const alreadyChallenged = () => {
    const challenges =
      user?.challenger?.filter(
        ({ challengedById }) => challengedById === me?.id
      ) ?? [];

    return challenges.length > 0;
  };

  const handleFollow = async () => {
    try {
      await followUser({ userId: +id });
      toast.success("User followed");
    } catch {
      toast.error("Follow not successfull");
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser({ userId: +id });
      toast.success("User unfollowed");
    } catch {
      toast.error("Unfollow not successfull");
    }
  };

  const handleChallenge = async () => {
    try {
      await createChallenge({ userId: +id });
      toast.success("User challenged");
    } catch {
      toast.error("User challenge error");
    }
  };
  return isFetching ? (
    <ProfileSkeleton />
  ) : (
    <>
      <div className="mx-auto max-w-screen-lg p-4">
        <header className="relative mb-4 flex">
          <div>
            <img
              src={
                user?.userData?.profilePic ??
                "https://via.placeholder.com/300x300"
              }
              alt="Profile"
              className="mr-4 h-20 w-20 rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{getFullName()}</h1>
            <p className="text-gray-600">{user?.userData?.bio}</p>
            <div className="flex gap-2">
              <div>
                <strong>Posts: </strong> {user?.posts?.length ?? 0}
              </div>
              <div>
                <strong>Following: </strong>
                {user?.following?.length ?? 0}
              </div>
              <div>
                <strong>Followers: </strong>
                {user?.followedBy?.length ?? 0}
              </div>
            </div>
            <div className="flex flex-row gap-2">
              {alreadyFollowing() ? (
                <div
                  onClick={handleUnfollow}
                  className="text-black flex items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 focus:outline-none"
                >
                  <UserMinusIcon className="h-5 w-5" />
                  <span>Unfollow</span>
                </div>
              ) : (
                <div
                  onClick={handleFollow}
                  className="text-black flex items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 focus:outline-none"
                >
                  <UserPlusIcon className="h-5 w-5" />
                  <span>Follow</span>
                </div>
              )}
              {alreadyChallenged() ? (
                <div className="text-black flex items-center justify-center space-x-2 rounded-md bg-gray-100 px-4 py-2 focus:outline-none">
                  <TrophyIcon className="h-5 w-5" />
                  <span>Challenge in progress</span>
                </div>
              ) : (
                <div
                  onClick={handleChallenge}
                  className="text-black flex items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 focus:outline-none"
                >
                  <TrophyIcon className="h-5 w-5" />
                  <span>Challenge</span>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>

      <div className="mb-4 text-center text-sm font-medium text-gray-900">
        <ul className="-mb-px flex flex-wrap">
          <li
            className={`${
              activeTab === ActiveTab.POSTS ? "border-b-4" : ""
            } mr-2 flex-1 border-b border-b-primary`}
            onClick={() => setActiveTab(ActiveTab.POSTS)}
          >
            <div className="inline-block p-4">Posts</div>
          </li>
          <li
            className={`${
              activeTab === ActiveTab.CHALLENGES ? "border-b-4" : ""
            } mr-2 flex-1 border-b border-b-primary`}
            onClick={() => setActiveTab(ActiveTab.CHALLENGES)}
          >
            <div className="inline-block p-4">Challenges</div>
          </li>
        </ul>
      </div>

      {activeTab === ActiveTab.POSTS ? (
        <div className="grid grid-cols-3 gap-4">
          {user?.featuredImage?.imageUrl && (
            <img
              src={user?.featuredImage?.imageUrl}
              alt="featured image"
              className="aspect-square w-full rounded-lg border-4 border-primary object-cover"
            />
          )}
          {user?.posts.map(({ id, imgUrl, title }) => (
            <img
              key={id}
              src={imgUrl}
              alt={title}
              className="aspect-square w-full rounded-lg object-cover"
              onClick={() => setPostModal(id)}
            />
          ))}
        </div>
      ) : (
        <ChallengesList userId={user?.id ?? 0} />
      )}
      {isNotNullOrUndefined(postModal) && (
        <PostModal postId={postModal!} onClose={() => setPostModal(null)} />
      )}
    </>
  );
};

export default withPage(UserProfilePage);
