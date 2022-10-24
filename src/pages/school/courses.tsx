import React from "react";
import SchoolLayout from "components/SchoolLayout";
import CoursePage from "School/Courses";
// import { Courses } from "Mock/Courses";
import { SearchField } from "components/search";
import {Courses} from "Mock/Courses";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getRequest, postRequest } from "api/apiCall";
import { queryKeys } from "api/queryKey";
import { ToastContext } from "App.jsx";
import { GET_COURSES, HOMEROOMS } from 'api/apiUrl';
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';

export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function SchoolCourses() {
  const easysch_token:{school_uid: any} = jwtDecode(localStorage?.easysch_token)
  const params:{slug: any} = useParams()
  const {slug: school} = params
  
  const {
    data:courseList
  } = useQuery(
    [queryKeys.getCourses, easysch_token?.school_uid],
    async () => await getRequest({ url: GET_COURSES(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid
    }
    )
  const {
    data:homerooms
  } = useQuery(
    [queryKeys.getClasses, easysch_token?.school_uid],
    async () => await getRequest({ url: HOMEROOMS(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid
    }
    )
  const [allCourses, setAllCourses] = React.useState(courseList?.data)
  const [rooms, setRooms] = React.useState(homerooms?.data)
  React.useEffect(() => {
    setAllCourses(courseList?.data)
    setRooms(homerooms?.data)
  },[courseList?.data, homerooms?.data ])

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };
  const cache = useQueryClient()
  const {showAlert} = React.useContext(ToastContext)
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      setAllCourses([...allCourses, {name: data?.data.name, id: data?.data.id}])
      setOpen(false)
      setState({
        name: "",
        class_ids: [],
        classes: []
      });
      setSelected([])
      cache.invalidateQueries()
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    mutate({
      url: GET_COURSES(easysch_token?.school_uid),
      data: {
        name: state.name,
        class_ids: state.class_ids
      },
    });
  };

  const [order, setOrder] = React.useState("asc");
  const [listCount, setlistCount] = React.useState(0);
  const [list, setList] = React.useState([]);
    React.useEffect(() => {

    setList(Courses.slice(listCount, listCount + 10));
  }, [listCount]);
  const handleNext = () => {
    listCount >= 0 &&
      listCount + 10 < Courses.length &&
      setlistCount(listCount + 10);
  };
  const handlePrevious = () => {
    listCount - 9 > 0 && setlistCount(listCount - 10);
    // setlistCount(listCount-10)
  };
  const handleNameOrder = () => {
    // people.sort(function(a: { name: any },b: { name: any }){
    //   return Number(new Date(b.name)) - Number(new Date(a.name));
    // })
    order === "desc" &&
      setList(
        list.sort(
          (a, b) =>
            -b.localeCompare(a)
        )
      );
    order === "asc" &&
      setList(
        list.sort((a, b) =>
          b.localeCompare(a)
        )
      );
    order === "desc" && setOrder("asc");
    order === "asc" && setOrder("desc");
  };
  const [state, setState] = React.useState({
    name: "",
    class_ids: [],
    classes: []
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setList([state.name, ...list]);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const searchBody = "#Courses tr";
    // SearchField({ value, searchBody });
  };
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState([])
  return (
    <SchoolLayout
    currentPage="Courses"
    
    >
    <CoursePage
      state={state}
      handleChange={handleChange}
      handleSubmit={submitForm}
      handleSearch={handleSearch}
      setState={setState}
      rooms={rooms}
      courses={allCourses}
      open={open}
      setOpen={setOpen}
      school={school}
      selected={selected}
      setSelected={setSelected}
    />
    </SchoolLayout>
  );
}
