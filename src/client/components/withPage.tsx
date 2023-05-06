import React from "react";
import TopMenu from "./TopMenu";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { useQuery } from "@wasp/queries";
import getMe from "@wasp/queries/getMe";
import { isEmpty } from "@wasp/shared/helpers.js";
import { Redirect } from "react-router-dom";

interface IGetMe {
  userData: {
    bio: string;
    firstName: string;
    id: number;
    lastName: string;
    userId: number;
    profilePic: string;
  };
}

export const withPage = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrapperComponent = (props: P) => {
    const { data: user, isLoading } = useQuery<any, IGetMe>(getMe);

    if (isLoading) return <></>;
    else {
      const {
        userData: { firstName, lastName }
      } = user || { userData: {} };
      if (isEmpty(firstName) || isEmpty(lastName)) {
        return <Redirect to="/app/setup-account" />;
      }
    }

    return (
      <SkeletonTheme baseColor="#aaa" highlightColor="#cdcdcd">
        <div className="min-h-screen bg-gray-100">
          <TopMenu />
          <div className="mx-auto max-w-screen-lg p-4">
            <Component {...(props as P)} />
          </div>
        </div>
      </SkeletonTheme>
    );
  };

  return WrapperComponent;
};
