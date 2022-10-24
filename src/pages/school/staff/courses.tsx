import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getRequest, postRequest } from "api/apiCall";
import { GET_COURSES, TEACHERCOURSES } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import ProfilePage from "ProfilePage";
import Courses from "School/Staff/Courses";
import SchoolLayout from "components/SchoolLayout";
import { ToastContext } from "App.jsx";
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';


export const getServerSideProps = (context: { query: { staff: any, school: any } }) => {
  const { staff, school } = context.query;

  return { props: { staff, school } };
};

export default function TeacherCourses() {
  // const { id: staff, slug: school } = useParams()
  const params:{id: any, slug: any} = useParams()
  const {id: staff, slug: school} = params
  const easysch_token:{school_uid: any} = jwtDecode(localStorage?.easysch_token)
  const { data: teacherCourseList } = useQuery(
    [queryKeys.getTeacherCourses, easysch_token?.school_uid],
    async () => await getRequest({ url: TEACHERCOURSES(easysch_token?.school_uid, staff) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid
    }
  );
  const { data: courseList } = useQuery(
    [queryKeys.getCourses, easysch_token?.school_uid],
    async () => await getRequest({ url: GET_COURSES(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid
    }
  );
  const [allCourses, setAllCourses] = React.useState(courseList?.data);
  const [teacherCourses, setTeacherCourses] = React.useState(
    teacherCourseList?.data
  );
    React.useEffect(() => {

    setTeacherCourses(teacherCourseList?.data);
    setAllCourses(courseList?.data);
  }, [teacherCourseList?.data, courseList?.data]);
  const {showAlert} = React.useContext(ToastContext)
const cache = useQueryClient()
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      })
      setOpen(false)
      setState({
        ...state,
        class_id: "",
        subject_class_ids: [],
      })
      setSelected([])
      cache.invalidateQueries();
    },
  });
  const [open, setOpen] = React.useState(false)
  const [state, setState] = React.useState({
    class_id: "",
    subject_class_ids: [],
    subject_class_names: [],
        class_name: ""
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: TEACHERCOURSES(easysch_token?.school_uid, staff),
      data: {
        subject_class_ids: state.subject_class_ids,
      },
    });
  };
  const [selected, setSelected] = React.useState([])
  return (
    <>
      <SchoolLayout
        currentPage="Teachers"
        
      >
        <ProfilePage
          Component={
            <Courses
              courses={allCourses}
              teacherCourses={teacherCourses}
              state={state}
              setState={setState}
              open={open}
              setOpen={setOpen}
              handleSubmit={submitForm}
              selected={selected}
              setSelected={setSelected}
            />
          }
          school={school}
          user="staff"
          userId={staff}
          page="Courses"
        />
        </SchoolLayout>
    </>
  );
}
