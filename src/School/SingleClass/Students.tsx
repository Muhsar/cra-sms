import React from 'react'
import Cards from 'School/Students/Cards'
import Table from 'School/Students/Table'

export default function SingleClassStudents({students, school}) {
  const [open, setOpen] = React.useState(false)
  // const students =[]
  return (
    <>
      <h3 className="text-2xl leading-6 font-medium text-gray-900 pb-5">Students</h3>
      <div className="hidden sm:block">
      <Table students={students} school={school} />
      </div>
      <div className="sm:hidden">
     <Cards students={students} school={school} /> 
      </div>
    </>
  )
}
