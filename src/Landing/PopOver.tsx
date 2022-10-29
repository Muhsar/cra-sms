import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'
import { FaMoneyBillAlt, FaRegMoneyBillAlt, FaUserCog, FaUserFriends, FaUserGraduate, FaUserNurse } from 'react-icons/fa'
import { TbZoomMoney } from 'react-icons/tb'
import { Link } from 'react-router-dom'

export default function PopOver({style}) {
    const solutions = [
        {
          name: 'As Owner',
          href: '/best-college',
          icon: FaUserCog,
        },
        {
          name: 'As Teacher',
          href: '/best-college',
          icon: FaUserGraduate,
        },
        {
          name: 'As Parent/Guardian',
          href: '/best-college',
          icon: FaUserNurse,
        },
      ]
  return (
    <div><Popover className="relative">
    {({ open }) => (
      <>
        <Popover.Button
          className={`
            ${open ? '' : 'text-opacity-90'} ${style} flex items-center justify-center`}
        >
          <span>Log In</span>
          <ChevronDownIcon
            className={`${open ? '' : 'text-opacity-70'}
              ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
            aria-hidden="true"
          />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 ">
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                {solutions.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-900 hover:text-white text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12">
                      <item.icon  className='' />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium ">
                        {item.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover></div>
  )
}
