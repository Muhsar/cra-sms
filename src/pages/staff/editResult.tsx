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
import { useParams, useHistory, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Component from "Staff/Courses/Component";
import ResultForm from "Staff/EditResult/ResultForm";



export default function EditResult() {
  const easysch_token:{school_uid: any} = jwt_decode(localStorage?.easysch_token)
  const params:{slug:any, courseId:any, studentId: any} = useParams()
  const history = useHistory();
  console.log(history)
  const {slug, courseId, studentId} = params
  const school = slug
  const course = courseId
  const student = studentId
  
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
  const {showAlert}  = React.useContext(ToastContext)
  const { mutate } = useMutation(postRequest, {
   onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      history.replace(`/${school}/staff/course/${course}`, `/${school}/staff/course/${course}`)
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
          <ResultForm
          school={school}
          course={course}
          student={student}
          handleSubmit={submitForm}
          handleChange={handleChange}
          />
        }
        currentPage="Courses"
        // slug={school}
      />
    </>
  );
}
