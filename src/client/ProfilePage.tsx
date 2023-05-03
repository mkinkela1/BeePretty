import { useQuery } from "@wasp/queries";
import getMe from "@wasp/queries/getMe";
import { PhotoIcon, PlusIcon, TrophyIcon } from "@heroicons/react/24/outline";
import uploadProfilePic from "@wasp/actions/uploadProfilePic";
import uploadFeaturedImage from "@wasp/actions/uploadFeaturedImage";
import { useState } from "react";
import UploadPostModal from "./components/UploadPostModal";
import { withPage } from "./components/withPage";

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

const ProfilePage = () => {
  const {
    data: user,
    isFetching,
    error,
    refetch
  } = useQuery<any, IGetMe>(getMe);
  const [showModal, setShowModal] = useState<boolean>(false);

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
        } else {
          console.log("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        e.reset();
      }
    }
  };

  return (
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
            <h1 className="text-2xl font-bold">{getFullName()}</h1>
            <p className="text-gray-600">{user?.userData?.bio}</p>
            <div className="flex gap-2">
              <div>
                <strong>Posts: </strong> {0}
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
            </div>
          </div>
        </header>
        <div className="grid grid-cols-3 gap-4">
          {user?.featuredImage?.imageUrl && (
            <img
              src={user?.featuredImage?.imageUrl}
              alt="featured image"
              className="h-48 w-full rounded-lg border-4 border-primary object-cover"
            />
          )}
          {user?.posts.map(({ id, imgUrl, title }) => (
            <img
              key={id}
              src={imgUrl}
              alt={title}
              className="h-48 w-full rounded-lg object-cover"
            />
          ))}
        </div>
      </div>
      <UploadPostModal
        dependencyReload={refetch}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default withPage(ProfilePage);
