import { Link } from "react-router-dom";

import { SignupForm } from "@wasp/auth/forms/Signup";
import Logo from "./assets/logo.svg";

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-screen-md p-4">
        <img src={Logo} width={100} height={100} className="mx-auto mb-4" />
        <main className="mx-auto mb-4 max-w-screen-lg rounded-md bg-white p-4 shadow-lg">
          <SignupForm />
          <br />
          <span>
            I already have an account (
            <Link
              to="/login"
              className="border-b-2 border-b-primary font-bold text-gray-900"
            >
              go to login
            </Link>
            ).
          </span>
        </main>
      </div>
    </div>
  );
};

export default SignupPage;
