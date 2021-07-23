import { ChevronLeftIcon } from '@heroicons/react/outline'
import React from 'react'
import Sidenav from './Sidenav'

export default function ProfilePage({Component, user, userId, page, school}) {
  return (
    <>
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
      <nav aria-label="Breadcrumb" className="bg-white border-b border-blue-gray-200 xl:hidden">
              <div className="max-w-3xl mx-auto py-3 px-2 flex items-start sm:px-2 lg:px-2">
                <a href="#" className="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900">
                  <ChevronLeftIcon className="h-5 w-5 text-blue-gray-400" aria-hidden="true" />
                  <span>Settings</span>
                </a>
              </div>
            </nav>

      <div className="flex-1 flex xl:overflow-hidden">
              <Sidenav user={user} userId={userId} page={page} school={school} />
              <div className="flex-grow">
        {Component}
              </div>
            </div>
            </div>
            </main>
            </div>
    </>
  )
}
