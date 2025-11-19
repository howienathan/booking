
import React from "react";

import HeaderSection from "../../../components/header-Section";
import MasonaryGrid from "../../../components/masonaryGrid";

export const metadata = {
  title: "about",
  description: "Who we are",
};

export default function Galery() {
  return (
    <div>
      <HeaderSection title="Galery" subTitle="Lorem ipsum dolor sit amet." />

      <div className="max-w-screen-xl py-[8rem] mx-auto">
        <div className="flex flex-col items-center text-center gap-4 mb-10 px-4">
          <h1 className="text-4xl font-semibold">
            All Memories About Salon Mimi
          </h1>
          <p className="max-w-2xl text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            eveniet esse reiciendis accusantium voluptatum consequatur
            laboriosam qui voluptates itaque facere.
          </p>
        </div>

        <MasonaryGrid />
      </div>
    </div>
  );
}
