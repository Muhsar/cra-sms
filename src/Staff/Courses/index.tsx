import React from 'react'
import Title from './Title'
import Table from './Table'
import CourseCards from './CourseCards'

export default function StaffCourses({courseList, school}) {
  return (
    <>
      {/* <Title handleSearch={handleSearch} /> */}
      <CourseCards courses={courseList} school={school} />
    </>
  )
}
