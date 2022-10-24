import { getRequest } from "api/apiCall"
import { TEACHERBIRTHDAYS, BIRTHDAYS } from "api/apiUrl"
import { queryKeys } from "api/queryKey"
import jwtDecode from "jwt-decode"
import React from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { images } from 'components/images';

export default function BirthdayCard() {
  const people = [
    {
      name: 'Leslie Alexander',
      email: 'lesliealexander@example.com',
      age: '20',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Leslie Alexander',
      email: 'lesliealexander@example.com',
      age: '20',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Leslie Alexander',
      email: 'lesliealexander@example.com',
      age: '20',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Leslie Alexander',
      email: 'lesliealexander@example.com',
      age: '20',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
  ]
  const easysch_token:{school_uid: any} = jwtDecode(localStorage?.easysch_token)
  const params:{slug: any} = useParams()
  const {slug: school} = params
  const {
    data:teacherList
  } = useQuery(
    [queryKeys.getTeachersBirthday, easysch_token?.school_uid],
    async () => await getRequest({ url: TEACHERBIRTHDAYS(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid
    }
    )
  const {
    data:studentList
  } = useQuery(
    [queryKeys.getStudentsBirthday, easysch_token?.school_uid],
    async () => await getRequest({ url: BIRTHDAYS(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid
    }
    )
  const [teachers, setteachers] = React.useState(teacherList?.data)
  const [students, setStudents] = React.useState(studentList?.data)
    React.useEffect(() => {

    setteachers(teacherList?.data)
    setStudents(studentList?.data)
  },[teacherList?.data, studentList?.data ])
  return (
    <>
    <h2 className="py-3 my-3 text-xl font-medium leading-6 text-gray-900">Today's Celebrants</h2>
    {
      !students?.length && !teachers?.length && (
        <div className="flex flex-col items-center justify-center w-full h-full py-6 mx-6 text-xl font-extrabold text-center text-gray-400">No Data Returned</div>
      )
    }
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {students?.map((person, index) => (
        <div
          key={index}
          className="relative flex items-center px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-shrink-0">
            <img className="w-10 h-10 rounded-full" src={person.image ? person.image : person.gender==="Male" ? images.male : images.female} alt="" />
          </div>
          <div className="flex-1 min-w-0">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{person.full_name}</p>
              <p className="text-sm text-gray-500 truncate">Age: {person.age}</p>
              <p className="text-sm text-gray-500 truncate">Ward</p>
            </a>
          </div>
        </div>
      ))}
      {teachers?.map((person, index) => (
        <div
          key={index}
          className="relative flex items-center px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-shrink-0">
            <img className="w-10 h-10 rounded-full" src={person.image ? person.image : person.gender==="Male" ? images.male : images.female} alt="" />
          </div>
          <div className="flex-1 min-w-0">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{person.full_name}</p>
              <p className="text-sm text-gray-500 truncate">Staff</p>
            </a>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}
