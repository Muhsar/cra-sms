import React from "react";
import StudentCourseForm from "./StudentCourseForm";

export default function Courses({
  roomCourses,
  state,
  setState,
  handleSubmit,
  studentCourses,
  open,
  setOpen
}) {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const [selected, setSelected] = React.useState([]);
  React.useEffect(() => {
    setState({
      ...state,
      subject_ids: selected.map((val) => {
        const ids = val.value;
        return ids;
      }),
    });
  }, [selected]);
  return (
    <>
    <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between px-4">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Courses</h3>
      <div>
        <StudentCourseForm
          courses={roomCourses}
          handleSelect={handleSelect}
          state={state}
          selected={selected}
          setSelected={setSelected}
          setState={setState}
            handleSubmit={handleSubmit}
            open={open}
                setOpen={setOpen}
        />
      </div>
      </div>
      <div className="flex flex-wrap -m-2 pt-5 px-2" id="Guests">
      {studentCourses?.map((course: any) => (
        <div
          className="w-full p-2 lg:w-1/3 md:w-1/2 sm:w-full searchBody"
          key={course.id}
        >
          <div className="flex items-center h-full p-4 transform border border-gray-200 rounded-lg shadow hover:scale-105  cursor-pointer hover:bg-gray-200 bg-gray-100">
            <div
              className={`avatar avatar-lg text-white flex-shrink-0 rounded-full mr-4 bg-gray-700 p-3`}
            >
            </div>
            <div className="flex-grow">
              <h2 className="font-medium text-gray-900 title-font">{course?.subject.name}</h2>
              <h5 className="text-gray-700 text-sm">Teacher: {course?.teacher.user.full_name}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
