import OneTeamsLogo from "../assets/OneTeamsLogo.svg";
import { ArrowRight, UserLock } from "lucide-react";
import {
  CLIENT_STATE,
  REDIRECT_URL,
  CLIENT_ID,
  AUTH_CLIENT_URL,
} from "../utils/env";

const SSO_URL = `${AUTH_CLIENT_URL}/sso?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${CLIENT_STATE}`;

const OAuthBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-sky-50 to-sky-100">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-sky-300 opacity-20 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-blue-200 opacity-20 blur-3xl rounded-full" />
    </div>
  );
};

const OAuthPage = () => {
  const login = () => (window.location.href = SSO_URL);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-6 py-10 text-gray-800">
      <OAuthBackground />

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
    </div>
  );
};

export default OAuthPage;
