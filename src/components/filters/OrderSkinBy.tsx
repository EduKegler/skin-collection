"use client";

import { memo, ReactNode, useMemo } from "react";
import { Dropdown } from "flowbite-react";
import { PrimaryButton } from "../PrimaryButton";
import { FaAngleDown } from "react-icons/fa";
import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";
import { IOrderBy } from "@/type";

export const OrderSkinBy = memo(function OrderSkinBy() {
  const { orderBy } = useUserPreference();
  const { handleUpdateOrderBy } = useUserPreferenceDispatch();

  const labels: Record<IOrderBy, ReactNode> = useMemo(() => {
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
        <Dropdown.Item onClick={() => handleUpdateOrderBy("ReleaseDate")}>
          {labels["ReleaseDate"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleUpdateOrderBy("Rarity")}>
          {labels["Rarity"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleUpdateOrderBy("Reviews")}>
          {labels["Reviews"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleUpdateOrderBy("Rating")}>
          {labels["Rating"]}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
});
