"use client";
import { memo, useCallback } from "react";
import { Avatar, Button } from "flowbite-react";
import { useOAuth, useOAuthDispatch } from "@/providers/OAuthProvider";
import { IoMdLogOut } from "react-icons/io";
import { logout } from "@/actions/logout";
export const AccountAvatar = memo(function AccountAvatar() {
  const { nickName, level, profileIconId } = useOAuth();
  const { setConnected } = useOAuthDispatch();

  const handleLogout = useCallback(async () => {
    setConnected(false);
    logout();
  }, [setConnected]);

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
      <Button onClick={handleLogout} size={"sm"} color={"gray"}>
        <IoMdLogOut />
      </Button>
    </div>
  );
});
