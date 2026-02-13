import { Key } from "lucide-react";

const CallBackPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-sky-50 to-white">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-sky-200 opacity-40 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-sky-100"></div>
          <Key className="relative text-sky-600 w-8 h-8 animate-bounce-slow" />
        </div>
        <p className="mt-8 text-lg font-semibold text-gray-700">
          Verifying your identity
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Please wait while we securely confirm your details.
        </p>

        
      </div>
    </div>
  );
};

export default CallBackPage;
