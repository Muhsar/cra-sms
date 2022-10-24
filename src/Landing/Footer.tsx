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
export default function Footer({footerNavigation}) {
  return (
    <>
      <footer className="bg-gray-50" aria-labelledby="footerHeading">
          <h2 id="footerHeading" className="sr-only">
            Footer
          </h2>
          <div className="max-w-md mx-auto pt-12 px-4 sm:max-w-7xl sm:px-6 md:pt-16 md:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="space-y-8 xl:col-span-1">
                <img
                  className="h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-gray-300.svg"
                  alt="Company name"
                />
                <p className="text-gray-500 text-base">
                  Making the world a better place through constructing elegant hierarchies.
                </p>
                <div className="flex space-x-6">
                  {footerNavigation.social.map((item) => (
                    <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3>
                    <ul className="mt-4 space-y-4">
                      {footerNavigation.solutions.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                    <ul className="mt-4 space-y-4">
                      {footerNavigation.support.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                    <ul className="mt-4 space-y-4">
                      {footerNavigation.company.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                    <ul className="mt-4 space-y-4">
                      {footerNavigation.legal.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-200 py-8">
              <p className="text-base text-gray-400 xl:text-center">&copy; 2020 Workflow, Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </>
  )
}
