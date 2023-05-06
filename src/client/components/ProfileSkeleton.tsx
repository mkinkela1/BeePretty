import Skeleton from "react-loading-skeleton";
import React from "react";

export const ProfileSkeleton: React.FC = () => (
  <>
    <div className="mx-auto max-w-screen-lg p-4">
      <header className="relative mb-4 flex">
        <div>
          <Skeleton
            circle
            height="5rem"
            width="5rem"
            className="mr-4 h-20 w-20 rounded-full"
          />
        </div>
        <div className="mb-4 w-full">
          <h1 className="text-2xl font-bold">
            <Skeleton height="2rem" />
          </h1>
          <Skeleton height="1.5rem" width="100%" />
          <div className="flex gap-2">
            <div className="w-full">
              <Skeleton height={25} />
            </div>
            <div className="w-full">
              <Skeleton height={25} />
            </div>
            <div className="w-full">
              <Skeleton height={25} />
            </div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="aspect-square w-full rounded-lg border-4 border-primary object-cover" />
        <Skeleton className="aspect-square w-full rounded-lg object-cover" />
        <Skeleton className="aspect-square w-full rounded-lg object-cover" />
        <Skeleton className="aspect-square w-full rounded-lg object-cover" />
        <Skeleton className="aspect-square w-full rounded-lg object-cover" />
        <Skeleton className="aspect-square w-full rounded-lg object-cover" />
      </div>
    </div>
  </>
);
