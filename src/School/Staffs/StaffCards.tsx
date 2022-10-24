import {Link} from "react-router-dom"
import React from 'react'

export default function StaffCards({staffs, school}) {
  return (
    <div className="flex flex-wrap -m-1 pt-5" id="Guests">
      {staffs?.map((staff: any) => (
      <Link to={`/${school}/school/staff/${staff.id}`}
          className="w-full p-2 lg:w-1/3 md:w-1/2 sm:w-full searchBody"
          key={staff.id}
      >
        <
        >
          <div className="flex items-center h-full p-4 transform border border-gray-200 rounded-lg shadow hover:scale-105  cursor-pointer hover:bg-gray-200 bg-gray-100">
            <img
                className={`avatar avatar-lg h-10 w-10 rounded-full object-center object-cover mr-4`}
                src={staff.image ? staff.image : `/img/${staff.gender==="Male"?"":"fe"}male_avatar.png`}
            />
            <div className="flex-grow">
              <h2 className="font-medium text-gray-900 title-font">{staff.full_name}</h2>
            </div>
          </div>
        </>
        </Link>
      ))}
    </div>
  )
}
