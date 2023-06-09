import { useQuery } from "@wasp/queries";
import getMe from "@wasp/queries/getMe";
import {
  ArrowLeftOnRectangleIcon,
  PencilSquareIcon,
  PhotoIcon,
  PlusIcon,
  TrophyIcon
} from "@heroicons/react/24/outline";
import uploadProfilePic from "@wasp/actions/uploadProfilePic";
import uploadFeaturedImage from "@wasp/actions/uploadFeaturedImage";
import { useRef, useState } from "react";
import UploadPostModal from "./components/UploadPostModal";
import { withPage } from "./components/withPage";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import updateUser from "@wasp/actions/updateUser";
import { isNotNullOrUndefined } from "@wasp/shared/helpers";
import { PostModal } from "./components/PostModal";
import { ChallengesList } from "./components/ChallengesList";
import useAuth from "@wasp/auth/useAuth";
import { toast } from "react-toastify";
import logout from "@wasp/auth/logout.js";
import { useHistory } from "react-router-dom";

interface IGetMe {
  featuredImage: { imageUrl: string };
  userData: {
    bio: string;
    firstName: string;
    id: number;
    lastName: string;
    userId: number;
    profilePic: string;
  };
  following: { followerId: number; followingId: number }[];
  followedBy: { followerId: number; followingId: number }[];
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

const ProfilePage = () => {
  const history = useHistory();
  const { data: me } = useAuth();
  const { data: user, isLoading, refetch } = useQuery<any, IGetMe>(getMe);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<number | null>(null);
  const [updateUserData, setUpdateUserData] = useState<boolean>(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.POSTS);

  const getFullName = () =>
    `${user?.userData?.firstName ?? "John"} ${
      user?.userData?.lastName ?? "Doe"
    }`;

  const handleUpload = async (e: any, isProfilePic: boolean) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const auth = "Client-ID 016d186c53c5b64";

        const response = await fetch("https://api.imgur.com/3/image", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: auth,
            Accept: "application/json"
          }
        });

        if (response.ok) {
          const data = await response.json();
          const { link } = data.data;

          if (isProfilePic) await uploadProfilePic({ profilePic: link });
          else await uploadFeaturedImage({ imageUrl: link });

          toast.success("Image successfully uploaded.");
        } else {
          toast.error(
            "Image upload failed. You can only import .JPG, .JPEG and .PNG"
          );
        }
      } catch (error) {
        toast.error(`Error uploading image: ${error}`);
      } finally {
        e.reset();
      }
    }
  };

  const onSave = async () => {
    try {
      await updateUser({
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        bio: bioRef.current?.value
      });

      toast.success("User updated");
    } catch {
      toast.error("Could not update user");
    } finally {
      onClose();
    }
  };

  const onClose = () => setUpdateUserData(false);

  return isLoading ? (
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
            <label
              htmlFor="uploadProfilePic"
              className="absolute left-14 top-14"
            >
              <div className="cursor-pointer rounded-full bg-white p-0.5 hover:bg-primary">
                <PlusIcon className="text-gray-600 h-6 w-6" />
              </div>
            </label>
            <input
              type="file"
              id="uploadProfilePic"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e: any) => handleUpload(e, true)}
            />
          </div>
          <div>
            <div className="flex">
              {updateUserData ? (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <label
                        htmlFor="firstName"
                        className="mb-2 block font-bold"
                      >
                        First name
                      </label>
                      <input
                        ref={firstNameRef}
                        type="text"
                        id="firstName"
                        className="border-gray-300 w-full rounded-md border px-4 py-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="lastName"
                        className="mb-2 block font-bold"
                      >
                        Last name
                      </label>
                      <input
                        ref={lastNameRef}
                        type="text"
                        id="lastName"
                        className="border-gray-300 w-full rounded-md border px-4 py-2"
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <label htmlFor="bio" className="mb-2 block font-bold">
                      Bio
                    </label>
                    <textarea
                      ref={bioRef}
                      id="bio"
                      rows={5}
                      className="border-gray-300 w-full rounded-md border px-4 py-2"
                    />
                  </div>
                  <div className="flex gap-2 p-4">
                    <button
                      onClick={onClose}
                      className="text-black flex w-full items-center justify-center space-x-2 rounded-md border border-primary bg-white px-4 py-2 focus:outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onSave}
                      className="text-black flex w-full items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 focus:outline-none"
                    >
                      Post
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="flex">
                    <h1 className="text-2xl font-bold">{getFullName()}</h1>
                    <div
                      onClick={() => setUpdateUserData(true)}
                      className="ml-2 flex items-center justify-center rounded-full border bg-white p-1.5 hover:bg-primary"
                    >
                      <PencilSquareIcon className="h-5 w-5 text-gray-900" />
                    </div>
                  </div>
                  <div className="my-2 flex items-center">
                    <p className="text-gray-600">{user?.userData?.bio}</p>
                  </div>
                </div>
              )}
            </div>
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
            <div className="flex gap-2 py-4">
              <label htmlFor="uploadFeaturedImage">
                <div className="text-black flex items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 focus:outline-none">
                  <TrophyIcon className="h-5 w-5" />
                  <span>Featured image</span>
                </div>
              </label>
              <input
                type="file"
                id="uploadFeaturedImage"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e: any) => handleUpload(e, false)}
              />
              <div
                onClick={() => setShowModal(true)}
                className="text-black flex items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 focus:outline-none"
              >
                <PhotoIcon className="h-5 w-5" />
                <span>New post</span>
              </div>
              <div
                onClick={() => {
                  logout();
                  history.push("/");
                }}
                className="text-black flex items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 focus:outline-none"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </header>

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
          <ChallengesList userId={me?.id ?? 0} />
        )}
      </div>
      <UploadPostModal
        dependencyReload={refetch}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      {isNotNullOrUndefined(postModal) && (
        <PostModal postId={postModal!} onClose={() => setPostModal(null)} />
      )}
    </>
  );
};

export default withPage(ProfilePage);
