import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getRequest, postRequest } from "api/apiCall";
import {
  HOMEROOM,
  CLASSSTUDENTS,
  HOMEROOMCOURSES,
  GET_COURSES,
  SENDRESULTS
} from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import SingleClassCards from "School/SingleClass/Cards";
import SingleClassStudents from "School/SingleClass/Students";
import SecretaryLayout from "components/SecretaryLayout";
import SingleClassCourses from "School/SingleClass/Courses";
import { ToastContext } from "App.jsx";
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


export const getServerSideProps = (context: { query: { classId: any, school: any } }) => {
  const { classId, school } = context.query;

  return { props: { classId, school } };
};

const Body = ({ classId, school, room, students, courses, roomCourses, handleSubmit, state, setState, open, setOpen, send, selected, setSelected }) => {
  return (
    <>
      
      <SingleClassCards room={room} send={send} />
      <div className="pt-5" />
      <SingleClassStudents students={students} school={school} />
      <SingleClassCourses courses={courses} roomCourses={roomCourses} handleSubmit={handleSubmit} state={state}
            setState={setState} open={open} setOpen={setOpen} selected={selected} setSelected={setSelected} />
    </>
  );
};
export default function SingleClass() {
  const {id: classId, slug: school} = useParams()
  const token = jwt_decode(localStorage?.token)
  const { data: courseList } = useQuery(
    [queryKeys.getCourses, token?.school_uid],
    async () => await getRequest({ url: GET_COURSES(token?.school_uid) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
  );
  const { data: homeroomCourseList } = useQuery(
    [queryKeys.getHomeroomCourses, token?.school_uid],
    async () => await getRequest({ url: HOMEROOMCOURSES(token?.school_uid, classId) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
  );
  const { data: homeroom } = useQuery(
    [queryKeys.getClasses, token?.school_uid],
    async () => await getRequest({ url: HOMEROOM(token?.school_uid, classId) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
  );
  const { data: studentList } = useQuery(
    [queryKeys.getClassStudents, token?.school_uid],
    async () => await getRequest({ url: CLASSSTUDENTS(token?.school_uid, classId) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
  );
  const cache = useQueryClient()
  const {showAlert}  = React.useContext(ToastContext)
  const { mutate } = useMutation(postRequest, {
   onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      setOpen(false)
      const subjectsData = state.subjects.map(subject=>{
        const datas = {subject: {name: subject.name}}
        return datas
      })
      console.log(subjectsData)
      setHomeroomCourses([...homeroomCourses, ...subjectsData])
      setState({
        ...state,
        subjects: []
      })
      setSelected([])
      cache.invalidateQueries();
    },
  });
  const [open, setOpen] = React.useState(false)
  const [state, setState] = React.useState({
    subjects: [],
    names: []
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: HOMEROOMCOURSES(token?.school_uid, classId),
      data: {
        subjects: state.subjects,
      },
    });
  };
  const [courses, setCourseList] = React.useState(courseList?.data);
  const [homeroomCourses, setHomeroomCourses] = React.useState(
    homeroomCourseList?.data
  );
  const [room, setRoom] = React.useState(homeroom?.data);
  const [students, setStudents] = React.useState(studentList?.data);
    React.useEffect(() => {

    setCourseList(courseList?.data);
    setRoom(homeroom?.data);
    setStudents(studentList?.data);
    setHomeroomCourses(homeroomCourseList?.data);
  }, [
    courseList?.data,
    studentList?.data,
    homeroom?.data,
     homeroomCourseList?.data
  ]);
  const sendResults = () => {
    mutate({
      url: SENDRESULTS(token?.school_uid, classId),
      data: {}
    })
  }
  const [selected, setSelected] = React.useState([])
  return (
    <div>
      <SecretaryLayout
        Component={
          <Body
            classId={classId}
            courses={courses}
            room={room}
            students={students}
            roomCourses={homeroomCourses}
            handleSubmit={submitForm}
            state={state}
            setState={setState}
            open={open}
            setOpen={setOpen}
            school={school}
            send={sendResults}
            selected={selected}
            setSelected={setSelected}
          />
        }
        currentPage="Classes"
        slug={school}
      />
    </div>
  );
}
