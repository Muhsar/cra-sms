import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getRequest, postRequest } from "api/apiCall";
import { GET_COURSES, TEACHERCOURSES } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import ProfilePage from "ProfilePage";
import Courses from "School/Staff/Courses";
import SchoolLayout from "components/SchoolLayout";
import { ToastContext } from "App.jsx";


export const getServerSideProps = (context: { query: { staff: any, school: any } }) => {
  const { staff, school } = context.query;

  return { props: { staff, school } };
};

export default function TeacherCourses({ token, staff, school }) {
  const { data: teacherCourseList } = useQuery(
    [queryKeys.getTeacherCourses, token?.school_uid],
    async () => await getRequest({ url: TEACHERCOURSES(token?.school_uid, staff) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
  );
  const { data: courseList } = useQuery(
    [queryKeys.getCourses, token?.school_uid],
    async () => await getRequest({ url: GET_COURSES(token?.school_uid) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
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
  const { showAlert } = React.useContext(ToastContext)
const cache = useQueryClient()
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      setOpen(false)
      showAlert({
        message: data?.message,
        severity: "success",
      });
      setState({
        ...state,
        class_id: "",
        subject_class_ids: [],
      })
      cache.invalidateQueries();
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
      url: TEACHERCOURSES(token?.school_uid, staff),
      data: {
        subject_class_ids: state.subject_class_ids,
      },
    });
  };
  return (
    <>
      <SchoolLayout
        Component={
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
                // school={school}
              />
            }
            school={school}
            user="staff"
            userId={staff}
            page="Courses"
          />
        }
        currentPage="Teachers"
        slug={school}
      />
    </>
  );
}
