import React from "react";
import {Link} from "react-router-dom";

export default function Table({ teachers, school }) {
  return (
    <div className="flex-col hidden sm:flex">
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
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Mobile Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Activation Code
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200" id="Staffs">
                {teachers?.map((person) => (
                    <tr className="cursor-pointer bg-gray-50 hover:bg-gray-200">
                      <td className="hidden px-6 py-4 cursor-pointer sm:inline whitespace-nowrap">
                  <Link to={`/${school}/school/staff/${person?.id}`}>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 ml-3">
                            <img
                              className="object-cover object-center w-10 h-10 rounded-full"
                              src={
                                person?.image ? person?.image : person?.gender === "Male"
                                  ? "https://res.cloudinary.com/jewbreel1/image/upload/v1625737172/jewbreel/sms/male_avatar_c3v0vu.png"
                                  : "https://res.cloudinary.com/jewbreel1/image/upload/v1625737170/jewbreel/sms/female_avatar_pgqx9s.png"
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person?.full_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {person?.email}
                            </div>
                          </div>
                        </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {person?.gender}
                        </div>
                      </td>
                      {
                        person?.groups &&
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {person?.groups && person?.groups[0]?.name}
                        </div>
                      </td>
                      }
                      {!person?.is_active && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                            Pending
                          </span>
                        </td>
                      )}
                      {person?.is_active && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                            Active
                          </span>
                        </td>
                      )}

                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {person?.phone_number}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {person?.code}
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
