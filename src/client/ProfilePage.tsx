import TopMenu from "./components/TopMenu";

const ProfilePage = () => {
  const posts = [
    "https://via.placeholder.com/300x300", // Replace with the actual post image sources
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/300x300",
    // Add more post image sources
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <TopMenu />
      <div className="max-w-screen-lg mx-auto p-4">
        <header className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/150" // Replace with the actual profile picture source
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold">Username</h1>
            <p className="text-gray-600">Bio or description</p>
          </div>
        </header>
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <img
              key={index}
              src={post}
              alt={`Post ${index + 1}`}
              className="object-cover w-full h-48 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage