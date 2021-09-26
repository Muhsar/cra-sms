import React from 'react'
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
} from '@heroicons/react/solid'
export default function Features({features, img6}) {
  return (
    <>
        <div className="relative bg-gray-50 pt-16 sm:pt-24 md:pt-32">
            <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl md:px-8 md:max-w-7xl">
              <div>
                {/* <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Serverless</h2> */}
                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  Why EasySCH?.
                </p>
                <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                   Easy SCH is an app that manages and automate activities involved in running a school. It Is An All-In-One School Management System Professionally Developed For A Flexible User Experience
                </p>
              </div>
              <div className="mt-12 -mb-10 sm:-mb-24 md:-mb-80">
                <img
                  className="rounded-md shadow-xl ring-1 ring-black ring-opacity-5 object-center"
                  src={img6}
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* Feature section with grid */}
          <div className="relative bg-white py-16 sm:py-24 md:py-32">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 md:px-8 md:max-w-7xl">
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Features
              </p>
              {/* <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis nunc, ullamcorper
                malesuada. Eleifend condimentum id viverra nulla.
              </p> */}
              <div className="mt-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                  {features.map((feature) => (
                    <div key={feature.name} className="pt-6">
                      <div className="flow-root bg-gray-50 rounded-md px-6 pb-8">
                        <div className="-mt-6">
                          <div>
                            <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-md shadow-md">
                              <img className="h-48 w-48" src={feature.icon} aria-hidden="true" />
                            </span>
                          </div>
                          <h3 className="mt-8 text-md font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                          <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
    </>
  )
}
