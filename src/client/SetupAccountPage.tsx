import React, { useRef, useState } from "react";
import Logo from "./assets/logo.svg";
import uploadProfilePic from "@wasp/actions/uploadProfilePic";
import updateUser from "@wasp/actions/updateUser";
import { Redirect } from "react-router-dom";
import { isNotEmpty } from "@wasp/shared/helpers";
import { toast } from "react-toastify";

const SetupAccountPage: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const saveAndGoToNextStep = async () => {
    if (!isValid()) return;

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const bio = bioRef.current?.value;
    const files = imageRef?.current?.files;
    let profilePic;

    if (files) {
      try {
        const formData = new FormData();
        formData.append("image", files[0]);

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
          profilePic = link;

          await uploadProfilePic({ profilePic });

          toast.success("Image successfully uploaded.");
        } else {
          toast.error(
            "Image upload failed. You can only import .JPG, .JPEG and .PNG"
          );
        }
      } catch (error) {
        toast.error(`Error uploading image: ${error}`);
      }
    }

    try {
      // @ts-ignore
      await updateUser({ firstName, lastName, bio, profilePic });

      toast.success("User data added");

      goToNextStep();
    } catch {
      toast.error("Error adding user data");
    }

    setIsUploaded(true);
  };

  const isValid = () =>
    isNotEmpty(firstNameRef.current?.value) &&
    isNotEmpty(lastNameRef.current?.value);

  const goToNextStep = () => <Redirect to="/app/upload-featured-image" />;

  if (isUploaded) return <Redirect to="/app/upload-featured-image" />;
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-screen-md p-4">
        <img src={Logo} width={100} height={100} className="mx-auto mb-4" />
        <div className="mx-auto mb-4 flex max-w-screen-lg flex-col rounded-md bg-white p-4 shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Setup Your Account</h1>
          <div className="mb-10 text-gray-900">
            Complete your profile by adding your full name, a clear profile
            picture, and a compelling bio. Your full name helps others find and
            recognize you, while a profile picture adds a personal touch. Craft
            a captivating bio to showcase your interests and skills. Make a
            memorable impression and let others connect with you on a deeper
            level. Enhance your profile today for better connections!
          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="mb-2 block">
              First name<span className="text-red">*</span>
            </label>
            <input
              ref={firstNameRef}
              type="text"
              id="firstName"
              className="border-gray-300 w-full rounded-md border px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="mb-2 block">
              Last name<span className="text-red">*</span>
            </label>
            <input
              ref={lastNameRef}
              type="text"
              id="lastName"
              className="border-gray-300 w-full rounded-md border px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="mb-2 block">
              Bio (optional)
            </label>
            <textarea
              ref={bioRef}
              id="bio"
              rows={5}
              className="border-gray-300 w-full rounded-md border px-4 py-2"
            />
          </div>
          <label htmlFor="profilePicture" className="mb-2 block">
            Profile picture (optional)
          </label>
          <input
            ref={imageRef}
            type="file"
            id="profilePicture"
            accept="image/png, image/jpeg, image/jpg"
          />
          <button
            onClick={saveAndGoToNextStep}
            className="mx-auto mt-10 rounded-md bg-primary px-4 py-2"
          >
            Update your account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupAccountPage;
