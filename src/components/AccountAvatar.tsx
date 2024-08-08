"use client";
import { memo, useCallback, useState } from "react";
import { Avatar, Button } from "flowbite-react";
import { useOAuth, useOAuthDispatch } from "@/providers/OAuthProvider";
import { IoMdLogOut } from "react-icons/io";
import { logout } from "@/actions/logout";
import { LogoutModal } from "./LogoutModal";
export const AccountAvatar = memo(function AccountAvatar() {
  const [visible, setVisible] = useState(false);
  const { nickName, level, profileIconId } = useOAuth();
  const { setConnected } = useOAuthDispatch();

  const handleLogout = useCallback(async () => {
    setVisible(false);
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
      <LogoutModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
});
