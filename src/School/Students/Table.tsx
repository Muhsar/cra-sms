import React from "react";
import {Link} from "react-router-dom";
export default function Table({ students, school }) {
  return (
    <div className="hidden sm:flex flex-col">
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
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Debt Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Age
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Result</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody
                className="bg-white divide-y divide-gray-200"
                id="Students"
              >
                {students?.map((person) => (
                    <tr className="cursor-pointer bg-gray-50 hover:bg-gray-200">
                      <td className="px-6 hidden sm:inline py-4 whitespace-nowrap cursor-pointer">
                  <Link to={`/${school}/school/student/${person.id}`}>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 ml-3">
                            <img
                              className="h-10 w-10 rounded-full object-center object-cover"
                              src={
                                person.image ? person.image : person.gender === "Male"
                                  ? "https://res.cloudinary.com/jewbreel1/image/upload/v1625737172/jewbreel/sms/male_avatar_c3v0vu.png"
                                  : "https://res.cloudinary.com/jewbreel1/image/upload/v1625737170/jewbreel/sms/female_avatar_pgqx9s.png"
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person.full_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {person.email}
                            </div>
                          </div>
                        </div>
                        </Link>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {person?.current_class?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {person.gender}
                        </div>
                      </td>
                      {!person.is_debtor && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                      )}
                      {person.is_debtor && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Debtor
                          </span>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={`/${school}/result/${person.id}`} target="_blank" className="text-blue-600 hover:text-blue-900">
                        View Result
                      </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={`/${school}/result/${person.id}`} target="_blank" className="text-red-600 hover:text-red-900">
                        Delete Result
                      </a>
                      </td>
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
