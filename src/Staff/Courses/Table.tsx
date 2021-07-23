import React, { Fragment } from "react";
import { StudentList } from "Mock/StudentList";
import { Dialog, Menu, Transition } from "@headlessui/react";
import StudentProfile from "./StudentProfile";
import ScoreModal from './ScoreModal';
import {Link} from "react-router-dom"
// import StudentProfile from "./StudentProfile";
export default function Table({
  list,
  setID,
  ID,
  handleChange,
  handleSubmit,
  open,
  setOpen,
  school
}) {
  
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    1st CA
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    2nd CA
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Exam
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Add</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
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
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-center object-cover"
                            src={
                              person.student.image
                            }
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
                    <ScoreModal
                      personId={person.student.id}
                    setID={setID}
                    ID={ID}
                    handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      open={open}
          setOpen={setOpen}
                      Component={(setOpen) => (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={() => {
                          setOpen(true)
                          setID(person.student.id)
                        }}>
                                      {/* <StudentProfile StudentId={person.id} /> */}
                                        <a href="#" className="text-blue-600 hover:text-blue-900">
                                          Add or Edit Score
                                        </a>
                                      </td>
                      )}
                    />
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href={`/${school}/result/${person.student.id}`} target="_blank" className="text-blue-600 hover:text-blue-900">
                        View Result
                      </a>
                    </td>
                    
                    {/* <Menu as="td" className="relative inline text-left">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
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
                              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <div className="py-1">
                                <Menu.Item>
                                  <StudentProfile StudentId={course} />
                                </Menu.Item>
                                <Menu.Item>
                                  <a
                                    href="#"
                                    className="text-gray-700 block px-4 py-2 text-sm"
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
