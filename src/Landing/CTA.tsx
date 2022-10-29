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
} from '@heroicons/react/outline'
import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/react/solid'
import PopOver from './PopOver'
export default function CTA({img1}) {
  return (
    <>
      <div className="relative bg-gray-900">
            <div className="relative h-56 bg-white sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
              <img
                className="w-full h-full object-contain"
                src={img1}
                alt=""
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
            <div className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 md:px-8 md:py-32">
              <div className="md:ml-auto md:w-1/2 md:pl-10">
                {/* <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
                  Award winning support
                </h2> */}
                <p className="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl">We’re here to help</p>
                <p className="mt-3 text-md text-gray-300">
                  Please, contact us to setup ur account.
                  <br/>
                  Tel: (+234) 9078044747
                  <br/>
                  WhatsApp: (+234) 9078044747
                  <br/>
                  Email: Jewbreel1@gmail.com
                </p>
                <div className="mt-8">
                  <div className="inline-flex rounded-md shadow">
                    {/* <PopOver style="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50" /> */}
                    <a
                      href="https://forms.gle/woRYojYbThAp5AqH7"
                      target="_blank"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
                    >
                      Setup Account
                      <ExternalLinkIcon className="-mr-1 ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}
