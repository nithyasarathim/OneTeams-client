import { useSelector } from "react-redux";
import LogoutButton from "../oAuth/component/logout.button";

const HomePage = () => {
  const user = useSelector((state: any) => state.user.data);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-500 animate-pulse text-lg">
          Loading session...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
        <div className="flex justify-center mb-4">
          <img
            src={user.profileUrl}
            alt={user.username}
            className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          {user.username}
        </h1>
        <p className="text-gray-500 text-sm mb-4">{user.email}</p>

        <p className="text-gray-600 italic mb-8">
          "{user.description || "No description provided."}"
        </p>

        <div className="flex flex-col space-y-3 mb-8">
          <a
            href={user.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-4 bg-[#0077b5] text-white rounded-md font-medium hover:bg-opacity-90 transition"
          >
            LinkedIn Profile
          </a>
          <a
            href={user.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-4 bg-[#24292e] text-white rounded-md font-medium hover:bg-opacity-90 transition"
          >
            GitHub Profile
          </a>
        </div>

        <div className="border-t pt-6">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
