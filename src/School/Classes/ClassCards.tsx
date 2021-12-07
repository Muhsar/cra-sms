import {Link} from "react-router-dom"
import React from 'react'

export default function ClassCards({rooms, school}) {
  return (
    <div className="flex flex-wrap pt-5 -m-2" id="Classes">
      {rooms?.map((room: any) => (
      <Link to={`/${school}/school/class/${room.id}`}
          className="w-full p-2 lg:w-1/3 md:w-1/2 sm:w-full searchBody"
          key={room.id}
      >
        <>
          <div className="flex items-center h-full p-4 transform bg-gray-100 border border-gray-200 rounded-lg shadow cursor-pointer hover:scale-105 hover:bg-gray-200">
            <div
              className={`avatar avatar-lg text-white flex-shrink-0 rounded-full mr-4 bg-gray-700 p-3`}
            >
            </div>
            <div className="flex-grow">
              <h2 className="font-medium text-gray-900 title-font">{room?.name}</h2>
            </div>
          </div>
        </>
        </Link>
      ))}
    </div>
  )
}
