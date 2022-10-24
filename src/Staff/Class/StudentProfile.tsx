import React from 'react'
import { StudentList } from 'Mock/StudentList';
const Component = ({details, student}) => {
  return (
    <div>
                    <div className="pb-1 sm:pb-6">
                      <div>
                        <div className="relative h-40 sm:h-56">
                          <img
                            className="absolute h-full w-full object-cover transition-all transform hover:scale-105"
                            src={`/img/${student.gender==="Male" ? "male_avatar" : "female_avatar"}.png`}
                            alt=""
                          />
                        </div>
                        <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                          <div className="sm:flex-1">
                            <div>
                              <div className="flex items-center">
                  <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">{student.full_name}</h3>
                                {/* <span className="ml-2.5 bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full">
                                  <span className="sr-only">Online</span>
                                </span> */}
                              </div>
                              <p className="text-sm text-gray-500">student ID: {student.id}</p>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      
      <div className="border-t border-gray-200">
          <dl>
            {
              details.map((detail: { param: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; value: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal }) => (
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 transform transition-all hover:scale-105">
            <dt className="text-sm font-medium text-gray-500">{detail.param}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{detail.value}</dd>
          </div>
              ))
            }
        </dl>
      </div>
    </div>
                  </div>
  )
}
export default function StudentProfile({ StudentId, open, setOpen }) {
  const student = StudentList.find(student => student.id === StudentId)
  const StudentDetail = [
    {param: "Full Name", value: student.first_name + " " +student.middle_name+" " + student.last_name},
    {param: "Guardian Name", value: student.last_name+ " "+ student.guardian_name},
    {param: "Email Address", value: student.email},
    {param: "Class", value: student.class},
    {param: "State Of origin", value: student.state},
    {param: "Local Government Area", value: student.lga},
    {param: "Gender", value: student.gender},
    {param: "Age", value: student.age},
    {param: "Religion", value: student.religion},
    {param: "Mobile Number", value: student.mobile_number},
    {param: "Date Of Birth", value: student.date_of_birth},
    {param: "Residential Address", value: student.residential_address},
  ]
  return (
    <>
      </>
  )
}
