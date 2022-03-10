import React from 'react'

export default function Component({
    handleChange,
    handleSubmit,
    state
}) {
    return (
        <div className="p-8">
           <form
        className="space-y-8 divide-y divide-gray-200"
        id="AddEditResult"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div className="pt-8">
            {/* <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
            <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
          </div> */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4">
              <div className="sm:col-span-full">
                <label
                  htmlFor="first_ca"
                  className="block text-sm font-medium text-gray-700"
                >
                  First CA
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="number"
                    max={20}
                    name="first_ca"
                    value={state?.first_ca}
                    id="first_ca"
                    placeholder="Enter First CA Score"
                    autoComplete="first_ca"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="second_ca"
                  className="block text-sm font-medium text-gray-700"
                >
                  Second CA
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="number"
                    max={20}
                    name="second_ca"
                    value={state?.second_ca}
                    id="second_ca"
                    placeholder="Enter Second CA Score"
                    autoComplete="second_ca"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="exam"
                  className="block text-sm font-medium text-gray-700"
                >
                  Exam
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="number"
                    max={60}
                    name="exam"
                    value={state?.exam}
                    id="exam"
                    placeholder="Enter Exam Score"
                    autoComplete="exam"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Save
            </button>
          </div>
        </div>
      </form> 
        </div>
    )
}
