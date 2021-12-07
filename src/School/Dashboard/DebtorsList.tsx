import React from "react"

export default function DebtorsList({people, title, fee}) {
  return (
    <>
    <div
      className="relative col-span-2 px-4 pt-5 pb-12 overflow-hidden bg-white rounded-lg shadow sm:pt-6 sm:px-6"
    >
        <>
          <div className="flex flex-row justify-between">
    <h2 className="text-xl font-medium leading-6 text-gray-900">{title}</h2>
    <h2 className="text-xl font-medium leading-6 text-gray-900">#{fee}</h2>
          </div>
      <div className="flow-root mt-6">
        {
          !people?.length && <div className="flex flex-col items-center justify-center w-full h-full py-6 mx-6 text-xl font-extrabold text-center text-gray-400">No Debtor in {title}</div>
        }
        <ul className="-my-5 divide-y divide-gray-200">
          {people?.map((person, index) => (
            <li key={index} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img className="w-8 h-8 rounded-full" src={person.image} alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{person.full_name}</p>
                  {/* <p className="text-sm text-red-500 truncate bg-red-200">{person.fee_balance}</p> */}
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
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          View all
        </a>
      </div> */}
    </>
    </div>
    </>
  )
}
