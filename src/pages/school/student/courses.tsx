import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getRequest, postRequest } from 'api/apiCall';
import { HOMEROOMCOURSES, STUDENT, STUDENTCOURSES } from 'api/apiUrl';
import { queryKeys } from 'api/queryKey';
import ProfilePage from 'ProfilePage';
import Courses from 'School/Student/Courses';
import SchoolLayout from 'components/SchoolLayout';
import { ToastContext } from 'App.jsx';

export const getServerSideProps = (context: { query: { student: any, school: any } }) => {
  const { student, school } = context.query;

  return { props: { student, school } };
};

export default function StudentCourses({ token, student, school }) {
  const { showAlert } = React.useContext(ToastContext)
  const [classId, setClassId] = React.useState()
  const { data: homeroomCourseList } = useQuery(
    [queryKeys.getHomeroomCourses, classId, token?.school_uid],
    async () => await getRequest({ url: HOMEROOMCOURSES(token?.school_uid, classId) }),
    {
      retry: 2,
      enabled: !!(token?.school_uid&&classId)
    }
  );
  const { data: studentCourseList } = useQuery(
    [queryKeys.getStudentCourses, classId, token?.school_uid],
    async () => await getRequest({ url: STUDENTCOURSES(token?.school_uid, student) }),
    {
      retry: 2,
      enabled: !!(token?.school_uid&&classId)
    }
  );
  const {
    data:studentList
  } = useQuery(
    [queryKeys.getStudent, token?.school_uid],
    async () => await getRequest({ url: STUDENT(token?.school_uid, student) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
    )
  const [list, setStudent] = React.useState(studentList?.data)
  const [studentCourses, setStudentCourses] = React.useState(studentCourseList?.data)
  const [homeroomCourses, setHomeroomCourses] = React.useState(homeroomCourseList?.data)
    React.useEffect(() => {

    setStudent(studentList?.data)
    setHomeroomCourses(homeroomCourseList?.data)
    setStudentCourses(studentCourseList?.data)
    setClassId(studentList?.data.current_class.id)
  }, [studentList?.data, homeroomCourseList?.data, studentCourseList?.data])
  const [state, setState] = React.useState<any>({
    subject_ids: []
  })
  const cache = useQueryClient()
  // const { showAlert } = React.useContext(ToastContext);
  const [open, setOpen] = React.useState(false)
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      setOpen(false)
      showAlert({
        message: data?.message,
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
      url: STUDENTCOURSES(token?.school_uid, student),
      data: {
        subject_class_ids: state.subject_ids
      },
    });
  };
  return (
    <>
      <SchoolLayout Component={<ProfilePage Component={<Courses
        state={state}
        roomCourses={homeroomCourses}
        studentCourses={studentCourses}
        setState={setState}
        handleSubmit={submitForm}
        open={open}
                setOpen={setOpen}
      />} user="student" userId={student} page="Courses" school={school} />} currentPage='Students' slug={school} />
      </>
  )
}
