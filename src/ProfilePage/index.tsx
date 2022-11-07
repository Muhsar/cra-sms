import { ChevronDownIcon } from "@heroicons/react/outline";
import {
  BellIcon,
  KeyIcon,
  PhotographIcon,
  CashIcon,
  UserIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import React from "react";
import { PencilIcon } from "@heroicons/react/outline";
import { AttachMoneyOutlined, CancelOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Sidenav from "./Sidenav";

export default function ProfilePage({ Component, user, userId, page, school }) {
  const subNavigation =
    user === "student"
      ? [
          {
            name: "Profile",
            href: `/${user}/${userId}`,
            icon: UserIcon,
            current: true,
          },
          {
            name: "Courses",
            href: `/${user}/${userId}/courses`,
            icon: BookOpenIcon,
            current: false,
          },
          {
            name: "Fee history",
            href: `/${user}/${userId}/history`,
            icon: AttachMoneyOutlined,
            current: false,
          },
          {
            name: "Edit",
            href: `/${user}/${userId}/edit`,
            icon: PencilIcon,
            current: false,
          },
          {
            name: "Action",
            href: `/${user}/${userId}`,
            icon: CancelOutlined,
            current: false,
          },
        ]
      : [
          {
            name: "Profile",
            href: `/${user}/${userId}/`,
            icon: UserIcon,
            current: true,
          },
          {
            name: "Courses",
            href: `/${user}/${userId}/courses`,
            icon: BookOpenIcon,
            current: false,
          },
          {
            name: "Edit",
            href: `/${user}/${userId}/edit`,
            icon: PencilIcon,
            current: false,
          },
          {
            name: "Action",
            href: `/${user}/${userId}/`,
            icon: CancelOutlined,
            current: false,
          },
        ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
            {/* <nav
              aria-label="Breadcrumb"
              className="bg-white border-b border-blue-gray-200 xl:hidden"
            >
              <div className="max-w-3xl mx-auto py-3 px-2 flex items-start sm:px-2 lg:px-2">
                <a
                  href="#"
                  className="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900"
                >
                  <span className="pl-5">Settings</span>
                  <ChevronDownIcon
                    className="h-5 w-5 text-blue-gray-400"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </nav> */}
            <div className="xl:hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {subNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  item.name === page
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                )}
                aria-current={item.name === page ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

            <div className="flex-1 flex xl:overflow-hidden">
              <>
                <nav
                  aria-label="Sections"
                  className="hidden flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col h-screen"
                >
                  <div className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
                    <p className="text-lg font-medium text-blue-gray-900">
                      Settings
                    </p>
                  </div>
                  <div className="flex-1 min-h-0 overflow-y-auto">
                    {subNavigation.map((item) => (
                      <Link
                        to={item.href}
                        className={classNames(
                          item.name === page
                            ? "bg-blue-50 bg-opacity-50"
                            : "hover:bg-blue-50 hover:bg-opacity-50",
                          "flex p-6 border-b border-blue-gray-200"
                        )}
                        key={item.name}
                      >
                        <>
                          <item.icon
                            className="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400"
                            aria-hidden="true"
                          />
                          <div className="ml-3 text-sm">
                            <p className="font-medium text-blue-gray-900">
                              {item.name}
                            </p>
                          </div>
                        </>
                      </Link>
                    ))}
                  </div>
                </nav>
              </>
              <div className="flex-grow mt-3">{Component}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
