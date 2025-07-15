"use client";

import dynamic from "next/dynamic";

import LoadingSpinner from "@/components/common/loading-spinner";

const App = dynamic(() => import("@/frontend/app"), {
  ssr: false,
  loading: () => (
    <section className={"w-screen h-screen flex justify-center items-center "}>
      <div>
        <LoadingSpinner />
        <h2 className={"mt-16 text-2xl text-white font-bold text-center"}>
          Connecting to the Cosmos...
        </h2>
        <p className={"text-white/40 text-center"}>
          The stars are aligning your experience
        </p>
      </div>
    </section>
  ),
});

const ShellPage = () => {
  return <App />;
};

export default ShellPage;
