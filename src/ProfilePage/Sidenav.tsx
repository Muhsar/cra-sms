import {
  BellIcon,
  KeyIcon,
  PhotographIcon,
  CashIcon,
  UserIcon,
  BookOpenIcon
} from "@heroicons/react/outline";
import React from "react";
import { PencilIcon } from '@heroicons/react/outline';
import { AttachMoneyOutlined, CancelOutlined } from "@material-ui/icons";
import {Link} from "react-router-dom";

export default function Sidenav({user, userId, page, school}) {
  const subNavigation = user==="student" ?  [
    {
      name: "Profile",
      href: `/${school}/school/${user}/${userId}/`,
      icon: UserIcon,
      current: true,
    },
    {
      name: "Courses",
      href: `/${school}/school/${user}/${userId}/courses`,
      icon: BookOpenIcon,
      current: false,
    },
    {
      name: "Fee history",
      href: `/${school}/school/${user}/${userId}/history`,
      icon: AttachMoneyOutlined,
      current: false,
    },
    {
      name: "Edit",
      href: `/${school}/school/${user}/${userId}/edit`,
      icon: PencilIcon,
      current: false,
    },
    {
      name: "Action",
      href: `/${school}/school/${user}/${userId}/`,
      icon: CancelOutlined,
      current: false,
    },
  ] :
  [
    {
      name: "Profile",
      href: `/${school}/school/${user}/${userId}/`,
      icon: UserIcon,
      current: true,
    },
    {
      name: "Courses",
      href: `/${school}/school/${user}/${userId}/courses`,
      icon: BookOpenIcon,
      current: false,
    },
    {
      name: "Edit",
      href: `/${school}/school/${user}/${userId}/edit`,
      icon: PencilIcon,
      current: false,
    },
    {
      name: "Action",
      href: `/${school}/school/${user}/${userId}/`,
      icon: CancelOutlined,
      current: false,
    },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <nav
        aria-label="Sections"
        className="hidden flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col h-screen"
      >
        <div className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
          <p className="text-lg font-medium text-blue-gray-900">Settings</p>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          {subNavigation.map((item) => (
            <Link to={item.href}
              className={classNames(
                item.name === page
                ? "bg-blue-50 bg-opacity-50"
                  : "hover:bg-blue-50 hover:bg-opacity-50",
                "flex p-6 border-b border-blue-gray-200"
              )}
              key={item.name}
            >
            <
              >
              <item.icon
                className="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400"
                aria-hidden="true"
                />
              <div className="ml-3 text-sm">
                <p className="font-medium text-blue-gray-900">{item.name}</p>
              </div>
            </>
                </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
