import React from 'react'
import { Nigeria } from 'components/state&lga'

export default function Edit({state, handleChange, handleSelect, handleSubmit, rooms}) {
  return (
    <>
      <h1 className="text-center text-xl">Edit {state.last_name} {state.middle_name} {state.first_name}'s Data</h1>
      <form className="space-y-8 divide-y divide-gray-200 md:w-2/3 w-full md:px-3 px-2 mx-auto" id="newStudent" onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200">
        

        <div className="pt-8">
          {/* <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
            <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
          </div> */}
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <div className="mt-1">
                <input
                required
                onChange={handleChange}
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={state?.first_name}
                  autoComplete="first_name"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700">
                Middle name
              </label>
              <div className="mt-1">
                <input
                required
                onChange={handleChange}
                  type="text"
                  name="middle_name"
                  id="middle_name"
                  value={state?.middle_name}
                  autoComplete="middle_name"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <div className="mt-1">
                <input
                required
                onChange={handleChange}
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={state?.last_name}
                  autoComplete="last_name"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="guardian_name" className="block text-sm font-medium text-gray-700">
                Guardian's name
              </label>
              <div className="mt-1">
                <input
                required
                onChange={handleChange}
                  type="text"
                  name="guardian_name"
                  id="guardian_name"
                  value={state?.guardian_name}
                  autoComplete="guardian_name"
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
                  value={state?.email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Mobile Number 1
              </label>
              <div className="mt-1">
                <input
                required
                onChange={handleChange}
                  id="phone_number"
                  value={state?.phone_number}
                  name="phone_number"
                  type="text"
                  autoComplete="phone_number"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="phone_number2" className="block text-sm font-medium text-gray-700">
                Mobile Number 2
              </label>
              <div className="mt-1">
                <input
                required
                onChange={handleChange}
                  id="phone_number2"
                  value={state?.phone_number2}
                  name="phone_number2"
                  type="text"
                  autoComplete="phone_number2"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
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
                  value={state?.address}
                  name="address"
                  type="text"
                  autoComplete="address"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="class_id" className="block text-sm font-medium text-gray-700">
                Class
              </label>
              <div className="mt-1">
                <select
                required
                onChange={handleSelect}
                  id="class_id"
                  value={state?.class_id}
                  name="class_id"
                  autoComplete="class"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Please Select Class</option>
                    {
                      rooms?.map((room) => (
                        <option value={room.order}>{room.name}</option>
                      ))
                    }
                </select>
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
                  value={state?.gender}
                  name="gender"
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
                  value={state?.date_of_birth}
                  name="date_of_birth"
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
                  value={state?.religion}
                  name="religion"
                  autoComplete="religion"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    
                        <option>Please select Religion</option>
                        <option>Islam</option>
                        <option>Christianity</option>
                </select>
              </div>
            </div>
            <div className={`sm:col-span-${state.state ? "3" : "full"}`}>
              <label htmlFor="state_of_origin" className="block text-sm font-medium text-gray-700">
                State Of Origin
              </label>
              <div className="mt-1">
                <select
                required
                onChange={handleSelect}
                  id="state_of_origin"
                  value={state?.state_of_origin}
                  name="state_of_origin"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option>Please Select State</option>
                    {
                      Nigeria.map((niger) => (
                        <option>{niger.state}</option>
                      ))
                    }
                </select>
              </div>
            </div>
              {
                state.state &&
                <div className="sm:col-span-3">
              <label htmlFor="lga" className="block text-sm font-medium text-gray-700">
                Local Government Area
              </label>
              <div className="mt-1">
                    <select
                    required
                onChange={handleSelect}
                  id="lga"
                  value={state?.lga}
                  name="lga"
                  autoComplete="lga"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                  <option>Please Select LGA</option>
                  {
                        Nigeria.map((niger) => (
                          <>
                            {
                              niger.state === state.state && niger.lgas.map((lga) => (
                                <option>{lga}</option>
                              ))
                            }
                      </>
                    ))
                  }
                </select>
              </div>
                </div>
              }

          </div>
        </div>

      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
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
