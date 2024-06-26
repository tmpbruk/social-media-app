import { useRouter } from "next/router";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div
      className="
  border-b-[1px]
  border-neutral-800 p-5
  "
    >
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            size={24}
            onClick={handleBack}
            color="white"
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-white text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};
