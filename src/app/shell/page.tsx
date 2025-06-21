"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("@/frontend/app"), { ssr: false });

const ShellPage = () => {
  return (
    <App />
  );
};

export default ShellPage;
