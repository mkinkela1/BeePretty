import React from "react";
import { useQuery } from "@wasp/queries";
import getUsersChallenges from "@wasp/queries/getUsersChallenges";
import Skeleton from "react-loading-skeleton";

interface IChallenge {
  id: number;
  UD1_id: number;
  UD1_firstName: string;
  UD1_lastName: string;
  UD1_profilePic: string;
  UD2_id: number;
  UD2_firstName: string;
  UD2_lastName: string;
  UD2_profilePic: string;
  votes: number[];
}

interface IProps {
  userId: number;
}

export const ChallengesList: React.FC<IProps> = ({ userId }) => {
  const { data: challenges, isLoading } = useQuery(getUsersChallenges, {
    userId
  });
  return isLoading ? (
    <Skeleton count={3} height="5rem" />
  ) : (
    <>
      {(challenges as IChallenge[])?.map((challenge: IChallenge) => (
        <Challenge {...challenge} userId={userId} />
      ))}
    </>
  );
};

type IChallengeProps = IChallenge & IProps;

const Challenge: React.FC<IChallengeProps> = ({
  id,
  UD1_firstName,
  UD2_firstName,
  UD1_lastName,
  UD2_lastName,
  UD1_id,
  UD1_profilePic,
  UD2_profilePic,
  UD2_id,
  votes
}) => {
  const getFullName = (firstName?: string, lastName?: string) =>
    `${firstName ?? "John"} ${lastName ?? "Doe"}`;

  const getNumberOfVotesForUser = (userId: number) => {
    const votesForUser = votes?.filter((vote) => vote === userId) ?? [];

    return votesForUser.length;
  };

  return (
    <li key={id} className="mb-4 flex justify-between gap-5">
      <div className="flex flex-1 rounded-lg bg-white p-4 shadow-md">
        <div className="relative flex items-center gap-2">
          <div>
            <img
              src={UD1_profilePic ?? "https://via.placeholder.com/300x300"}
              alt="Profile"
              className="mr-4 aspect-square w-20 rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {getFullName(UD1_firstName, UD1_lastName)}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex items-center rounded-lg bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">
          {`${getNumberOfVotesForUser(UD1_id)} : ${getNumberOfVotesForUser(
            UD2_id
          )}`}
        </h1>
      </div>
      <div className="flex flex-1 rounded-lg bg-white p-4 shadow-md">
        <div className="relative flex items-center gap-2">
          <div>
            <img
              src={UD2_profilePic ?? "https://via.placeholder.com/300x300"}
              alt="Profile"
              className="mr-4 aspect-square w-20 rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {getFullName(UD2_firstName, UD2_lastName)}
            </h1>
          </div>
        </div>
      </div>
    </li>
  );
};
