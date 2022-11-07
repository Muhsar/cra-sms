/* This example requires Tailwind CSS v2.0+ */
import { ExternalLinkIcon, MailIcon, PencilIcon, PhoneIcon } from '@heroicons/react/outline'
import {Link} from "react-router-dom"
import React from 'react'


export default function Cards({staffs, school}) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {staffs?.map((staff) => (
        <li key={staff.id} className="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow">
          <div className="flex items-center justify-between w-full p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-sm font-medium text-gray-900 truncate">{staff.full_name}</h3>
                
              </div>
              <p className="mt-1 text-sm text-gray-500 truncate">{staff.email}</p>
              {
                staff.groups &&
              <p className="mt-1 text-sm text-gray-500 truncate">Role: {staff.groups && staff.groups[0]?.name}</p>
              }
            </div>
            <img className="flex-shrink-0 object-cover object-center w-16 h-16 bg-gray-300 rounded-full" src={staff.image ? staff.image : staff?.gender === "Male" ? "https://res.cloudinary.com/jewbreel1/image/upload/v1625737172/jewbreel/sms/male_avatar_c3v0vu.png" : "https://res.cloudinary.com/jewbreel1/image/upload/v1625737170/jewbreel/sms/female_avatar_pgqx9s.png"} alt="" />
          </div>
          <div>
            <div className="flex -mt-px divide-x divide-gray-200">
            <Link to={`/staff/${staff.id}`}
               className="flex flex-1 w-0 -ml-px sm:hidden"
            >
              <
               >
                <a
                  href="#"
                  className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <ExternalLinkIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">View</span>
                </a>
              </>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
