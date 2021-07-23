import {Link} from "react-router-dom"
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { useQuery } from 'react-query'
import { getRequest } from 'api/apiCall'
import { COURSESTUDENTS } from 'api/apiUrl'
import { queryKeys } from 'api/queryKey'
import CourseStudents from './CourseStudents'

export default function AssignedCourse({ courses, school }) {
  return (
    <>
      <h2 className="text-xl leading-6 font-medium text-gray-900 py-5">All Assigned Course</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {
          courses?.map((course, index) => (
            <Link to={`/${school}/staff/course/${course.id}`}>
            <div
              key={index}
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 focus-within:ring-2 transition-all transform hover:shadow-md hover:scale-105 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-shrink-0">
            <div className="h-5 w-5 rounded-full bg-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{course.school_class.name} {course.subject.name}</p>
            </a>
          </div>
              </div>
              </Link>
          ))
        }
    </div>
      </>
  )
}
