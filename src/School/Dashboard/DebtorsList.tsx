import React from "react"

export default function DebtorsList({people, title, fee}) {
  return (
    <>
    <div
      className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden col-span-2"
    >
        <>
          <div className="flex flex-row justify-between">
    <h2 className="text-xl leading-6 font-medium text-gray-900">{title}</h2>
    <h2 className="text-xl leading-6 font-medium text-gray-900">#{fee}</h2>
          </div>
      <div className="flow-root mt-6">
        <ul className="-my-5 divide-y divide-gray-200">
          {people?.map((person, index) => (
            <li key={index} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img className="h-8 w-8 rounded-full" src={person.image} alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{person.full_name}</p>
                  {/* <p className="text-sm text-red-500 bg-red-200 truncate">{person.fee_balance}</p> */}
                </div>
                <div>
                  <div
                    className="inline-flex items-center px-2.5 py-0.5 leading-5 font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {person.fee_balance}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="mt-6">
        <a
          href="#"
          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          View all
        </a>
      </div> */}
    </>
    </div>
    </>
  )
}
