import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-emerald-900 z-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>



      {/* Optional text */}
      <p className="text-white mt-4 absolute top-[60%] text-lg font-medium">
        Loading...
      </p>
    </div>
    // <span className="loading loading-bars loading-xl"></span>
  );
};

export default Loading;
