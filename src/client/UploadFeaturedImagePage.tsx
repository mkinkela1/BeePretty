import React, { useRef, useState } from "react";
import Logo from "./assets/logo.svg";
import { Redirect } from "react-router-dom";
import { isNotEmpty } from "@wasp/shared/helpers";
import uploadFeaturedImage from "@wasp/actions/uploadFeaturedImage";
import { toast } from "react-toastify";

const UploadFeaturedImagePage: React.FC = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const saveAndGoToNextStep = async () => {
    if (!isValid()) return;

    const files = imageRef?.current?.files;

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

          await uploadFeaturedImage({ imageUrl: link });

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

    setIsUploaded(true);
  };

  const isValid = () => isNotEmpty(imageRef.current?.value);

  if (isUploaded) return <Redirect to="/app/finish-setup" />;
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-screen-md p-4">
        <img src={Logo} width={100} height={100} className="mx-auto mb-4" />
        <div className="mx-auto mb-4 flex max-w-screen-lg flex-col rounded-md bg-white p-4 shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Setup featured image</h1>
          <div className="mb-10 text-gray-900">
            In BeePretty, your featured image is a crucial element that enables
            you to compete against other users. It's a representation of
            yourself that can help you stand out in the battles, gain more
            followers and increase your influence. It's important to select the
            best image of yourself that showcases your personality, talent, and
            style. Choose an image that makes you feel confident and proud to be
            who you are. With a great featured image, you can make a strong
            impact on the community and achieve your goals on BeePretty.
          </div>
          <label htmlFor="featuredImage" className="mb-2 block">
            Featured image<span className="text-red">*</span>
          </label>
          <input
            ref={imageRef}
            type="file"
            id="featuredImage"
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

export default UploadFeaturedImagePage;
