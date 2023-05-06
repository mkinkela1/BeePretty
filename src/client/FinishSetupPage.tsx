import React, { useState } from "react";
import Logo from "./assets/logo.svg";
import { Redirect } from "react-router-dom";

const FinishSetupPage: React.FC = () => {
  const [canGoNext, setCanGoNext] = useState<boolean>(false);

  if (canGoNext) return <Redirect to="/app" />;
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-screen-md p-4">
        <img src={Logo} width={100} height={100} className="mx-auto mb-4" />
        <div className="mx-auto mb-4 flex max-w-screen-lg flex-col rounded-md bg-white p-4 shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Finish setup</h1>
          <div className="mb-10 text-gray-900">
            Welcome to BeePretty, the ultimate platform to showcase your style
            and creativity! Here's what you can do:
            <ul className="my-4">
              <li className="mb-2">
                <strong>Upload Images:</strong> Share your stunning photos and
                showcase your unique style. Let others admire your fashion
                sense, beauty, art, and more.
              </li>
              <li className="mb-2">
                <strong>Like and Connect:</strong> Discover amazing content from
                fellow users and show your appreciation by liking their posts.
                Connect with like-minded individuals and build a supportive
                community.
              </li>
              <li className="mb-2">
                <strong>Add Friends:</strong> Expand your network by adding
                friends who inspire you. Stay updated with their latest posts.
              </li>
              <li className="mb-2">
                <strong>Challenge Others:</strong> Take your passion for
                competition to the next level. Challenge other users to battles.
              </li>
            </ul>
            Get ready to immerse yourself in a world of inspiration,
            connections, and friendly competition. BeePretty is all about
            celebrating individuality and fostering a vibrant community. Let
            your creativity soar, connect with amazing people, and make your
            mark on BeePretty!
          </div>
          <button
            onClick={() => setCanGoNext(true)}
            className="mx-auto mt-10 rounded-md bg-primary px-4 py-2"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishSetupPage;
