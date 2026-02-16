import React, { useEffect, useState } from "react";
import OneTeamsLogo from "../assets/OneTeamsLogo.svg";
import { ArrowRight, UserLock } from "lucide-react";
import {
  CLIENT_STATE,
  REDIRECT_URL,
  CLIENT_ID,
  AUTH_CLIENT_URL,
} from "../utils/env";

const SSO_URL = `${AUTH_CLIENT_URL}/sso?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${CLIENT_STATE}`;

const BackgroundAnimation = () => (
  <div className="absolute inset-0 -z-10 bg-sky-50" />
);

const HomePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userdata");
    if (!storedUser) {
      setLoading(false);
      return;
    }
    try {
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem("userdata");
    }
    setLoading(false);
  }, []);

  const login = () => (window.location.href = SSO_URL);
  const logout = () => {
    localStorage.removeItem("userdata");
    setUser(null);
  };

  if (loading) return null;

  return (
    <div className="relative min-h-screen px-6 text-gray-800">
      <BackgroundAnimation />

      {!user ? (
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="w-full max-w-4xl p-10 pr-20 rounded-2xl grid md:grid-cols-2 bg-white/80 border border-sky-200 items-center gap-16 z-10">
            <div className="flex justify-center md:justify-center relative">
              <img
                src={OneTeamsLogo}
                alt="OneTeams Logo"
                className="relative h-80 w-auto transition duration-700 hover:scale-105"
              />
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold text-gray-800 leading-tight">
                  One <span className="text-sky-500">Teams</span> requires
                  authentication
                </h1>
                <p className="text-gray-500 text-base leading-relaxed max-w-md">
                  Discover events, join teams, and create projects seamlessly.
                  Verify your identity with{" "}
                  <span className="font-medium text-sky-600">OneAuth</span> to
                  get started.
                </p>
              </div>

              <button
                onClick={login}
                className="group px-6 py-4 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-100 via-sky-200 to-sky-300 hover:shadow-lg transition-all duration-300 flex items-center gap-4 active:scale-95"
              >
                <UserLock className="text-sky-500" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    Continue with One Account
                  </p>
                  <p className="text-xs text-gray-500">
                    For all your workspaces
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-sky-600 transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="w-full max-w-lg bg-white rounded-3xl p-10 space-y-8 shadow-xl border border-sky-100 z-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <span className="font-medium">Department:</span>{" "}
                {user.department}
              </div>
              <div>
                <span className="font-medium">Role:</span>{" "}
                <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs">
                  {user.role}
                </span>
              </div>
              <div>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={
                    user.isAvailable
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {user.isAvailable ? "Available" : "Not Available"}
                </span>
              </div>
              <div>
                <span className="font-medium">Skills:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.skills?.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium">About:</span>
                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {user.description}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={logout}
                className="w-full bg-red-500 text-white py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-red-600 active:scale-95"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
