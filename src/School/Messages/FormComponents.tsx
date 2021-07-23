import React from "react";
import { MultipleAutoComplete } from "components/AutoComplete";

export const ReligionSelect = ({ handleSelect, religion }) => (
  <div className="my-2">
    <label htmlFor="course_name">Religion</label>
    <select
      onChange={handleSelect}
      id="course_name"
      name="course_name"
      autoComplete="course_name"
      required
      className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
      placeholder="Enter Course Name"
    >
      <option>Please Select Recipients</option>
      <option>
        Send To {religion === "Islam" ? "Muslim" : "Christian"} Parents Only
      </option>
      <option>Send To All Parents</option>
    </select>
  </div>
);
export const DebtorsSelect = ({ handleSelect }) => (
  <div className="my-2">
    <label htmlFor="course_name">Debtors</label>
    <select
      onChange={handleSelect}
      id="course_name"
      name="course_name"
      autoComplete="course_name"
      required
      className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
      placeholder="Enter Course Name"
    >
      <option>Please Select Recipients</option>
      <option>Send To All Debtors</option>
      <option>Send To All Parents</option>
    </select>
  </div>
);
export const ClassSelect = ({ handleSelect, rooms }) => {
  return (
  <div className="my-2">
    <label htmlFor="course_name">Classes</label>
    <select
      onChange={handleSelect}
      id="course_name"
      name="course_name"
      autoComplete="course_name"
      required
      className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
      placeholder="Enter Course Name"
    >
      <option>Please Select Recipients</option>
      {
        rooms?.map(room => (
          <option value={room.id}>{room.name}</option>
        ))
      }
    </select>
  </div>
)};
export const StudentsSelect = ({ handleSelect, students, selected, setSelected }) => {
  const studentList = students?.map(student => {
    const val = { label: student.last_name + " " + student.middle_name + " " + student.first_name, value: student.id }
    return val
  })
return (
  <div className="my-2 pb-8">
    <label htmlFor="course_name">Students</label>
    {
      students &&
      <MultipleAutoComplete
      data={studentList}
                value={selected}
        setValue={setSelected}
        classStyles="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
      />
  }
  </div>
  )
}
// export const CustomSelect = () => {
//   return (
//     <ReligionSelect />
//   )
// } 
// const Muslims = ({handleChange}) => (
//   <div className='my-2'>
//               <label htmlFor="course_name">
//                 Course Name
//               </label>
//               <input onChange={handleChange}
//                 id="course_name"
//                 name="course_name"
//                 type="text"
//                 autoComplete="course_name"
//                 required
//                 className="relative block w-full px-3 py-2 mb-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
//                 placeholder="Enter Course Name"
//               />
//             </div>
// )
