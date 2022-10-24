import React from "react";
import SecretaryLayout from "components/SecretaryLayout";
import Staffs from "School/Staffs";
import { StaffList } from "Mock/StaffList";
import { SearchField } from "components/search";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getRequest, postRequest } from "api/apiCall";
import { TEACHERS } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import { ToastContext } from "App.jsx";
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function SchoolStaffs() {
const params:{slug: any} = useParams()
  const {slug} = params
  const school = slug
  const easysch_token:{school_uid: any} = jwtDecode(localStorage?.easysch_token)
  const { data: teacherList } = useQuery(
    [queryKeys.getTeachers, easysch_token?.school_uid],
    async () => await getRequest({ url: TEACHERS(easysch_token?.school_uid) }),
    {
      retry: 2,
      enabled: !!easysch_token?.school_uid,
    }
  );
  const [teachers, setTeachers] = React.useState(teacherList?.data);
  React.useEffect(() => {
    setTeachers(teacherList?.data);
  }, [teacherList?.data]);
  

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };
  const cache = useQueryClient();
  const {showAlert} = React.useContext(ToastContext)
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      showAlert({
        message: data?.message,
        severity: "success",
      });
      setOpen(false);
      setTeachers([
        ...teachers,
        {
          user: {
            full_name: data?.data.full_name,
            image: data?.data.image,
            email: data?.data.email,
            is_active: data?.data.is_active,
            role: data?.data.groups[0]?.name,
            phone_number: data?.data.phone_number,
          },
          gender: data?.data.gender,
          id: data?.data.id,
        },
      ]);
      setState({
        first_name: "",
        last_name: "",
        religion: "",
        phone_number: "",
        address: "",
        date_of_birth: new Date(),
        email: "",
        gender: "",
        image: "",
        imageFile: "",
        role: "",
      });
      cache.invalidateQueries();
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append("first_name", state.first_name),
      data.append("last_name", state.last_name),
      data.append("religion", state.religion),
      data.append("phone_number", state.phone_number),
      data.append("address", state.address),
      data.append("date_of_birth", state.date_of_birth.toString()),
      data.append("email", state.email),
      data.append("gender", state.gender),
      data.append("role", state.role),
      data.append("image", state.image);

    mutate({
      url: TEACHERS(easysch_token?.school_uid),
      data: data,
    });
  };
  const [order, setOrder] = React.useState("asc");
  const [listCount, setlistCount] = React.useState(0);
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    setList(
      StaffList.slice(listCount, listCount + 10).sort(
        (a: { full_name: any }, b: { full_name: any }) =>
          -b.full_name.localeCompare(a.full_name)
      )
    );
  }, [listCount]);
  const handleNext = () => {
    listCount >= 0 &&
      listCount + 10 < StaffList.length &&
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
          (a: { full_name: any }, b: { full_name: any }) =>
            -b.full_name.localeCompare(a.full_name)
        )
      );
    order === "asc" &&
      setList(
        list.sort((a: { full_name: any }, b: { full_name: any }) =>
          b.full_name.localeCompare(a.full_name)
        )
      );
    order === "desc" && setOrder("asc");
    order === "asc" && setOrder("desc");
  };
  const [state, setState] = React.useState({
    first_name: "",
    last_name: "",
    religion: "",
    phone_number: "",
    address: "",
    date_of_birth: new Date(),
    email: "",
    gender: "",
    image: "",
    imageFile: "",
    role: "",
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
    const searchBody = "#Staffs tr";
    // SearchField({ value, searchBody });
  };
  const [open, setOpen] = React.useState(false);
  return (
    <SecretaryLayout
      Component={
        <Staffs
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
          handleDate={handleDate}
          teachers={teachers}
          open={open}
          setOpen={setOpen}
          setState={setState}
          school={school}
        />
      }
      currentPage="Teachers"
      // slug={school}
    />
  );
}
