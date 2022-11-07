import {Link} from "react-router-dom"
import React from 'react'

export default function AssignedCourse({ courses, school }) {
  return (
    <>
      <h2 className="py-5 text-xl font-medium leading-6 text-gray-900">All Assigned Course</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {
          courses?.map((course, index) => (
            <Link to={`/course/${course?.school_class.name}/${course?.subject.name}/${course.id}`}
              key={index}
          className="relative flex items-center px-6 py-5 space-x-3 transition-all transform bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 hover:shadow-md hover:scale-105 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
            <>
          <div className="flex-shrink-0">
            <div className="w-5 h-5 bg-gray-600 rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{course.school_class.name} {course.subject.name}</p>
            </div>
          </div>
              </>
              </Link>
          ))
        }
    </div>
      </>
  )
}
