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


export const getServerSideProps = (context: { query: { course: any, school: any } }) => {
  const { course, school } = context.query;

  return { props: { course, school } };
};

export default function homeroom({ token, course, school }) {
  
  const {
    data:studentList
  } = useQuery(
    [queryKeys.getCourseStudents, course, token?.school_uid],
    async () => await getRequest({ url: COURSESTUDENTS(token?.school_uid, course) }),
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
  const { showAlert } = React.useContext(ToastContext)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const cache = useQueryClient()
  const [studentId, setStudentId] = React.useState()
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      const updatedData = students?.map(student => {
        const datas = student
        if (datas.student.id === studentId) {
          datas.t_first_ca = data?.data.t_first_ca
          datas.t_second_ca = data?.data.t_second_ca
          datas.third_exam = data?.data.third_exam
          console.log(datas)
        }
        return datas
      })
      setStudents(updatedData)
      setOpen(false)
      showAlert({
        message: "Grade Added Successfuly",
        severity: "success",
      });
      cache.invalidateQueries()
    },
    onError(error: any) {
      error?.response?.data?.message.map((errormsg: any) =>
        showAlert({
          message: errormsg,
          severity: "error",
        })
      );
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: GRADE(token?.school_uid,studentId),
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
            handleChange={handleChange}
            handleSubmit={submitForm}
            open={open}
            setOpen={setOpen}
            school={school}
          />
        }
        currentPage="Courses"
        slug={school}
      />
    </>
  );
}
