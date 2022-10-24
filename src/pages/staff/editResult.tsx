/* eslint-disable prefer-const */
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
import jwtDecode from 'jwt-decode';
import Component from "Staff/Courses/Component";
import ResultForm from "Staff/EditResult/ResultForm";



export default function EditResult() {
  const easysch_token:{school_uid: any} = jwtDecode(localStorage?.easysch_token)
  const params:{token: any, slug; any} = useParams()
  const history = useHistory();
  const {slug, token} = params
  const data: {course: any, student: any, name: any, image: any, room: any, courseName: any} = jwtDecode(token)
  const {course, student, name, image, room, courseName} = data
  const school = slug
  // const course = data?.course
  // const student = studentId
  // const name = studentName
  // const image = studentImage
  
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
  React.useEffect(()=>{
    const filteredData = students?.filter(stud=> stud?.student?.id === student)
    const data = filteredData && filteredData[0]
    setState({
      ...state,
      first_ca: data?.t_first_ca,
      second_ca: data?.t_second_ca,
      exam: data?.third_exam
    })
  },[students])
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
      history.push(`/${school}/staff/course/${room}/${courseName}/${course}`, `/${school}/staff/course/${room}/${courseName}/${course}`)
      cache.invalidateQueries()
    },
  });
  const [errors, setErrors] = React.useState<{message: string}[]>([])
  const submitForm = (e: any) => {
    e.preventDefault();
    if(state.first_ca > 20) {
      setErrors([...errors,{
        message: "First CA can't be greater than 20"
      }])
    }
    if(state.second_ca > 20) {
      setErrors([...errors,{
        message: "Second CA can't be greater than 20"
      }])
    }
    if(state.exam > 60) {
      setErrors([...errors,{
        message: "Exam can't be greater than 60"
      }])
    }
    if(!errors.length){
    mutate({
      url: GRADE(easysch_token?.school_uid,student),
      data: {
        subject_class_id: course,
    t_first_ca: state.first_ca,
    t_second_ca: state.second_ca,
    third_exam: state.exam
      },
    })}
  };
  return (
    <>
      <StaffLayout
        Component={
          <ResultForm
          errors={errors}
          school={school}
          name={name}
          image={image}
          course={course}
          student={student}
          handleSubmit={submitForm}
          handleChange={handleChange}
          room={room}
          courseName={courseName}
          state={state}
          />
        }
        currentPage="Courses"
        // slug={school}
      />
    </>
  );
}
