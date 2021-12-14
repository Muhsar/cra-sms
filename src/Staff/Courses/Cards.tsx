/* This example requires Tailwind CSS v2.0+ */
import { ExternalLinkIcon, MailIcon, PencilIcon, PhoneIcon, PlusIcon } from '@heroicons/react/outline'
import {Link} from "react-router-dom"
import React from 'react'
import ScoreModal from './ScoreModal'
import SlideOver from './SlideOver'
// import SlideOver from 'components/SlideOver'
import jwt from "jsonwebtoken"
import ProfileSlideOver from 'components/ProfileSlideOver'
import NewModal from './NewModal'


export default function Cards({students,
  setID,
  ID,
  open,
  setOpen,
  school,
  courseId,
  room,
  course:courseName
}) {
  const handleClick = (id) => {
    setOpen(true)
                    setID(id)
  }
  const Trigger = ({student}) => (
    <div className="flex flex-1 w-0 -ml-px sm:hidden" onClick={() => {
      handleClick(student.student.id)
    }}>
  <a
    href="#"
    className="relative inline-flex items-center justify-center flex-1 w-0 py-1 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
    >
    <PlusIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
    <span className="ml-3">Add Result</span>
  </a>
</div>
  )
  const JWTSign = (course, name,student, image) => {
    const tokenToVerify = {
      course,
      name,
      student,
      image,
      room,
      courseName: courseName
    }
    return jwt.sign(tokenToVerify, "secret")
  }
  return (
    <>
    
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {students?.map((student) => (
        <li key={student.id} className="col-span-1 my-2 bg-white divide-y divide-gray-200 rounded-lg shadow">
          <div className="flex items-center justify-between w-full px-6 py-2 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-sm font-medium text-gray-900 truncate">{student.student.full_name}</h3>
                
              </div>
              <div className="grid grid-cols-2 gap-x-6">
              <p className="mt-1 text-sm text-gray-500 truncate">First CA: {student.first_ca}</p>
              <p className="mt-1 text-sm text-gray-500 truncate">Second CA: {student.second_ca}</p>
              <p className="mt-1 text-sm text-gray-500 truncate">Exam: {student.first_exam}</p>
              <p className="mt-1 text-sm text-gray-500 truncate">Total: {student.first_ca + student.second_ca + student.first_exam}</p>
              </div>
            </div>
            <img className="flex-shrink-0 object-cover object-center w-16 h-16 bg-gray-300 rounded-full" src={student.student.image ? student.student.image : student.gender === "Male" ? "https://res.cloudinary.com/jewbreel1/image/upload/v1625737172/jewbreel/sms/male_avatar_c3v0vu.png" : "https://res.cloudinary.com/jewbreel1/image/upload/v1625737170/jewbreel/sms/female_avatar_pgqx9s.png"} alt="" />
          </div>
          <div>
            <div className="flex -mt-px divide-x divide-gray-200">
              
            <Link to={`/${school}/staff/edit-result/${JWTSign(courseId, student.student.full_name, student.student.id, student.student.image ? student.student.image : student.gender === "Male" ? "https://res.cloudinary.com/jewbreel1/image/upload/v1625737172/jewbreel/sms/male_avatar_c3v0vu.png" : "https://res.cloudinary.com/jewbreel1/image/upload/v1625737170/jewbreel/sms/female_avatar_pgqx9s.png")}`}
                  className="flex flex-1 w-0 -ml-px sm:hidden"
                  >
                <>
                <div
                  className="relative inline-flex items-center justify-center flex-1 w-0 py-1 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <PlusIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Add Result</span>
                </div>
              </>
              </Link>
              {/* TODO: I had to remove result view for staff */}
            {/* <Link to={`/${school}/result/${student.student.id}`}
                    target="_blank"
                  className="flex flex-1 w-0 -ml-px sm:hidden"
                  >
                <>
                <div
                  className="relative inline-flex items-center justify-center flex-1 w-0 py-1 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <ExternalLinkIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">View Result</span>
                </div>
              </>
              </Link> */}
            </div>
          </div>
        </li>
      ))}
    </ul>
      </>
  )
}
