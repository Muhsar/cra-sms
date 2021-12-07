import React from "react";
import Title from "./Title";
import Table from "./Table";
import Cards from "./Cards";
import { ClassList } from "Mock/ClassList";
import { Nigeria } from "components/state&lga";
// import students from 'pages/school/students';

const Component = ({
  state,
  handleChange,
  handleSelect,
  handleSubmit,
  rooms,
  setState,
}) => {
  const handleImage = (e: any) => {
    setState({
      ...state,
      imageFile: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0],
    });
  };
  return (
    <>
      <form
        className="space-y-8 divide-y divide-gray-200"
        id="newStudent"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div className="pt-8">
            {/* <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
            <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
          </div> */}
            <div className="grid grid-cols-1 gap-y-6 gap-x-4">
              {/* <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                Student's Image
              </label> */}
              <div>
                <label
                  htmlFor="image"
                  className="flex justify-center px-1 pt-1 pb-1 mt-1 border-2 border-gray-300 border-dashed rounded-md md:px-6 md:pt-5 md:pb-6"
                >
                  {state.imageFile ? (
                    <img
                      src={state.imageFile}
                      className="object-cover object-center space-y-1"
                    />
                  ) : (
                    <div className="space-y-1 text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <div className="relative font-medium bg-white rounded-md cursor-pointer text-rose-600 hover:text-rose-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500">
                          <span>Upload Student's Image</span>
                          <input
                            onChange={handleImage}
                            id="image"
                            name="image"
                            type="file"
                            className="sr-only"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </label>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={handleChange}
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="first_name"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="middle_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Middle name
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="middle_name"
                    id="middle_name"
                    autoComplete="middle_name"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name (Surname)
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={handleChange}
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="last_name"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="guardian_full_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Guardian's Full Name
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={handleChange}
                    type="text"
                    name="guardian_full_name"
                    id="guardian_full_name"
                    autoComplete="guardian_full_name"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="guardian_full_name2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Second Guardian's Full Name
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="guardian_full_name2"
                    id="guardian_full_name2"
                    autoComplete="guardian_full_name2"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number 1
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={handleChange}
                    id="phone_number"
                    name="phone_number"
                    type="text"
                    autoComplete="phone_number"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="phone_number2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number 2
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleChange}
                    id="phone_number2"
                    name="phone_number2"
                    type="text"
                    autoComplete="phone_number2"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Residential Address
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={handleChange}
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="address"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="class_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Class
                </label>
                <div className="mt-1">
                  <select
                    required
                    onChange={handleSelect}
                    id="class_id"
                    name="class_id"
                    autoComplete="class"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  >
                    <option value="">Please Select Class</option>
                    {rooms?.map((room) => (
                      <option value={room.id}>{room.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <div className="mt-1">
                  <select
                    required
                    onChange={handleSelect}
                    id="gender"
                    name="gender"
                    autoComplete="gender"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  >
                    <option>Please select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="date_of_birth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date Of Birth
                </label>
                <div className="mt-1">
                  <input
                    required
                    onChange={handleChange}
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    autoComplete="date_of_birth"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="religion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Religion
                </label>
                <div className="mt-1">
                  <select
                    required
                    onChange={handleSelect}
                    id="religion"
                    name="religion"
                    autoComplete="religion"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  >
                    <option>Please select Religion</option>
                    <option>Islam</option>
                    <option>Christianity</option>
                  </select>
                </div>
              </div>
              <div className={`sm:col-span-${state.state ? "3" : "full"}`}>
                <label
                  htmlFor="state_of_origin"
                  className="block text-sm font-medium text-gray-700"
                >
                  State Of Origin
                </label>
                <div className="mt-1">
                  <select
                    onChange={handleSelect}
                    id="state_of_origin"
                    name="state_of_origin"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  >
                    <option>Please Select State</option>
                    {Nigeria.map((niger) => (
                      <option>{niger.state}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* {state.state && (
                <div className="sm:col-span-3">
                  <label
                    htmlFor="lga"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Local Government Area
                  </label>
                  <div className="mt-1">
                    <select
                      required
                      onChange={handleSelect}
                      id="lga"
                      name="lga"
                      autoComplete="lga"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    >
                      <option>Please Select LGA</option>
                      {Nigeria.map((niger) => (
                        <>
                          {niger.state === state.state &&
                            niger.lgas.map((lga) => <option>{lga}</option>)}
                        </>
                      ))}
                    </select>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default function Students({
  state,
  handleChange,
  handleSelect,
  handleSubmit,
  handleNameOrder,
  list,
  handleSearch,
  handleNext,
  handlePrevious,
  listCount,
  order,
  rooms,
  students,
  open,
  setOpen,
  setState,
  school,
}) {
  return (
    <>
      <Title
        Component={
          <Component
            state={state}
            handleChange={handleChange}
            handleSelect={handleSelect}
            handleSubmit={handleSubmit}
            rooms={rooms}
            setState={setState}
          />
        }
        handleSearch={handleSearch}
        open={open}
        setOpen={setOpen}
        data={students}
      />
      <Table students={students} school={school} />
      <div className="sm:hidden">
        <Cards students={students} school={school} />
      </div>
    </>
  );
}
