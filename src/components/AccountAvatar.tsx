"use client";
import { memo, useCallback, useState } from "react";
import { Avatar, Button } from "flowbite-react";
import { useOAuth, useOAuthDispatch } from "@/providers/OAuthProvider";
import { IoMdLogOut } from "react-icons/io";
import { LogoutModal } from "./LogoutModal";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/contants";

export const AccountAvatar = memo(function AccountAvatar() {
  const [visible, setVisible] = useState(false);
  const { nickName, level, profileIconId } = useOAuth();
  const { setConnected } = useOAuthDispatch();

  const router = useRouter();

  const handleLogout = useCallback(async () => {
    router.push(ROUTE.LOGOUT);
    setVisible(false);
    setConnected(false);
  }, [router, setConnected]);

  return (
    <div className="flex justify-between items-center gap-4">
      <Avatar
        img={`https://ddragon.leagueoflegends.com/cdn/14.14.1/img/profileicon/${profileIconId}.png`}
        rounded
        size={"sm"}
      >
        <div className="space-y-1 font-medium dark:text-white">
          <div className="text-sm">{nickName}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Level: {level}</div>
        </div>
      </Avatar>
      <Button onClick={() => setVisible(true)} size={"sm"} color={"gray"}>
        <IoMdLogOut />
      </Button>
      <LogoutModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
});
