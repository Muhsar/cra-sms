import React from "react";
import SecretaryLayout from "components/SecretaryLayout";
import Students from "School/Students";
import { StudentList } from "Mock/StudentList";
import { SearchField } from "components/search";
import { STUDENTS, HOMEROOMS } from 'api/apiUrl';
import { ToastContext } from "App.jsx";
import { getRequest, postRequest } from "api/apiCall";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { queryKeys } from "api/queryKey";
import { SortByDateAdded } from 'components/helpers';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function SchoolStudents() {
const params:{slug: any} = useParams()
  const {slug} = params
  const school = slug
  const easysch_token:{school_uid: any} = jwt_decode(localStorage?.easysch_token)
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
  const {
    data:studentList
  } = useQuery(
    [queryKeys.getStudents, easysch_token?.school_uid],
    async () => await getRequest({ url: STUDENTS(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid
    }
    )
    const [rooms, setRooms] = React.useState(homerooms?.data)
    const [students, setStudents] = React.useState(studentList?.data)
    React.useEffect(() => {
    setRooms(homerooms?.data)
    setStudents(studentList?.data)
  },[homerooms?.data, studentList?.data ])

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
      setStudents([...students, {full_name: data?.data.full_name, image: data?.data.image, gender: data?.data.gender, email: data?.data.email, current_class: {name: data?.data.current_class.name}, age: data?.data.age, is_debtor: data?.data.is_debtor, id: data?.data.id}])
      setOpen(false)
      setState({
        first_name: "",
        last_name: "",
        religion: "",
        middle_name: "",
        guardian_full_name: "",
        guardian_full_name2: "",
        phone_number: "",
        phone_number2: "",
        address: "",
        state_of_origin: "",
        date_of_birth: new Date(),
        email: "",
        outstanding_debt: 0,
        class_id: null,
        gender: null,
        guardian_name: "",
        image: "",
        imageFile: ""
      })
      cache.invalidateQueries()
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    const data = new FormData()
    data.append("first_name", state.first_name)
    data.append("last_name", state.last_name)
    data.append("religion", state.religion)
    data.append("middle_name", state.middle_name)
    data.append("guardian_full_name", state.guardian_full_name)
    data.append("guardian_full_name2", state.guardian_full_name2)
    data.append("phone_number", state.phone_number)
    data.append("phone_number2", state.phone_number2)
    data.append("address", state.address)
    data.append("state_of_origin", state.state_of_origin)
    data.append("date_of_birth", state.date_of_birth.toString())
    data.append("email", state.email)
    data.append("outstanding_debt", state.outstanding_debt.toString())
    data.append("image", state.image)
    data.append("class_id", state.class_id)
    data.append("gender", state.gender)
    mutate({
      url: STUDENTS(easysch_token?.school_uid),
      data: data,
    });
  };
  const [order, setOrder] = React.useState("asc");
  const [listCount, setlistCount] = React.useState(0);
  const [list, setList] = React.useState([]);
   React.useEffect(() => {
    setList(students?.slice(listCount, listCount + 10));
  }, [listCount, studentList?.data]);
  const handleNext = () => {
    listCount >= 0 &&
      listCount + 10 < students?.length &&
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
          (a: { last_name: any }, b: { last_name: any }) =>
            -b.last_name.localeCompare(a.last_name)
        )
      );
    order === "asc" &&
      setList(
        list.sort((a: { last_name: any }, b: { last_name: any }) =>
          b.last_name.localeCompare(a.last_name)
        )
      );
    order === "desc" && setOrder("asc");
    order === "asc" && setOrder("desc");
  };
  const [state, setState] = React.useState({
    first_name: "",
    last_name: "",
    religion: "",
    middle_name: "",
    guardian_full_name: "",
    guardian_full_name2: "",
    phone_number: "",
    phone_number2: "",
    address: "",
    state_of_origin: "",
    date_of_birth: new Date(),
    email: "",
    outstanding_debt: 0,
    class_id: null,
    gender: null,
    guardian_name: "",
    image: "",
    imageFile: ""
  });
  const handleDate = (date: Date | null) => {
    setState({ ...state, date_of_birth: date });
  };
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
    setList([state, ...list]);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const searchBody = "#Students tr";
    // SearchField({ value, searchBody });
  };
  const [open, setOpen] = React.useState(false)
  return (
    <SecretaryLayout
      Component={
        <Students
          state={state}
          handleChange={handleChange}
          handleSelect={handleSelect}
          handleSubmit={submitForm}
          handleNameOrder={handleNameOrder}
          list={list}
          handleSearch={handleSearch}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          listCount={listCount}
          order={order}
          rooms={rooms}
          students={students}
          open={open}
          setOpen={setOpen}
          setState={setState}
          school={school}
        />
      }
      currentPage="Students"
      // slug={school}
    />
  );
}
