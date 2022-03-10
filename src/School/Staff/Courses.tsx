import React from 'react'
import StaffCourseForm from './StaffCourseForm'

export default function Courses({ courses, state, setState, handleSubmit, teacherCourses, open, setOpen, selected, setSelected }) {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  // const [selected, setSelected] = React.useState([])
  React.useEffect(()=>{
    setState({
      ...state,
      subject_class_ids: selected?.map(val => {
        const ids = val.value
        return ids
      }),
      subject_class_names: selected?.map(val => {
        const names = val.label
        return names
      })
    })
  },[selected])
  return (
    <>
    <div className="pb-5 border-b border-gray-200 flex items-center justify-between px-4">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Courses</h3>
      <div>
      <StaffCourseForm courses={courses} handleSelect={handleSelect} state={state} selected={selected} setSelected={setSelected} setState={setState} handleSubmit={handleSubmit} open={open}
                setOpen={setOpen} />
      </div>
      </div>
      <div className="flex flex-wrap -m-2 pt-5 px-2" id="Guests">
      {teacherCourses?.map((course: any) => (
        <div
          className="w-full p-2 lg:w-1/3 md:w-1/2 sm:w-full searchBody"
          key={course.id}
        >
          <div className="flex items-center h-full p-4 transform border border-gray-200 rounded-lg shadow hover:scale-105  cursor-pointer hover:bg-gray-200 bg-gray-100">
            <div
              className={`avatar avatar-lg text-white flex-shrink-0 rounded-full mr-4 bg-gray-700 p-3`}
            >
            </div>
            <div className="flex-grow">
              {
                course?.state &&
              <h2 className="font-medium text-gray-900 title-font">{course?.school_class.name} {course?.subject.name}</h2>
              }
              <h2 className="font-medium text-gray-900 title-font">{course?.school_class.name} {course?.subject.name}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
      </>
  )
}
