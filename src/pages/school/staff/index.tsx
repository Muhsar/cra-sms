import React from 'react'
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
// import Profile from 'ProfilePage/Profile';
import ProfilePage from 'ProfilePage';
import SchoolLayout from 'components/SchoolLayout';
import { useQuery } from 'react-query';
import { getRequest } from 'api/apiCall';
import { TEACHER } from 'api/apiUrl';
import { queryKeys } from 'api/queryKey';
import { ToastContext } from 'App.jsx';
import Profile from 'School/Staff/Profile';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export const getServerSideProps = (context: { query: { staff: any, school: any } }) => {
  const { staff, school } = context.query;

  return { props: { staff, school } };
};

export default function SingleStaff() {
  const { id: staff, slug: school } = useParams()
    const {schoolLogo: logo} = localStorage
    console.log(logo)
    const token = jwt_decode(localStorage?.token)
  const {
    data:teacherList
  } = useQuery(
    [queryKeys.getTeacher, token?.school_uid],
    async () => await getRequest({ url: TEACHER(token?.school_uid, staff) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
    )
  const [teacher, setTeacher] = React.useState(teacherList?.data)
    React.useEffect(() => {

    setTeacher(teacherList?.data)
  },[teacherList?.data])

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };
  const StaffDetail = [
    { param: "Full Name", value: teacher?.user.full_name },
    { param: "Email Address", value: teacher?.user.email },
    { param: "Class", value: teacher?.class },
    { param: "Gender", value: teacher?.gender },
    { param: "Religion", value: teacher?.religion },
    { param: "Mobile Number", value: teacher?.user.phone_number },
    { param: "Date Of Birth", value: teacher?.date_of_birth },
    { param: "Residential Address", value: teacher?.address },
  ]
  return (
    <>
      <SchoolLayout Component={<ProfilePage Component={<Profile data={teacher} details={StaffDetail} logo={logo} />} user="staff" userId={staff} page="Profile" school={school} />} currentPage='Teachers' slug={school} />
      </>
  )
}
