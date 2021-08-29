import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  MenuIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/react/solid'
export default function Hero({images}) {
  return (
    <>
      <div className="min-h-screen pt-10 bg-gray-900 sm:pt-16 md:pt-8 md:pb-14 md:overflow-hidden">
            <div className="mx-auto max-w-7xl md:px-8">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center md:px-0 md:text-left md:flex md:items-center">
                  <div className="md:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl md:mt-6 xl:text-6xl">
                      <span className="block">A better way to</span>
                      <span className="bg-clip-text text-white bg-gradient-to-r from-teal-200 to-cyan-400 block">
                        Manage Your School
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl md:text-md xl:text-xl capitalize">
                     
                    </p>
                    <div className="mt-10 sm:mt-12">
                      <div className="sm:max-w-xl sm:mx-auto md:mx-0">
                        <div className="sm:flex">
                          {/* <div className="min-w-0 flex-1">
                            <label htmlFor="email" className="sr-only">
                              Email address
                            </label>
                            <input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                            />
                          </div> */}
                          <div className="mt-3 sm:mt-0 sm:ml-3 flex-1">
                            <button
                              type="submit"
                              className="block w-full py-3 px-4 rounded-md shadow bg-white text-cyan-600 font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                            >
                              Create Account
                            </button>
                          </div>
                          <div className="mt-3 sm:mt-0 sm:ml-3 flex-1">
                            <button
                              type="submit"
                              className="block w-full py-3 px-4 rounded-md shadow bg-white text-cyan-600 font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                            >
                              Login
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 md:m-0 md:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 md:max-w-none md:px-0">
                    {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                    <div className="w-full md:absolute md:inset-y-0 md:left-0 md:h-full h-screen md:w-auto md:max-w-none">
                    <Carousel

    animation="slide"
    interval={10000}
    swipe={true}
              indicatorContainerProps={{
            className: "sr-only",
    style: {
        display: 'none', // 5
    }

}}
    >
        {
            images?.map( (item, i) => <img
            key={i}
                      className=" object-center object-contain"
                      src={item}
                      alt=""
                    /> )
        }
    </Carousel>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}
