import Skeleton from "react-loading-skeleton";

export const SearchResultSkeleton = () => (
  <div className="mb-2 rounded-lg bg-white p-4 shadow-md">
    <div className="relative flex gap-2">
      <div className="aspect-square h-20 w-20">
        <Skeleton circle width="100%" height="100%" />
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-bold">
          <Skeleton height={25} />
        </h1>
        <Skeleton height={25} />
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
    </div>
  </div>
);
