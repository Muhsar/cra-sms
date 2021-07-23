import React from "react";
import SchoolLayout from "components/SchoolLayout";
import Cards from "School/Classes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getRequest, postRequest } from "api/apiCall";
import { HOMEROOMS } from "api/apiUrl";
import { queryKeys } from "api/queryKey";
import { ToastContext } from "App.jsx";

export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function SchoolClasses({ token, school }) {
  const { showAlert } = React.useContext(ToastContext)

  const { data: homerooms } = useQuery(
    [queryKeys.getClasses, token?.school_uid],
    async () => await getRequest({ url: HOMEROOMS(token?.school_uid) }),
    {
      retry: 2,
      enabled: !!token?.school_uid
    }
  );
  const [state, setState] = React.useState({
    name: "",
    fee: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const cache = useQueryClient()
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      console.log(data?.data)
      setRooms([...rooms, {name: data?.data.name, id: data?.data.id}])
      setOpen(false)
      setState({
        name: "",
        fee: 0,
      });
      showAlert({
        message: "Class Created Successfully",
        severity: "success",
      });
        cache.invalidateQueries()
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
      url: HOMEROOMS(token?.school_uid),
      data: {
        name: state.name,
        fee: state.fee,
      },
    });
  };
  const [rooms, setRooms] = React.useState(homerooms?.data);
  const roomval = homerooms?.data
    React.useEffect(() => {
    setRooms(roomval);
  }, [roomval]);
  const [open, setOpen] = React.useState(false)
  return (
    <SchoolLayout
      Component={
        <Cards
          rooms={rooms}
          handleChange={handleChange}
          handleSubmit={submitForm}
          open={open}
          setOpen={setOpen}
          school={school}
        />
      }
      currentPage="Classes"
      slug={school}
    />
  );
}
