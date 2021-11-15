import { MailIcon, PhoneIcon, CakeIcon, LinkIcon } from '@heroicons/react/outline';
import moment from "moment";
import React from "react";
import { useQuery } from 'react-query';
import { getRequest } from 'api/apiCall';
import { TEACHERBIRTHDAYS, BIRTHDAYS } from 'api/apiUrl';
import { queryKeys } from 'api/queryKey';
import { images } from 'components/images';
import { StudentList } from "Mock/StudentList";
import SchoolLayout from "components/SchoolLayout";
import jwt_decode from "jwt-decode"
import { ToastContext } from 'App.jsx';
import { useParams } from 'react-router-dom';

const Body = ({students, teachers}) => {
  
  return (
    <>
       <h2 className="py-3 my-3 text-2xl font-medium leading-6 text-gray-900">This Week's Celebrants</h2>
       <nav className="h-full overflow-y-auto" aria-label="Directory">
        <div className="relative">
          <div className="sticky top-0 z-10 px-6 py-3 my-5 text-sm font-medium text-gray-500 border-t border-b border-gray-200 bg-gray-50">
            <h3 className="text-xl font-extrabold">Students</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
      {students?.map((student) => (
        <div
          key={student.email}
          className="relative flex items-center px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-shrink-0">
            <img className="object-cover object-center w-16 h-16 rounded-full" src={student.image ? student.image : student.gender==="Male" ? images.male : images.female} alt="" />
          </div>
          <div className="flex-1 min-w-0">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{student.full_name}</p>
              <p className="text-sm text-gray-500 truncate">{student.current_class.name}</p>
              <p className="text-sm text-gray-500 truncate">{moment(student.date_of_birth).format("LL")}</p>
              <p className="text-sm text-gray-500 truncate">Age: {student.age}</p>
            </a>
          </div>
        </div>
      ))}
    </div>
          {/* <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
              students?.map((student, index) => (
                <li
                  key={index}
                className="flex flex-col col-span-1 text-center transition-all transform bg-white divide-y divide-gray-200 rounded-lg shadow hover:shadow-lg hover:scale-105"
                >
            <div className="flex flex-col flex-1 py-4">
              <img className="flex-shrink-0 object-cover object-center w-32 h-32 mx-auto bg-black rounded-full" src={student.image ? student.image : student.gender==="Male" ? images.male : images.female} alt="" />
              <h3 className="mt-6 text-sm font-medium text-gray-900">{student.full_name}</h3>
              <dl className="flex flex-col justify-between flex-grow mt-1">
                <dt className="sr-only">Class</dt>
                <dd className="text-sm text-gray-500">{student.current_class.name}</dd>
                <dt className="sr-only">Date Of Birth</dt>
                <dd className="text-sm text-gray-500">{moment(student.date_of_birth).format("LL")}</dd>
                <dt className="sr-only">Age</dt>
                      <dd className="text-sm text-gray-500">Age: {student.age}</dd>
                
                
              </dl>
            </div>
            
          </li>
            ))
          }
          </ul> */}
        </div>
    </nav>
       <nav className="h-full overflow-y-auto" aria-label="Directory">
        <div className="relative">
          <div className="sticky top-0 z-10 px-6 py-3 my-5 text-sm font-medium text-gray-500 border-t border-b border-gray-200 bg-gray-50">
            <h3 className="text-xl font-extrabold">Teachers</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
      {teachers?.map((teacher) => (
        <div
          key={teacher.email}
          className="relative flex items-center px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-shrink-0">
            <img className="object-cover object-center w-16 h-16 rounded-full" src={teacher.image ? teacher.image : teacher.gender==="Male" ? images.male : images.female} alt="" />
          </div>
          <div className="flex-1 min-w-0">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{teacher.full_name}</p>
              <p className="text-sm text-gray-500 truncate">{moment(teacher.date_of_birth).format("LL")}</p>
            </a>
          </div>
        </div>
      ))}
    </div>
          {/* <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
              teachers?.map((teacher, index) => (
                <li
                  key={index}
                className="flex flex-col col-span-1 text-center transition-all transform bg-white divide-y divide-gray-200 rounded-lg shadow hover:shadow-lg hover:scale-105"
                >
            <div className="flex flex-col flex-1 py-4">
              <img className="flex-shrink-0 object-cover object-center w-32 h-32 mx-auto bg-black rounded-full" src={teacher.image ? teacher.image : teacher.gender==="Male" ? images.male : images.female} alt="" />
              <h3 className="mt-6 text-sm font-medium text-gray-900">{teacher.full_name}</h3>
              <dl className="flex flex-col justify-between flex-grow mt-1">
                <dt className="sr-only">Class</dt>
                <dt className="sr-only">Date Of Birth</dt>
                <dd className="text-sm text-gray-500">{moment(teacher.date_of_birth).format("LL")}</dd>
                <dt className="sr-only">Age</dt>
                
                
              </dl>
            </div>
            
          </li>
            ))
          }
          </ul> */}
        </div>
    </nav>
</>
  );
};

export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function SchoolBirthdays() {
  const easysch_token:{school_uid: any} = jwt_decode(localStorage?.easysch_token)
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
  console.log(teachers, students)
  return (
    <>
        <SchoolLayout Component={<Body students={students} teachers={teachers} />} currentPage='Birthdays'  />
      </>
)}
