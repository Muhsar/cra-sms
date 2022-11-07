import React from "react";
import StaffLayout from "components/StaffLayout";
import Title from "School/Classes/Title";
import Table from "School/Students/Table";
import StaffCourses from "Staff/Courses";
import { StudentList } from "Mock/StudentList";
import { SearchField } from "components/search";
import STTCourse from "Staff/Courses/STTCourse";
import { COURSESTUDENTS, GRADE } from "api/apiUrl";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getRequest, postRequest } from "api/apiCall";
import { queryKeys } from "api/queryKey";
import { ToastContext } from "App.jsx";
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Component from "Staff/Courses/Component";


export const getServerSideProps = (context: { query: { course: any, school: any } }) => {
  const { course, school } = context.query;

  return { props: { course, school } };
};

export default function homeroom() {
  const easysch_token:{school_uid: any} = jwtDecode(localStorage?.easysch_token)
  const params:{slug:any, id:any, room: any, corse: any} = useParams()
  const {slug, id, room, corse:name} = params
  const { schoolSlug: school } = localStorage
  const course = id
  // alert(name)
  const {
    data:studentList
  } = useQuery(
    [queryKeys.getCourseStudents, course, easysch_token?.school_uid],
    async () => await getRequest({ url: COURSESTUDENTS(easysch_token?.school_uid, course) }),
    {
      retry: 2,
      enabled: !!course
    }
    )
  const [students, setStudents] = React.useState(studentList?.data)
    React.useEffect(() => {
      // const filteredData = studentList?.data?.filter(stud=> stud?.student?.id === student)
      // const data = filteredData && filteredData[0]
      // setState({
      //   ...state,
      //   first_ca: data?.s_first_ca,
      //   second_ca: data?.s_second_ca,
      //   exam: data?.second_exam
      // })
    setStudents(studentList?.data);
  }, [studentList?.data]);
  const [state, setState] = React.useState({
    subject_class_id: course,
    first_ca: 0,
    second_ca: 0,
    exam: 0
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const cache = useQueryClient()
  const [studentId, setStudentId] = React.useState()
  const {showAlert}  = React.useContext(ToastContext)
  const { mutate } = useMutation(postRequest, {
   onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      setOpen(false)
      cache.invalidateQueries()
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: GRADE(easysch_token?.school_uid,studentId),
      data: {
        subject_class_id: course,
    first_ca: state.first_ca,
    second_ca: state.second_ca,
    exam: state.exam
      },
    });
  };
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <StaffLayout
        Component={
          <STTCourse
            students={students}
            room={students?.subject_class}
            setID={setStudentId}
            ID={studentId}
            courseId={course}
            open={open}
            roomName={room}
            courseName={name}
            setOpen={setOpen}
            school={school}
            Component={<Component handleChange={handleChange} handleSubmit={submitForm} state={state} />}
          />
        }
        currentPage="Courses"
        // slug={school}
      />
    </>
  );
}
