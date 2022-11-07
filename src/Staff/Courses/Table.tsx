import React, { Fragment } from "react";
import { StudentList } from "Mock/StudentList";
import { Dialog, Menu, Transition } from "@headlessui/react";
import StudentProfile from "./StudentProfile";
import ScoreModal from "./ScoreModal";
import SlideOver from "./SlideOver";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken"
// import StudentProfile from "./StudentProfile";
export default function Table({
  list,
  setID,
  ID,
  open,
  setOpen,
  school,
  courseId,
  room,
  course: courseName
}) {
  const JWTSign = (course, name,student, image) => {
    const tokenToVerify = {
      course,
      name,
      student,
      image,
      room,
      courseName
    }
    return jwt.sign(tokenToVerify, "secret")
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    1st CA
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    2nd CA
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Exam
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Total
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Add</span>
                  </th>                  
                </tr>
              </thead>
              <tbody
                className="bg-white divide-y divide-gray-200"
                id="Students"
              >
                {list?.map((person, index) => (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="object-cover object-center w-10 h-10 rounded-full"
                            src={person.student.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {person.student.full_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {person.t_first_ca}
                      </div>
                      {/* <div className="text-sm text-gray-500">100%</div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {person.t_second_ca}
                      </div>
                      {/* <div className="text-sm text-gray-500">100%</div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {person.third_exam}
                      </div>
                      {/* <div className="text-sm text-gray-500">100%</div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {person.t_first_ca + person.t_second_ca + person.third_exam}
                      </div>
                      {/* <div className="text-sm text-gray-500">100%</div> */}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <Link
                        to={`/edit-result/${JWTSign(courseId, person.student.full_name, person.student.id, person.student.image ? person.student.image : person.gender === "Male" ? "https://res.cloudinary.com/jewbreel1/image/upload/v1625737172/jewbreel/sms/male_avatar_c3v0vu.png" : "https://res.cloudinary.com/jewbreel1/image/upload/v1625737170/jewbreel/sms/female_avatar_pgqx9s.png")}`}
                        className="flex flex-1 w-0 -ml-px"
                      >
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit Score
                        </a>
                      </Link>
                    </td>
                    {/* <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <a
                        href={`/${school}/result/${person.student.id}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Result
                      </a>
                    </td> */}

                    {/* <Menu as="td" className="relative inline text-left">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="inline-flex justify-center w-full px-2 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                              <i className="far fa-grip-horizontal text-grey-400 hover:text-grey-900" />
                            </Menu.Button>
                          </div>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <div className="py-1">
                                <Menu.Item>
                                  <StudentProfile StudentId={course} />
                                </Menu.Item>
                                <Menu.Item>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700"
                                  >
                                    Edit
                                  </a>
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
