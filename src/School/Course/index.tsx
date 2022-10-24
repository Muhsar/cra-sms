import React from "react"
// import CourseStats from "./CourseStats"
import CourseList from "./CourseList"
import CourseTable from "./CourseTable"
 export default function CoursePage({handleSubmit, course}) {
   return (
     <>
     {/* <CourseStats course={course} /> */}
     <div className="sm:hidden">
     <CourseList />
     </div>
     <div className="sm:block hidden">
     <CourseTable />
     </div>
     </>
   )
 }
