import { HeartIcon, UserCircleIcon, ChatBubbleLeftIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"

const TopMenu = () => {
  return (
    <div className="bg-white shadow-md sticky top-0">
      <div className="max-w-screen-lg mx-auto p-4 bg-white">
        <header className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/app">
              <h1 className="text-3xl font-bold text-gray-900">BeePretty</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/app/battle" className="bg-white hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full focus:outline-none">
              <TrophyIcon className="h-6 w-6" />
            </Link>
            <Link to="/app/notification" className="bg-white hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full focus:outline-none">
              <HeartIcon className="h-6 w-6" />
            </Link>
            <Link to="/app/chat" className="bg-white hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full focus:outline-none">
              <ChatBubbleLeftIcon className="h-6 w-6" />
            </Link>
            <Link to="/app/me" className="bg-white hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full focus:outline-none">
              <UserCircleIcon className="h-6 w-6" />
            </Link>
          </div>
        </header>
      </div>
    </div>
  )
}

export default TopMenu