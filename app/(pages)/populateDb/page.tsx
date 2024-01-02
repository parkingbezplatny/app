"use client";

import React from "react";
import { populate } from "@/lib/parkings/parkingListToDb";

function PopulateDb() {
  const p = async () => {
    await populate();
  };

  return (
    <div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await p();
        }}
      >
        Populate
      </button>
    </div>
  );
}

export default PopulateDb;
