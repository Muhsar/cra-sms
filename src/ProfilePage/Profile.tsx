import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import React from 'react'

const profile = {
  name: 'Ricardo Cooper',
  email: 'ricardo.cooper@example.com',
  avatar:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  backgroundImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  fields: [
    ['Phone', '(555) 123-4567'],
    ['Email', 'ricardocooper@example.com'],
    ['Title', 'Senior Front-End Developer'],
    ['Team', 'Product Development'],
    ['Location', 'San Francisco'],
    ['Sits', 'Oasis, 4th floor'],
    ['Salary', '$145,000'],
    ['Birthday', 'June 8, 1990'],
  ],
}

export default function Profile({data, details}) {
  return (
    <>
      <div>
      <div>
        <img className="h-32 w-full object-cover lg:h-48" src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737194/jewbreel/sms/avatar_vk7vtd.jpg" alt="" />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 transition-all transform hover:scale-105 object-center object-cover" src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737194/jewbreel/sms/avatar_vk7vtd.jpg" alt="" />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">{data?.user?data?.full_name:data?.full_name}</h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <MailIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <span>Message</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <PhoneIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <span>Call</span>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">{data?.user?data?.full_name:data?.full_name}</h1>
        </div>
    {/* <div className="flex flex-wrap -m-1 pt-5" id="Guests">
      {details?.map((detail: any) => (
        <div
          className="w-full p-2 lg:w-1/2 md:w-1/2 sm:w-full searchBody"
          key={detail.email}
        >
          <div className="flex items-center h-full p-4 transform border border-gray-200 rounded-lg shadow hover:scale-105  cursor-pointer hover:bg-gray-200 bg-gray-100">
          <div
              className={`avatar avatar-lg text-white flex-shrink-0 rounded-full mr-4 bg-gray-700 p-3`}
            >
            </div>
            <div className="flex-grow flex-col">
              <h2 className="font-medium text-gray-900 title-font">{detail.param}</h2>
              <p className="font-medium text-gray-900 title-font">{detail.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div> */}
      </div>
    <div className=" shadow overflow-hidden w-full mx-auto pt-5 px-5 sm:rounded-lg">
      <div className="border-t border-gray-200">
        <dl>
          {details.map(
            (detail: {
              param:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal;
              value:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal;
            }) => (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 transform transition-all hover:scale-105">
                <dt className="text-sm font-medium text-gray-500">
                  {detail.param}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {detail.value}
                </dd>
              </div>
            )
          )}
        </dl>
      </div>
    </div>
    </div>
    </>
  )
}
