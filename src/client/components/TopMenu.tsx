import {
  ChatBubbleLeftIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  TrophyIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import {Link, useLocation} from "react-router-dom"
import Logo from "../assets/logo.svg"

const TopMenu = () => {

  const {pathname} = useLocation()
  const location = pathname.substring("/app/".length)

  return (
    <div className="bg-white shadow-md sticky top-0">
      <div className="max-w-screen-lg mx-auto p-4 bg-white">
        <header className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/app">
              <img src={Logo} width={50} height={50}/>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/app/battle"
                  className={`${location == "battle" ? "text-primary" : ""} bg-white hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full focus:outline-none`}>
              <TrophyIcon className="h-6 w-6"/>
            </Link>
            <Link to="/app/search"
                  className={`${location == "search" ? "text-primary" : ""} bg-white hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full focus:outline-none`}>
              <MagnifyingGlassIcon className="h-6 w-6"/>
            </Link>
            <Link to="/app/notification"
                  className={`${location == "notification" ? "text-primary" : ""} bg-white hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full focus:outline-none`}>
              <HeartIcon className="h-6 w-6"/>
            </Link>
            <Link to="/app/chat"
                  className={`${location == "chat" ? "text-primary" : ""} bg-white hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full focus:outline-none`}>
              <ChatBubbleLeftIcon className="h-6 w-6"/>
            </Link>
            <Link to="/app/me"
                  className={`${location == "me" ? "text-primary" : ""} bg-white hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full focus:outline-none`}>
              <UserCircleIcon className="h-6 w-6"/>
            </Link>
          </div>
        </header>
      </div>
    </div>
  )
}

export default TopMenu