import {Link} from "react-router-dom";
import React from "react";
import { ClassList } from "Mock/ClassList";
import ClassCards from "./ClassCards";
import Title from "./Title";

export default function Cards({rooms, handleChange, handleSubmit, open, setOpen, school}) {
  return (
    <>
      <Title handleChange={handleChange} handleSubmit={handleSubmit} open={open} setOpen={setOpen} />
      <ClassCards rooms={rooms} school={school}/>
      {/* <div>
        <dl
          className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          id="Classes"
        >
          {rooms?.map((room) => (
            <div
              key={room.id}
              className="relative transition-all transform hover:scale-105 searchBody bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dd className="px-3 pb-6 flex-col items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{room.name}</p>

                <div className="text-sm">Class Teacher: Jubril Musa</div>
                <div className="text-sm">Male: { room.male_count}</div>
                <div className="text-sm">Female: { room.female_count}</div>
                <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link to={`/school/classes/${room.id}`}>
                      <a
                        href="#"
                        className="font-medium text-gray-600 hover:text-gray-500"
                      >
                        {" "}
                        View
                      </a>
                    </Link>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div> */}
    </>
  );
}
