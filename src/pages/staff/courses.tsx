import React from "react";
import StaffLayout from "components/StaffLayout";
import { Link, useParams } from 'react-router-dom';
import { ClassList } from "Mock/ClassList";
import Courses from "Staff/Courses";
import { useQuery } from "react-query";
import { getRequest } from "api/apiCall";
import { TEACHERCOURSES } from "api/apiUrl";
import { queryKeys } from "api/queryKey";

import { ToastContext } from "App.jsx";
import jwt_decode from 'jwt-decode';

export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function classes() {
  const easysch_token = jwt_decode(localStorage?.easysch_token)
  const {slug} = useParams()
  const school = slug
  // const [easysch_token, setToken] = React.useState<any>()
  // const localToken = typeof window !== "undefined" && localStorage?.getItem("easysch_token")
  // React.useEffect(() => {
  //   setToken(jwt_decode(localToken))
  // },[localToken])
  const { data: courseList } = useQuery(
    [queryKeys.getCourses, easysch_token?.teacher_id, easysch_token?.school_uid],
    async () =>
      await getRequest({
        url: `${TEACHERCOURSES(easysch_token?.school_uid, easysch_token?.teacher_id)}`,
      }),
    {
      retry: 2,
      enabled: !!(easysch_token?.school_uid && easysch_token?.teacher_id),
    }
  );
  const [allCourses, setAllCourses] = React.useState(courseList?.data);
    React.useEffect(() => {

    setAllCourses(courseList?.data);
  }, [courseList?.data]);
  return (
    <StaffLayout
      Component={<Courses courseList={allCourses} school={school} />}
      currentPage="Courses"
      slug={school}
    />
  );
}
