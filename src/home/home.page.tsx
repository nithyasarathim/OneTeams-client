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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome,{" "}
            <span className="text-blue-600">{user.username || "User"}</span>
          </h1>
          <LogoutButton />
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500 uppercase font-semibold">
                Role
              </p>
              <p className="text-gray-800">{user.role}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500 uppercase font-semibold">
                Department
              </p>
              <p className="text-gray-800">{user.department}</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500 uppercase font-semibold">
              Description
            </p>
            <p className="text-gray-800 italic">
              {user.description || "No description provided."}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 uppercase font-semibold">
              Status:
            </span>
            <span
              className={`px-2 py-1 rounded text-xs font-bold ${user.isAvailable ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}
            >
              {user.isAvailable ? "AVAILABLE" : "UNAVAILABLE"}
            </span>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase">
              Raw User Data
            </h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
