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
import { useTranslations } from "next-intl";

export const OrderSkinBy = memo(function OrderSkinBy() {
  const { orderBy } = useUserPreference();
  const { handleUpdateOrderBy } = useUserPreferenceDispatch();

  const translate = useTranslations("OrderSkinBy");

  const labels: Record<IOrderBy, ReactNode> = useMemo(() => {
    return {
      ReleaseDate: translate("releaseDate"),
      Rarity: translate("rarity"),
      Reviews: translate("reviews"),
      Rating: translate("rating"),
    };
  }, [translate]);

  return (
    <div className="flex gap-4 items-center">
      <span>{translate("title")}</span>
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
