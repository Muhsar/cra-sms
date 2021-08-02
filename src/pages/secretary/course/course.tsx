import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getRequest, postRequest } from 'api/apiCall';
import { COURSE } from 'api/apiUrl';
import { queryKeys } from 'api/queryKey';
import SecretaryLayout from 'components/SecretaryLayout';
import { ToastContext } from 'App.jsx';
import CoursePage from "School/Course/"
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export const getServerSideProps = (context: { query: { courseId: any, school: any } }) => {
  const { courseId, school } = context.query;

  return { props: { courseId, school } };
};

export default function SingleCourse() {
  const { id: courseId, slug: school } = useParams()
  const token = jwt_decode(localStorage?.token)
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

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };
  const cache = useQueryClient()
  const {showAlert}  = React.useContext(ToastContext)
  const { mutate } = useMutation(postRequest, {
   onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      cache.invalidateQueries()
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
     <SecretaryLayout
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
