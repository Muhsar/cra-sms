import React from "react";
import {Link} from "react-router-dom"
export default function CourseCards({ courses, school }) {
  return (
    <div className="flex flex-wrap -m-2 pt-5" id="Guests">
      {courses?.map((course: any) => (
        <>
          {
            <div
              className="w-full p-2 lg:w-1/3 md:w-1/2 sm:w-full searchBody"
              key={course.id}
            >
              <Link to={`/${school}/staff/course/${course.id}`}>
              <div className="flex items-center h-full p-4 transform border border-gray-200 rounded-lg shadow hover:scale-105  cursor-pointer hover:bg-gray-200 bg-gray-100">
                <div
                  className={`avatar avatar-lg text-white flex-shrink-0 rounded-full mr-4 bg-gray-900 p-3`}
                ></div>
                <div className="flex-grow">
                  <h2 className="font-medium text-gray-900 title-font">
                  {course?.school_class.name} {course?.subject.name}
                  </h2>
                </div>
              </div>
              </Link>
            </div>
          }
        </>
      ))}
    </div>
  );
}
