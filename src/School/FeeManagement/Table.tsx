import React, { Fragment } from "react";
// import { PaymentHistory } from "Mock/PaymentHistory";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {PaymentHistory} from "Mock/PaymentHistory";
import moment from "moment";
import PaymentDetail from "./PaymentDetail";
// import PaymentDetail from "./PaymentDetail";
export default function Table({
  history
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
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount Paid
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment For
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  
                </tr>
              </thead>
              <tbody
                className="bg-white divide-y divide-gray-200"
                id="PaymentHistory"
              >
                {history?.map((history) => (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* <div className="flex items-center"> */}
                        {/* <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-center object-cover"
                            src={
                              person.gender === "Male"
                                ? "https://res.cloudinary.com/jewbreel1/image/upload/v1625737172/jewbreel/sms/male_avatar_c3v0vu.png"
                                : "https://res.cloudinary.com/jewbreel1/image/upload/v1625737170/jewbreel/sms/female_avatar_pgqx9s.png"
                            }
                            alt=""
                          />
                        </div> */}
                        {/* <div className="ml-4"> */}
                          <div className="text-sm font-medium text-gray-900 text-center">
                            {history.student.full_name}
                          </div>
                          {/* <div className="text-sm text-gray-500">
                            {person.email}
                          </div> */}
                        {/* </div> */}
                      {/* </div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-center">
                        {history.student.current_class.name}
                      </div>
                      {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-center">
                      #{history.student_bill.amount_paid}
                      </div>
                      {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-center">
                      {history.student_bill.bill.display_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-center">
                      {history.source}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 text-center">
                        {moment(history.date_added).format("LL")}
                      </div>
                      {/* <div className="text-sm text-gray-500">{person.department}</div> */}
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


