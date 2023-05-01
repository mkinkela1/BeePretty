import {
  ChatBubbleLeftIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  TrophyIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";

const TopMenu = () => {
  const { pathname } = useLocation();
  const location = pathname.substring("/app/".length);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-screen-lg bg-white p-4">
        <header className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/app">
              <img src={Logo} width={50} height={50} />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/app/battle"
              className={`${
                location == "battle" ? "text-primary" : ""
              } hover:bg-gray-200 text-gray-700 rounded-full bg-white px-4 py-2 focus:outline-none`}
            >
              <TrophyIcon className="h-6 w-6" />
            </Link>
            <Link
              to="/app/search"
              className={`${
                location == "search" ? "text-primary" : ""
              } hover:bg-gray-200 text-gray-700 rounded-full bg-white px-4 py-2 focus:outline-none`}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </Link>
            <Link
              to="/app/notification"
              className={`${
                location == "notification" ? "text-primary" : ""
              } hover:bg-gray-200 text-gray-700 rounded-full bg-white px-4 py-2 focus:outline-none`}
            >
              <HeartIcon className="h-6 w-6" />
            </Link>
            <Link
              to="/app/chat"
              className={`${
                location == "chat" ? "text-primary" : ""
              } hover:bg-gray-200 text-gray-700 rounded-full bg-white px-4 py-2 focus:outline-none`}
            >
              <ChatBubbleLeftIcon className="h-6 w-6" />
            </Link>
            <Link
              to="/app/me"
              className={`${
                location == "me" ? "text-primary" : ""
              } hover:bg-gray-200 text-gray-700 rounded-full bg-white px-4 py-2 focus:outline-none`}
            >
              <UserCircleIcon className="h-6 w-6" />
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
};

export default TopMenu;
