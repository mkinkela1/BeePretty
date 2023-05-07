import "./Main.css";
import Logo from "./assets/logo.svg";
import { Link } from "react-router-dom";
import Landing from "./assets/landing.png";

const MainPage = () => {
  return (
    <div className="flex min-h-screen items-center bg-gray-100">
      <div className="mx-auto max-w-screen-lg p-4">
        <div className="flex flex-row">
          <div className="flex flex-1 flex-col">
            <img src={Logo} width={100} height={100} className="mx-auto mb-4" />
            <h1 className="mb-4 text-2xl font-bold">
              Welcome to BeePretty, the platform where friendly competition
              meets artistic expression.
            </h1>
            <div className="mb-10 text-gray-900">
              Level up your photo game. Challenge your friends to epic visual
              battles. Welcome to BeePretty, the platform where friendly
              competition meets artistic expression. Showcase your best shots,
              go head-to-head with your friends, and let the votes decide the
              winner. Join us and take your photography skills to new heights.
              Embrace the thrill of friendly challenges on BeePretty today!
            </div>
            <div className="flex gap-4">
              <Link
                to="/login"
                className="text-black flex w-full items-center justify-center space-x-2 rounded-md border border-primary bg-white px-4 py-2 focus:outline-none"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-black flex w-full items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 focus:outline-none"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="hidden flex-1 flex-col md:flex lg:flex">
            <img src={Landing} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
