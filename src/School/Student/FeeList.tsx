import moment from 'moment'
import React from 'react'

export default function FeeList({history}) {
  return (
    <>
    <div
      className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden col-span-2 md:hidden"
    >
    <>
    <h2 className="text-xl leading-6 font-medium text-gray-900">Payment History</h2>
      <div className="flow-root mt-6">
        <ul className="-my-5 divide-y divide-gray-200">
          {history?.map((fee, index) => (
            <li key={index} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">#{fee.amount}</p>
                </div>
                <div>
                  <div
                    className="inline-flex items-center px-2.5 py-0.5 leading-5 font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {moment(fee.date_added).format("LL")}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
    </div>
    </>
  )
}
