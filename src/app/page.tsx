'use client';

import { useAuth, Introduction } from "@armoyu/ui";
import { Dashboard } from "../components/Dashboard";

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="relative flex h-16 w-16">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-16 w-16 bg-blue-500/20 border-2 border-blue-500 animate-pulse"></span>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <Introduction />;
}
