import React from "react";
import Component from "Staff/Courses/Component";

export default function ResultForm({
  school,
  course,
  student,
  handleSubmit,
  handleChange,
  errors,
}) {
  return (
    <div className="h-screen max-w-5xl mx-auto">
      <div className="flex flex-col items-center justify-center w-full h-4/5">
        <div className="grid w-full grid-cols-1 gap-4">
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <h2
              className="p-5 text-2xl font-extrabold"
              id="profile-overview-title"
            >
              Add or Edit Result
            </h2>
            {errors.length ? (
              <ul className="p-4 w-full bg-red-700 text-red-50">
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
