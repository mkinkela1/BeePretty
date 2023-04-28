import TopMenu from "./components/TopMenu";
import {HeartIcon, ChatBubbleLeftIcon, BookmarkIcon} from "@heroicons/react/24/outline";

const AuthenticatedMainPage = () => {
  return (
    <div className="bg-gray-100">
      <TopMenu />
      <div className="max-w-screen-lg mx-auto p-4">
        {Array.from(Array(10)).fill(0).map(() => (
          <div className="max-w-screen-lg mx-auto p-4 bg-white rounded-md shadow-md mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-semibold text-gray-900">Username</span>
              </div>
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <img src="https://via.placeholder.com/500x500" alt="Post" className="w-full mb-3 rounded-md" />
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
              <span className="font-semibold text-gray-900">Likes:</span>
              <span className="text-gray-700 ml-1">100</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold text-gray-900">Caption:</span>
              <span className="text-gray-700 ml-1">This is an example caption.</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AuthenticatedMainPage