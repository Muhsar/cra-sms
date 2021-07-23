/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExternalLinkIcon, XIcon } from "@heroicons/react/outline";
import StudentProfile from "School/Students/StudentProfile2";
import StaffProfile from 'School/Staffs/StaffProfile';


export default function ProfileSlideOver({ open, setOpen, person, page }) {

  return (
    <>
      {/* <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        onClick={() => setOpen(true)}
      >
                        View
                      </a> */}
      <td className="px-6 hidden sm:inline py-4 whitespace-nowrap cursor-pointer" onClick={() => setOpen(true)}>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-center object-cover"
                            src={
                              person.gender === "Male"
                                ? "https://res.cloudinary.com/jewbreel1/image/upload/v1625737172/jewbreel/sms/male_avatar_c3v0vu.png"
                                : "https://res.cloudinary.com/jewbreel1/image/upload/v1625737170/jewbreel/sms/female_avatar_pgqx9s.png"
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {!person.user && person.full_name}
              {
                person.user && person.user.full_name
              }
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.user ? person.user.email : person.email}
                          </div>
                        </div>
                      </div>
                    </td>
      <div className="-ml-px w-0 flex-1 flex sm:hidden" onClick={()=>setOpen(true)}>
                <a
                  href="#"
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <ExternalLinkIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">View</span>
                </a>
              </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden"
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16" style={{marginTop: 70}}>
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          id="slide-over-heading"
                          className="text-lg font-medium text-gray-900"
                        >
                          Profile
                        </h2>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {
                      page==="Student" && <StudentProfile data={person} />
                    }
                    {
                      page==="Staff" && <StaffProfile data={person} />
                    }
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
