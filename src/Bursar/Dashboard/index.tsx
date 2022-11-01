import React from "react";
import AssignedCourse from "./AssignedCourse";
import Header from "./Header";

export default function BursarDashboard({ teacher }) {
  return (
    <>
      <Header teacher={teacher} />
      {/* <AssignedCourse courses={courses} school={school} /> */}
    </>
  );
}
