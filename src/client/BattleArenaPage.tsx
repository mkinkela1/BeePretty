import TopMenu from "./components/TopMenu";

const BattleAreaPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <TopMenu/>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex sm:flex-col md:flex-col lg:flex-row justify-center sm:items-center md:items-center">
          <div className="lg:w-1/2 p-4">
            <div className="relative aspect-w-1 aspect-h-1">
              <div className="inset-0 rounded-lg overflow-hidden">
                <img
                  src="https://via.placeholder.com/500x500" // Replace with the actual image source
                  alt="Contestant 1"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 p-4">
            <div className="relative aspect-w-1 aspect-h-1">
              <div className="inset-0 rounded-lg overflow-hidden">
                <img
                  src="https://via.placeholder.com/500x500" // Replace with the actual image source
                  alt="Contestant 2"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattleAreaPage