import React from "react";
import Cards from "./Cards";
import Table from "./Table";

export default function STTCourse({
  students,
  room,
  setID,
  ID,
  open,
  setOpen,
  school,
  Component,
  courseId
}) {
  // const students = [
  //   {
  //     student: {
  //       image: "",
  //       full_name: "Jubril Musa",
  //       email: "",
  //       id: Math.random()
  //     },
  //     first_ca: 10,
  //     second_ca: 10,
  //     first_exam: 30
  //   },
  //   {
  //     student: {
  //       image: "",
  //       full_name: "Netala Nafiu",
  //       email: "",
  //       id: Math.random()
  //     },
  //     first_ca: 20,
  //     second_ca: 20,
  //     first_exam: 60
  //   },
  // ];
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
          open={open}
          setOpen={setOpen}
          courseId={courseId}
          />
      </div>
      <div className="hidden sm:block">
        <Table
          courseId={courseId}
          list={students}
          setID={setID}
          ID={ID}
          open={open}
          setOpen={setOpen}
          school={school}
        />
      </div>
    </>
  );
}
