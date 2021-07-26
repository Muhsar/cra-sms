/* This example requires Tailwind CSS v2.0+ */
import { ExternalLinkIcon, MailIcon, PencilIcon, PhoneIcon, PlusIcon } from '@heroicons/react/outline'
import {Link} from "react-router-dom"
import React from 'react'
import ScoreModal from './ScoreModal'


export default function Cards({students,
  setID,
  ID,
  handleChange,
  handleSubmit,
  open,
  setOpen,
  school,
}) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {students?.map((student) => (
        <li key={student.id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 my-2">
          <div className="w-full flex items-center justify-between px-6 py-2 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 text-sm font-medium truncate">{student.student.full_name}</h3>
                
              </div>
              <div className="grid grid-cols-2 gap-x-6">
              <p className="mt-1 text-gray-500 text-sm truncate">First CA: {student.t_first_ca}</p>
              <p className="mt-1 text-gray-500 text-sm truncate">Second CA: {student.t_second_ca}</p>
              <p className="mt-1 text-gray-500 text-sm truncate">Exam: {student.third_exam}</p>
              <p className="mt-1 text-gray-500 text-sm truncate">Total: {student.t_first_ca + student.t_second_ca + student.third_exam}</p>
              </div>
            </div>
            <img className="w-16 h-16 bg-gray-300 rounded-full object-center object-cover flex-shrink-0" src={student.student.image ? student.student.image : student.gender === "Male" ? "https://res.cloudinary.com/jewbreel1/image/upload/v1625737172/jewbreel/sms/male_avatar_c3v0vu.png" : "https://res.cloudinary.com/jewbreel1/image/upload/v1625737170/jewbreel/sms/female_avatar_pgqx9s.png"} alt="" />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <ScoreModal
            personId={student.student.id}
            setID={setID}
            ID={ID}
            handleChange={handleChange}
                handleSubmit={handleSubmit}
                open={open}
          setOpen={setOpen}
                Component={(setOpen) => (
                  <div className="-ml-px w-0 flex-1 flex sm:hidden" onClick={() => {
                    setOpen(true)
                    setID(student.student.id)
                  }}>
                <a
                  href="#"
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-1 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <PlusIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Add Result</span>
                </a>
              </div>
                )}
              />
            <Link to={`/${school}/result/${student.student.id}`}
                    target="_blank"
                  className="-ml-px w-0 flex-1 flex sm:hidden"
            >
                <>
                <div
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-1 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <ExternalLinkIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">View Result</span>
                </div>
              </>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
