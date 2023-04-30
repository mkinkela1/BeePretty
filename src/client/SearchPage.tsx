import {useState} from "react"
import TopMenu from "./components/TopMenu";
import {useQuery} from "@wasp/queries";
import getUsersByUsername from "@wasp/queries/getUsersByUsername";

interface IResult {
  id: number;
  username: string;
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {data: usersData, isFetching, error} = useQuery<any, IResult[]>(getUsersByUsername, {search: searchQuery})

  const usersList = usersData ?? []

  console.log(usersList)

  return (
    <div className="bg-gray-100 min-h-screen">
      <TopMenu/>
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {usersList.length > 0 ? (
          <ul className="bg-white rounded-lg shadow-md p-4">
            {usersList.map(({id, username}) => (
              <li key={id} className="mb-2">
                <a href={`/app/user/${id}`} className="text-blue-500 hover:underline">
                  {username}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

