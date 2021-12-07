import { MailIcon, PhoneIcon, CakeIcon, LinkIcon } from '@heroicons/react/outline';
import moment from "moment";
import React from "react";
import { useQuery } from 'react-query';
import { getRequest } from 'api/apiCall';
import { TEACHERBIRTHDAYS, BIRTHDAYS } from 'api/apiUrl';
import { queryKeys } from 'api/queryKey';
import { images } from 'components/images';
import { StudentList } from "Mock/StudentList";
import SecretaryLayout from "components/SecretaryLayout";
import jwt_decode from "jwt-decode"
import { ToastContext } from 'App.jsx';
import { useParams } from 'react-router-dom';

const Body = ({students, teachers}) => {
  
  return (
    <>
       <h2 className="text-2xl leading-6 font-medium text-gray-900 my-3 py-3">This Week's Celebrants</h2>
       <nav className="h-full overflow-y-auto" aria-label="Directory">
        <div className="relative">
          <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 my-5 py-3 text-sm font-medium text-gray-500">
            <h3 className="font-extrabold text-xl">Students</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:grid-cols-3">
      {students?.map((student) => (
        <div
          key={student.email}
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-shrink-0">
            <img className="h-16 w-16 rounded-full object-center object-cover" src={student.image ? student.image : student.gender==="Male" ? images.male : images.female} alt="" />
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
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow hover:shadow-lg divide-y divide-gray-200 transform transition-all hover:scale-105"
                >
            <div className="flex-1 flex flex-col py-4">
              <img className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full object-center object-cover" src={student.image ? student.image : student.gender==="Male" ? images.male : images.female} alt="" />
              <h3 className="mt-6 text-gray-900 text-sm font-medium">{student.full_name}</h3>
              <dl className="mt-1 flex-grow flex flex-col justify-between">
                <dt className="sr-only">Class</dt>
                <dd className="text-gray-500 text-sm">{student.current_class.name}</dd>
                <dt className="sr-only">Date Of Birth</dt>
                <dd className="text-gray-500 text-sm">{moment(student.date_of_birth).format("LL")}</dd>
                <dt className="sr-only">Age</dt>
                      <dd className="text-gray-500 text-sm">Age: {student.age}</dd>
                
                
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
          <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 my-5 py-3 text-sm font-medium text-gray-500">
            <h3 className="font-extrabold text-xl">Teachers</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:grid-cols-3">
      {teachers?.map((teacher) => (
        <div
          key={teacher.email}
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <div className="flex-shrink-0">
            <img className="h-16 w-16 rounded-full object-center object-cover" src={teacher.image ? teacher.image : teacher.gender==="Male" ? images.male : images.female} alt="" />
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
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow hover:shadow-lg divide-y divide-gray-200 transform transition-all hover:scale-105"
                >
            <div className="flex-1 flex flex-col py-4">
              <img className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full object-center object-cover" src={teacher.image ? teacher.image : teacher.gender==="Male" ? images.male : images.female} alt="" />
              <h3 className="mt-6 text-gray-900 text-sm font-medium">{teacher.full_name}</h3>
              <dl className="mt-1 flex-grow flex flex-col justify-between">
                <dt className="sr-only">Class</dt>
                <dt className="sr-only">Date Of Birth</dt>
                <dd className="text-gray-500 text-sm">{moment(teacher.date_of_birth).format("LL")}</dd>
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
        <SecretaryLayout Component={<Body students={students} teachers={teachers} />} currentPage='Birthdays' />
      </>
)}
