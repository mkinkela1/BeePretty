import React from "react";
import TopMenu from "./TopMenu";

export const withPage = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrapperComponent = (props: P) => {
    return (
      <div className="min-h-screen bg-gray-100">
        <TopMenu />
        <div className="mx-auto max-w-screen-lg p-4">
          <Component {...(props as P)} />
        </div>
      </div>
    );
  };

  return WrapperComponent;
};
