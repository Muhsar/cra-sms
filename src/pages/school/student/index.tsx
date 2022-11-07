import React from "react";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { useQuery } from "react-query";
import { getRequest } from "api/apiCall";
import { STUDENT } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import ProfilePage from "ProfilePage";
// import Profile from 'ProfilePage/Profile';
import SchoolLayout from "components/SchoolLayout";
import Profile from "School/Student/Profile";
import { ToastContext } from "App.jsx";
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const getServerSideProps = (context: {
  query: { student: any; school: any };
}) => {
  const { student, school } = context.query;

  return { props: { student, school } };
};

export default function SingleStudent() {
  const easysch_token:{school_uid: any} = jwtDecode(localStorage?.easysch_token)
  const {schoolLogo: logo} = localStorage
  const params:{id: any} = useParams()
  const {id: student} = params
  const { schoolSlug: school } = localStorage
  const { data: studentList } = useQuery(
    [queryKeys.getStudent, easysch_token?.school_uid],
    async () => await getRequest({ url: STUDENT(easysch_token?.school_uid, student) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid,
    }
  );
  const [list, setStudent] = React.useState(studentList?.data);
    React.useEffect(() => {

    setStudent(studentList?.data);
  }, [studentList?.data]);
  const StudentDetail = [
    {
      param: "Full Name",
      value: list?.full_name,
    },
    {
      param: "Guardian Name",
      value: list?.guardian_full_name,
    },
    { param: "Email Address", value: list?.email },
    { param: "Class", value: list?.current_class.name },
    { param: "State Of origin", value: list?.state_of_origin },
    { param: "Gender", value: list?.gender },
    { param: "Age", value: list?.age },
    { param: "Religion", value: list?.religion },
    { param: "Mobile Number 1", value: list?.phone_number },
    { param: "Mobile Number 2", value: list?.phone_number2 },
    { param: "Date Of Birth", value: list?.date_of_birth },
    { param: "Residential Address", value: list?.address },
  ];
  return (
    <>
      <SchoolLayout
        currentPage="Students"
      >
        <ProfilePage
          Component={<Profile data={list} details={StudentDetail} logo={logo} />}
          user="student"
          userId={student}
          page="Profile"
          school={school}
        />
        </SchoolLayout>
    </>
  );
}
