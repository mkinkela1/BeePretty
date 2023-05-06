import React, { useRef } from "react";
import createPost from "@wasp/actions/createPost";
import { toast } from "react-toastify";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  dependencyReload: () => void;
}

const InstagramModal: React.FC<IProps> = ({
  isOpen,
  onClose,
  dependencyReload
}) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef(null);

  const handlePost = async () => {
    const files = imageRef.current?.files;
    // @ts-ignore
    const caption = captionRef.current?.value ?? "";

    if (files) {
      try {
        const formData = new FormData();
        formData.append("image", files[0]);

        const auth = "Client-ID 089d1d6d88e2bc9";

        const response = await fetch("https://api.imgur.com/3/upload", {
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

          await createPost({ imgUrl: link, title: caption });

          toast.success("Image successfully uploaded.");
        } else {
          toast.error(
            "Image upload failed. You can only import .JPG, .JPEG and .PNG"
          );
        }
      } catch (error) {
        toast.error(`Error uploading image: ${error}`);
      } finally {
        dependencyReload();
        onClose();
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="mx-auto flex max-w-2xl flex-col rounded-2xl bg-white">
            <header className="rounded-t-2xl bg-gray-100 p-4">
              <h1 className="text-center text-2xl">Upload new post</h1>
            </header>
            <div className="flex flex-col p-4">
              <input
                ref={imageRef}
                type="file"
                id="upload"
                accept="image/png, image/jpeg, image/jpg"
              />
              <textarea
                ref={captionRef}
                className="border-gray-300 mt-2 resize-none rounded border p-2"
                rows={3}
                placeholder="Add a caption..."
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
                onClick={handlePost}
                className="text-black flex w-full items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 focus:outline-none"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstagramModal;
