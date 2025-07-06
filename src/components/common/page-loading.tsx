import React from "react";

import { Pisces } from "../svg-icons/zodiac-signs";

export default function PageLoading() {
  return (
    <section className="grid place-items-center h-dvh">
      <div className="flex items-center gap-1">
        <p className="">Loading</p>
        <Pisces className="size-5 fill-background block spin" />
      </div>
    </section>
  );
}
