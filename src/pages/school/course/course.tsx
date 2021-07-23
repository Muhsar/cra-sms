import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getRequest, postRequest } from 'api/apiCall';
import { COURSE } from 'api/apiUrl';
import { queryKeys } from 'api/queryKey';
import SchoolLayout from 'components/SchoolLayout';
import { ToastContext } from 'App.jsx';
import CoursePage from "School/Course/"
;

export const getServerSideProps = (context: { query: { courseId: any, school: any } }) => {
  const { courseId, school } = context.query;

  return { props: { courseId, school } };
};

export default function SingleCourse({token, courseId, school}) {
  const {
    data:courseList
  } = useQuery(
    [queryKeys.getCourse, token?.school_uid],
    async () => await getRequest({ url: COURSE(token?.school_uid, courseId) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
    )

  const [allCourse, setAllCourse] = React.useState(courseList?.data)
    React.useEffect(() => {

    setAllCourse(courseList?.data)
  },[courseList?.data])
  const { showAlert } = React.useContext(ToastContext)

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };
  const cache = useQueryClient()
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      cache.invalidateQueries()
      showAlert({
        message: data?.message,
        severity: "success",
      });
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
      url: COURSE(token?.school_uid, courseId),
      data: {
      },
    });
  };
  // const [state, setState] = React.useState()
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({
  //     ...state,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setState({
  //     ...state,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  return (
    <>
     <SchoolLayout
      Component={
        <CoursePage
          // state={state}
          // handleChange={handleChange}
          // handleSelect={handleSelect}
          handleSubmit={submitForm}
          // setState={setState}
          course={allCourse}
        />
      }
        currentPage="Courses"
        slug={school}
    />
    </>
  )
}
