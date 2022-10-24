import React from 'react'

export default function SingleClassCards({room, send}) {
  const stats = [
    { name: 'Male Students', stat: room?.male_count, icon: "fa-user-secret" },
    { name: 'Female Students', stat: room?.female_count, icon: "fa-user-nurse" },
    { name: 'Class Fee', stat: room?.fee, icon: "fa-users" },
  ]
  return(
    <div>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-2xl leading-6 font-medium text-gray-900">{room?.name}</h3>
      <div className="mt-3 sm:mt-0 sm:ml-4">
        <label htmlFor="search_candidate" className="sr-only">
          Search
        </label>
        <div className="flex rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            </div>
            
          </div>
          {/* <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
          >
            <SortAscendingIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            <span className="ml-2">Sort</span>
            <ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          </button> */}
          {/* <SlideOver title="Add Course" Component={Component} /> */}
          {/* <FormDialog handleSubmit={handleSubmit} handleChange={handleChange} state={state} setState={setState} rooms={rooms} open={open} setOpen={setOpen} /> */}
          <button
        type="button"
        onClick={send}
        className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Send Results To Parents
      </button>
        </div>
      </div>
    </div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="transition-all transform hover:scale-105 px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Male</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 flex">
            {/* <i className={`fas pr-5 ${item.icon}`}></i> */}
            <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737172/jewbreel/sms/male_avatar_c3v0vu.png" alt="" />
            <span className="pl-5">
              {room?.male_count}
            </span>
            </dd>
          </div>
          <div className="transition-all transform hover:scale-105 px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Female</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 flex">
            {/* <i className={`fas pr-5 ${item.icon}`}></i> */}
            <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737170/jewbreel/sms/female_avatar_pgqx9s.png" alt="" />
            <span className="pl-5">
              {room?.female_count}
            </span>
            </dd>
          </div>
          <div className="transition-all transform hover:scale-105 px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Class Fee</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 flex">
              <i className="far fa-money-bill-wave pr-5"></i>
              # {room?.fee}
            </dd>
          </div>
      </dl>
    </div>
  )
}
