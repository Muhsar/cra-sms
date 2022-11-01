import React, { Fragment, useState } from "react";
import { Link, useHistory, withRouter, Redirect } from 'react-router-dom';
import { motion } from "framer-motion";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { AttachMoneyOutlined } from "@material-ui/icons";

import {
  BellIcon,
  UserGroupIcon,
  ChatAlt2Icon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
  OfficeBuildingIcon,
  ClipboardListIcon,
  BookOpenIcon,
  CogIcon,
  ChevronDownIcon,
  SearchIcon,
  SortAscendingIcon,
  HashtagIcon,
  CakeIcon,
  LogoutIcon
} from "@heroicons/react/outline";
// import history from '../pages/secretary/student/[student]/history';
const navigation = [
   { name: "Dashboard", href: "secretary/", icon: HomeIcon, current: true },
  {
    name: "Classes",
    href: "secretary/classes",
    icon: OfficeBuildingIcon,
    current: false,
  },
  {
    name: "Students",
    href: "secretary/students",
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: "Staffs",
    href: "secretary/staffs",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Courses",
    href: "secretary/courses",
    icon: BookOpenIcon,
    current: false,
  },
  {
    name: "Fee Management",
    href: "secretary/fees",
    icon: AttachMoneyOutlined,
    current: false,
  },
  {
    name: "Messages",
    href: "secretary/sms",
    icon: ChatAlt2Icon,
    current: false,
  },
  { name: "Birthdays", href: "secretary/birthdays", icon: CakeIcon, current: false },
  // { name: 'Settings', href: 'staff/setting', icon: CogIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const easing = [.6, -.05, .01, .99]
const fadeInUp = {
  initial: {
    y: 100,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: .6,
      ease: easing
    }
  }
}
export default function SecretaryLayout({ Component, currentPage }) {

  const slug = localStorage?.schoolSlug && localStorage?.schoolSlug 
  const history = useHistory()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const localLogo =
    typeof window !== "undefined" && localStorage?.getItem("schoolLogo");
  const [logo, setLogo] = React.useState("");
  React.useEffect(() => {
    typeof window !== "undefined" &&
      localLogo &&
      localLogo !== "undefined" &&
      setLogo(localLogo);
  }, [localLogo]);
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      className="flex h-screen overflow-hidden bg-gray-100"
    >
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-40 flex md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="w-auto h-8"
                  src="https://res.cloudinary.com/jewbreel1/image/upload/v1627500985/sms/Logo/staff_logo_labbas.png"
                  alt="Workflow"
                />
              </div>
              <div className="flex-1 h-0 mt-5 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link key={item.name} to={`/${slug}/${item.href}`}
                        className={classNames(
                          item.name === currentPage
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                    >
                      <
                        // href="#"
                      >
                        <item.icon
                          className={classNames(
                            item.name === currentPage
                              ? "text-gray-300"
                              : "text-gray-400 group-hover:text-gray-300",
                            "mr-4 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </>
                    </Link>
                  ))}
                  <a
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer",
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    )}
                    onClick={() => {
                      typeof window !== "undefined" &&
                        localStorage?.removeItem("easysch_token");
                      typeof window !== "undefined" &&
                        localStorage?.removeItem("schoolId");
                      typeof window !== "undefined" &&
                        localStorage?.removeItem("schoolSlug");
                      typeof window !== "undefined" &&
                        localStorage?.removeItem("schoolName");
                      typeof window !== "undefined" &&
                        localStorage?.removeItem("schoolLogo");
                      window.location.href =`/${slug}`;
                    }}
                  >
                    <LogoutIcon
                      className={classNames(
                        "text-gray-400 group-hover:text-gray-300",
                        "mr-4 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    Log Out
                  </a>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <motion.div variants={fadeInUp} className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 h-0">
            <div className="flex items-center flex-shrink-0 h-16 px-4 bg-gray-900">
              <img
                className="w-auto h-8"
                src="https://res.cloudinary.com/jewbreel1/image/upload/v1627500985/sms/Logo/staff_logo_labbas.png"
                alt="Workflow"
              />
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1 bg-gray-800">
                {navigation.map((item) => (
                  <Link key={item.name} to={`/${slug}/${item.href}`}
                      className={classNames(
                        item.name === currentPage
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                  >
                    <
                    >
                      <item.icon
                        className={classNames(
                          item.name === currentPage
                            ? "text-gray-300"
                            : "text-gray-400 group-hover:text-gray-300",
                          "mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </>
                  </Link>
                ))}
                <a
                  className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer",
                    "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  )}
                  onClick={() => {
                    typeof window !== "undefined" &&
                      localStorage?.removeItem("easysch_token");
                    typeof window !== "undefined" &&
                      localStorage?.removeItem("schoolId");
                    typeof window !== "undefined" &&
                      localStorage?.removeItem("schoolSlug");
                    typeof window !== "undefined" &&
                      localStorage?.removeItem("schoolName");
                    typeof window !== "undefined" &&
                      localStorage?.removeItem("schoolLogo");
                    window.location.href =`/${slug}`;
                  }}
                >
                  <LogoutIcon
                    className={classNames(
                      "text-gray-400 group-hover:text-gray-300",
                      "mr-4 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  Log Out
                </a>
              </nav>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-white shadow">
          <button
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
          </button>
          <div className="flex justify-between flex-1 px-4 md:hidden">
            <div className="flex flex-1">
              <div className="flex w-full md:ml-0">
                <label htmlFor="search_field" className="sr-only">
                  Search
                </label>
                <div className="relative flex flex-row w-full text-gray-400 focus:outline-none">
                  <img
                    className="object-contain object-center w-16 h-16 p-1 ml-2 rounded-full"
                    src={logo}
                  />
                  <div className="flex items-center ml-3 text-2xl font-extrabold text-gray-800 pointer-events-none">
                    {typeof window !== "undefined" &&
                      localStorage?.getItem("schoolName")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-full px-4 mx-auto sm:px-4 md:px-4">
              {/* <h1 className="text-2xl font-semibold text-gray-900">{currentPage}</h1> */}
            </div>
            <div className="max-w-full px-4 mx-auto sm:px-4 md:px-4">
              {/* Replace with your content */}
              {/* <div className="py-4">
                <div className="border-4 border-gray-200 border-dashed rounded-lg h-96" />
              </div> */}
              {Component}
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
