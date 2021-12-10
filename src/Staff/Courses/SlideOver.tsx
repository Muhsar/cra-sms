
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

export default function SlideOver({
  handleChange,
  handleSubmit,
  open,
  setOpen,
  Component}) {
  // const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false)
  }
  // const trigger = Component(setOpen)
  return (
    <>
      {/* <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Add Result
      </button> */}
      {Component}
      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="fixed inset-0 overflow-hidden" open={open} onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10" style={{marginTop: 70}}>
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
                <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">Add or Edit Result</Dialog.Title>
                      <div className="flex items-center ml-3 h-7">
                        <button
                          className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex-1 px-4 mt-6 sm:px-6">
                    {/* Replace with your content */}
                    {/* <div className="absolute inset-0 px-4 sm:px-6">
                      <div className="h-full border-2 border-gray-200" aria-hidden="true" />
                    </div> */}
                      {/* {Component} */}
                      Hey
                    {/* /End replace */}
                  </div>
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
