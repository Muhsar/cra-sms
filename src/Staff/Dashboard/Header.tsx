import React from 'react'
import { images } from 'components/images'

const user = {
  name: 'Rebecca Nicholas',
  role: 'Product Designer',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const stats = [
  { label: 'Vacation days left', value: 12 },
  { label: 'Sick days left', value: 4 },
  { label: 'Personal days left', value: 2 },
]

export default function Header({teacher}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-lg bg-white overflow-hidden shadow">
      <h2 className="sr-only" id="profile-overview-title">
        School Profile
      </h2>
      <div className="bg-white p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img className="mx-auto h-20 w-20 object-contain object-center" src={images?.logo} alt="" />
              {/* <img className="mx-auto h-20 w-20 object-cover object-center" src={"/img/logo.jpeg"} alt="" /> */}
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              {/* <p className="text-sm font-medium text-gray-600">Welcome back,</p> */}
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">Best Enkefalos College</p>
              <p className="text-sm font-medium text-gray-600 capitalize">beskenkefaloscollege@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="rounded-lg bg-white overflow-hidden shadow">
      <h2 className="sr-only" id="profile-overview-title">
        Profile Overview
      </h2>
      <div className="bg-white p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img className="mx-auto h-20 w-20 rounded-full object-cover object-center" src={teacher?.user.image} alt="" />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-600">Welcome back,</p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">{teacher?.user.full_name}</p>
              <p className="text-sm font-medium text-gray-600 capitalize">{teacher?.user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
