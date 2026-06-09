import { LoaderCircle } from "lucide-react";

const LoadingOverlay = ({ text = "Loading...", isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        {/* Logo Circle */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-2xl animate-pulse" />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-emerald-500/30 bg-zinc-900">
            <LoaderCircle size={42} className="text-gray-500 animate-spin" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-white">{text}</h2>

          <div className="mt-2 flex gap-1">
            <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" />
            <span
              className="h-2 w-2 rounded-full bg-gray-500 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
