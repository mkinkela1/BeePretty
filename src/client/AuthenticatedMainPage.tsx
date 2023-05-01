import TopMenu from "./components/TopMenu";
import {
  BookmarkIcon,
  ChatBubbleLeftIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const AuthenticatedMainPage = () => {
  return (
    <div className="bg-gray-100">
      <TopMenu />
      <div className="mx-auto max-w-screen-lg p-4">
        {Array.from(Array(10))
          .fill(0)
          .map(() => (
            <div className="mx-auto mb-4 max-w-screen-lg rounded-md bg-white p-4 shadow-md">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="mr-3 h-10 w-10 rounded-full"
                  />
                  <span className="text-gray-900 font-semibold">Username</span>
                </div>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <img
                src="https://via.placeholder.com/500x500"
                alt="Post"
                className="mb-3 w-full rounded-md"
              />
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-red-500 focus:outline-none">
                  <HeartIcon className="h-6 w-6" />
                </button>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <ChatBubbleLeftIcon className="h-6 w-6" />
                </button>
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <BookmarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-2">
                <span className="text-gray-900 font-semibold">Likes:</span>
                <span className="text-gray-700 ml-1">100</span>
              </div>
              <div className="mt-2">
                <span className="text-gray-900 font-semibold">Caption:</span>
                <span className="text-gray-700 ml-1">
                  This is an example caption.
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AuthenticatedMainPage;
