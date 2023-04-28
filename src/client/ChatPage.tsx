import TopMenu from "./components/TopMenu";

const BattleAreaPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <TopMenu />
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="flex">
          <div className="w-1/4 bg-gray-100 py-4 px-6">
            {/* Sidebar */}
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40" // Replace with the actual profile picture source
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold">User 1</span>
              </li>
              <li className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40" // Replace with the actual profile picture source
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold">User 2</span>
              </li>
              {/* Add more users */}
            </ul>
          </div>
          <div className="flex-1 bg-gray-200 p-4">
            <header className="bg-gray-100 py-4 px-6 mb-4">
              <h1 className="text-2xl font-bold">Chat</h1>
            </header>
            <div className="bg-white rounded-lg shadow-md h-full overflow-y-auto">
              {/* Chat messages */}
            </div>
            <footer className="bg-gray-100 py-4 px-6 mt-4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Send
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattleAreaPage