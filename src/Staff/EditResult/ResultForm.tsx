import React from "react";
import Component from "Staff/Courses/Component";

export default function ResultForm({
  school,
  course,
  student,
  handleSubmit,
  handleChange,
  errors,
  name,
  image,
  room,
  courseName
}) {
  return (
    <div className="h-screen max-w-5xl mx-auto">
      <div className="flex flex-col items-center justify-center w-full h-4/5">
        <div className="grid w-full grid-cols-1 gap-4">
        <div className="p-6 bg-white">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img className="object-cover object-center w-20 h-20 mx-auto rounded-full" src={image} alt="" />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-600">{room} {courseName}</p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">{name}</p>
            </div>
          </div>
        </div>
      </div>
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <h2
              className="p-5 text-2xl font-extrabold"
              id="profile-overview-title"
            >
              Add or Edit Result
            </h2>
            {errors.length ? (
              <ul className="w-full p-4 bg-red-700 text-red-50">
                {errors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            ): null}
            <Component
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
