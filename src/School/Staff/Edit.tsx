import React from 'react'

export default function Edit({ handleChange, handleSelect, handleSubmit, staff }) {
  return (
    <>
      <h1 className="text-center text-xl">Edit {staff.full_name}'s Data</h1>
      <form className="space-y-8 divide-y divide-gray-200 md:w-2/3 w-full md:px-3 px-2 mx-auto" id="newStudent" onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200">
        

        <div className="pt-8">
          {/* <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
            <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
          </div> */}
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1 ">
            <div className="sm:col-span-full">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1">
                <input
                required
                onChange={handleChange}
                  type="text"
                  name="first_name"
                  value={staff.first_name}
                  id="first_name"
                  autoComplete="first_name"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1">
                <input
                required
                onChange={handleChange}
                  type="text"
                  name="last_name"
                  value={staff.last_name}
                  id="last_name"
                  autoComplete="last_name"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                required
                onChange={handleChange}
                  id="email"
                  name="email"
                  value={staff.email}
                  type="email"
                  autoComplete="email"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                required
                onChange={handleChange}
                  id="phone_number"
                  name="phone_number"
                  value={staff?.phone_number}
                  type="text"
                  autoComplete="phone_number"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-1">
                <select
                required
                onChange={handleSelect}
                  id="gender"
                  name="gender"
                  value={staff?.gender}
                  autoComplete="gender"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    
                        <option>Please select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
                Date Of Birth
              </label>
              <div className="mt-1">
              <input
                required
                onChange={handleChange}
                  id="date_of_birth"
                  name="date_of_birth"
                  value={staff?.date_of_birth}
                  type="date"
                  autoComplete="date_of_birth"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="religion" className="block text-sm font-medium text-gray-700">
                Religion
              </label>
              <div className="mt-1">
                <select
                required
                onChange={handleSelect}
                  id="religion"
                  name="religion"
                  value={staff?.religion}
                  autoComplete="religion"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    
                        <option>Please select Religion</option>
                        <option>Islam</option>
                        <option>Christianity</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Residential Address
              </label>
              <div className="mt-1">
                <input
                required
                onChange={handleChange}
                  id="address"
                  name="address"
                  value={staff?.address}
                  type="text"
                  autoComplete="address"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* <div className="sm:col-span-full">
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                Class
              </label>
              <div className="mt-1">
                <select
                required
                onChange={handleSelect}
                  id="class"
                  name="class"
                  value={staff?.class}
                  autoComplete="class"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    {
                      ClassList.map((room) => (
                        <option>{room}</option>
                      ))
                    }
                </select>
              </div>
            </div> */}
          </div>
        </div>

      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
    </>
  )
}
