import React from "react";
import { StaffList } from "Mock/StaffList";

export default function StaffProfile({ data }) {
  const StaffDetail = [
    { param: "Full Name", value: data.full_name },
    { param: "Email Address", value: data.email },
    { param: "Class", value: data.class },
    { param: "Gender", value: data.gender },
    { param: "Religion", value: data.religion },
    { param: "Mobile Number", value: data.phone_number },
    { param: "Date Of Birth", value: data.date_of_birth },
    { param: "Residential Address", value: data.address },
  ];
  return (
    <div>
    <div className="pb-1 sm:pb-6">
      <div>
        <div className="relative h-40 sm:h-56">
          <img
            className="absolute h-full w-full object-cover  transition-all transform hover:scale-105"
            src="https://res.cloudinary.com/jewbreel1/image/upload/v1625737194/jewbreel/sms/avatar_vk7vtd.jpg"
            alt=""
          />
        </div>
        <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
          <div className="sm:flex-1">
            <div>
              <div className="flex items-center">
                <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">
                  {data.full_name}
                </h3>
                {/* <span className="ml-2.5 bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full">
                                <span className="sr-only">Online</span>
                              </span> */}
              </div>
              <p className="text-sm text-gray-500">Staff ID: {data.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-t border-gray-200">
        <dl>
          {StaffDetail.map(
            (detail: {
              param:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal;
              value:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal;
            }) => (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 transform transition-all hover:scale-105">
                <dt className="text-sm font-medium text-gray-500">
                  {detail.param}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {detail.value}
                </dd>
              </div>
            )
          )}
        </dl>
      </div>
    </div>
  </div>
  );
}
