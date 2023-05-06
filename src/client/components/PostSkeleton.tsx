import Skeleton from "react-loading-skeleton";
import React from "react";

export const PostSkeleton: React.FC = () => (
  <>
    <div className="mx-auto mb-4 max-w-screen-lg rounded-md bg-white p-4 shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <Skeleton circle height={50} width={50} className="mr-3" />
          <Skeleton width={100} height={25} />
        </div>
      </div>
      <Skeleton className="mb-3 aspect-video w-full rounded-md" />
      <Skeleton width={100} height={25} />
      <Skeleton count={2} height={25} />
    </div>
  </>
);
