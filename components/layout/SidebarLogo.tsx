import { useRouter } from "next/router";
import React from "react";
import { BsTwitter } from "react-icons/bs";

export const SidebarLogo = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="
  rounded-full
  h-14
  w-14
  p-4
  flex
  items-center
  justify-center
  hover:bg-blue-300
  cursor-pointer
  transition
  "
    >
      <BsTwitter size={28} color="white" />
    </button>
  );
};
