import React from "react";
import Cards from "./Cards";
import Table from "./Table";

export default function STTCourse({
  students,
  room,
  setID,
  ID,
  handleChange,
  handleSubmit,
  open,
  setOpen,
  school,
}) {
  return (
    <>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900 capitalize">
          {room?.school_class.name} {room?.subject.name}
        </h3>
      </div>
      <div className="sm:hidden">
        <Cards
          students={students}
          setID={setID}
          school={school}
          ID={ID}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          open={open}
          setOpen={setOpen}
        />
      </div>
      <div className="hidden sm:block">
        <Table
          list={students}
          setID={setID}
          ID={ID}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          open={open}
          setOpen={setOpen}
          school={school}
        />
      </div>
    </>
  );
}
