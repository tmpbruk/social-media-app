import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import React from "react";
import { FaFeather } from "react-icons/fa";

export const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const handleClick = () => {
    if (!currentUser) {
      loginModal.onOpen();
    } else {
      router.push("/");
    }
  };

  return (
    <div onClick={handleClick}>
      <div
        className="
    mt-6
    lg:hidden
    rounded-full
    h-14
    w-14
    p-4
    flex
    items-center
    justify-center
    bg-sky-500
    hover:bg-opacity-80
    transition
    cursor-pointer
    "
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="
      mt-6
      hidden
      lg:block
      px-4
      py-2
      rounded-full
      bg-sky-500
      hover:bg-opacity-80
      transition
      cursor-pointer

      "
      >
        <p
          className="
         text-white
         lg:block
         text-center
         font-semibold
         text-[20px]     
        "
        >
          Tweet
        </p>
      </div>
    </div>
  );
};
