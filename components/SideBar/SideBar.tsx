"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@iconify/react";
import { SIDENAV_ITEMS } from "@/constants/SideBarData";
import { TSideNavItem } from "@/lib/types/TSideNavItems";
import Image from "next/image";
import logo from "@/public/icons/logo.svg";
import LogoutButton from "./LogoutButton";


const SideBar = () => {
  return (
    <div className="md:w-60 bg-white h-screen flex-col fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col flex-grow">
        <Link
          href="/dashboard"
          className="flex items-center justify-center md:justify-center border-b border-zinc-200 h-[120px] w-full"
        >
          <Image
            src={logo}
            alt="Community Image"
            width="100"
            height="30"
            priority={true}
          />
        </Link>

        <div className="flex flex-col space-y-2 md:px-6 mt-[6rem]">
        {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
      <div className="mb-[3.5rem] flex justify-center">
        <LogoutButton className="inline-flex items-center justify-center w-[10rem] rounded-md text-sm h-10 px-4 py-2 text-white font-bold bg-red-500" />
      </div>
    </div>
  );
};

export default SideBar;

const MenuItem = ({ item }: { item: TSideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname?.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
