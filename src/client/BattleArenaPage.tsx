import { useQuery } from "@wasp/queries";
import getRandomChallenge from "@wasp/queries/getRandomChallenge";
import createVote from "@wasp/actions/createVote";
import { withPage } from "./components/withPage";
import { toast } from "react-toastify";

interface IResult {
  C_id: number;
  U1_id: number;
  U2_id: number;
  FI1_image: string;
  FI2_image: string;
}

interface IVote {
  challengeId?: number;
  voteForId?: number;
}

const BattleAreaPage = () => {
  const {
    data: challengeData,
    isFetching,
    error,
    refetch
  } = useQuery<any, IResult[]>(getRandomChallenge);

  const challenge = challengeData?.[0];

  const handleVote = async ({ challengeId, voteForId }: IVote) => {
    try {
      await createVote({ challengeId, voteForId });
      refetch();

      toast.success("Vote registered");
    } catch {
      toast.error("Vote not registered");
    }
  };

  return (
    <>
      {challenge ? (
        <div className="flex justify-center sm:flex-col sm:items-center md:flex-col md:items-center lg:flex-row">
          <div className="p-4 lg:w-1/2">
            <div className="relative">
              <div
                className="inset-0 overflow-hidden rounded-lg border-4 border-primary"
                onClick={() =>
                  handleVote({
                    challengeId: challenge?.C_id,
                    voteForId: challenge?.U1_id
                  })
                }
              >
                <img
                  src={
                    challenge?.FI1_image ??
                    "https://via.placeholder.com/500x500"
                  }
                  alt="Contestant 1"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2">
            <div className="relative">
              <div
                className="inset-0 overflow-hidden rounded-lg border-4 border-primary"
                onClick={() =>
                  handleVote({
                    challengeId: challenge?.C_id,
                    voteForId: challenge?.U2_id
                  })
                }
              >
                <img
                  src={
                    challenge?.FI2_image ??
                    "https://via.placeholder.com/500x500"
                  }
                  alt="Contestant 2"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        "There are no challanges left"
      )}
    </>
  );
};

export default withPage(BattleAreaPage);
