/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, MoonIcon, PlusIcon, CakeIcon } from '@heroicons/react/outline'
import { TextareaAutosize } from '@material-ui/core';

export default function MessageComponent({type, open, setOpen}) {
  // const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef()

  return (
    <>
      <div
          className="relative mb-3 transition-all transform hover:scale-95 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-500"
          onClick={()=>setOpen(true)}
      >
          {/* <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={``}
              alt=""
              />
          </div> */}
          <div className="flex-1 min-w-0">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-lg capitalize font-medium text-gray-900">{type.type}</p>
              <p className="text-sm text-gray-500 truncate">{type.description}</p>
            </a>
          </div>
        </div>
    <Transition.Root show={open} as={Fragment}>
        <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto w-full"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={()=>setOpen(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg w-full px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <type.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-grow">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    {type.type}
                  </Dialog.Title>
                  <form onSubmit={(e)=>e.preventDefault()} className="mt-2 w-full">
                    <p className="text-sm text-gray-500 mb-3">
                      {type.description}
                      </p>
                      <div className="w-full">
                      {type.Component && type.Component}
                      </div>
                      <TextareaAutosize placeholder="Enter Text Message Here....................." rowsMin={4} className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm" />
                  </form>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Send
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
      </Transition.Root>
      </>
  )
}
