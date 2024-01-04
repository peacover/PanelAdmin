"use client";

import React from "react";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/lib/hooks/useScroll";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import mini_logo from "@/public/icons/mini_logo.svg";

const Header = () => {
//   const scrolled = useScroll(5);
//   const selectedLayout = useSelectedLayoutSegment();

  return (
    // <div
    //   className={cn(
    //     `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
    //     {
    //       "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
    //       "border-b border-gray-200 bg-white": selectedLayout,
    //     }
    //   )}
    // >
      <div className="flex h-[70px] items-center justify-between px-4">
        <div className="flex items-center ">
          <Link
            href="/dashboard"
            className="flex flex-row ml-4 items-center justify-center md:hidden"
          >
            <Image
              src={mini_logo}
              alt="Community Image"
              priority={true}
              width="0"
              height="0"
              sizes="100vw"
              className="w-[80px] h-[50px]"
            />
          </Link>
        </div>

        <div className="hidden md:block"></div>
      </div>
    // </div>
  );
};

export default Header;
