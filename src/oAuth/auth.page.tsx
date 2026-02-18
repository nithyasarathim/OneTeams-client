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

interface User {
  username: string;
  email: string;
}

const OAuthBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-sky-50 to-sky-100">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-sky-300 opacity-20 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-blue-200 opacity-20 blur-3xl rounded-full" />
    </div>
  );
};


const OAuthPage = () => {
  const [user, setUser] = useState<User | null>(null);
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
    <div className="relative min-h-screen w-full flex items-center justify-center px-6 py-10 text-gray-800">
      <OAuthBackground />

      {!user ? (
        <div className="w-full max-w-4xl p-10 rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl grid md:grid-cols-2 items-center gap-16 shadow-lg">
          <div className="flex justify-center">
            <img
              src={OneTeamsLogo}
              alt="OneTeams Logo"
              className="h-72 w-auto"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight">
                Sign in to continue to{" "}
                <span className="text-sky-500">One Teams</span>
              </h1>

              <p className="text-gray-500 text-base leading-relaxed max-w-md">
                Your{" "}
                <span className="font-medium text-sky-600">OneAccount</span> is
                verified through{" "}
                <span className="font-medium text-sky-600">OneAuth</span> to
                provide safe and seamless access.
              </p>
            </div>

            <button
              onClick={login}
              className="group px-6 py-4 rounded-2xl border border-sky-200 bg-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-4 active:scale-95"
            >
              <UserLock className="text-sky-500" />

              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">
                  Continue with One Account
                </p>
                <p className="text-xs text-gray-500">
                  Secure sign-in using your One Auth
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-sky-600 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl p-10 space-y-8 shadow-lg border border-sky-100">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">{user.username}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-red-600 active:scale-95"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default OAuthPage;
