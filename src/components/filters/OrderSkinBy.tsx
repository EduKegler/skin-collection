"use client";

import { memo, useMemo } from "react";
import { Dropdown } from "flowbite-react";
import { useFilter, useFilterDispatch } from "@/providers/FilterProvider";
import { PrimaryButton } from "../PrimaryButton";
import { FaAngleDown } from "react-icons/fa";

export const OrderSkinBy = memo(function OrderSkinBy() {
  const { orderBy } = useFilter();
  const { setOrderBy } = useFilterDispatch();

  const labels = useMemo(() => {
    return {
      ReleaseDate: "Release Date",
      Rarity: "Rarity",
      Reviews: "Reviews",
      Rating: "Rating",
    };
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <span>Order By: </span>
      <Dropdown
        label={labels[orderBy as keyof typeof labels]}
        renderTrigger={() => (
          <div className="relative">
            <PrimaryButton>
              <div className="flex gap-2 items-center">
                {labels[orderBy as keyof typeof labels]} <FaAngleDown />
              </div>
            </PrimaryButton>
          </div>
        )}
      >
        <Dropdown.Item onClick={() => setOrderBy("ReleaseDate")}>
          {labels["ReleaseDate"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setOrderBy("Rarity")}>
          {labels["Rarity"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setOrderBy("Reviews")}>
          {labels["Reviews"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setOrderBy("Rating")}>
          {labels["Rating"]}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
});
