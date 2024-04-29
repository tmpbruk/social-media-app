import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  userId,
  isLarge,
  hasBorder,
}) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  const handleClick = (e: any) => {
    e.stopPropagation();

    const url = `/users/${userId}`;

    router.push(url);
  };

  return (
    <div
      className={`
    ${hasBorder ? "border-4 border-black" : ""}
    ${isLarge ? "h-32" : "h-12"}
    ${isLarge ? "w-32" : "w-12"}
    rounded-full
    hover:opacity-90
    cursor-pointer
    relative
    transition
  `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={handleClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};
