import React from "react";
import StaffLayout from "components/StaffLayout";
import Title from "School/Classes/Title";
import Table from "School/Students/Table";
import Class from "Staff/Class";
import { StudentList } from "Mock/StudentList";
import { SearchField } from "components/search";

import { ToastContext } from "App.jsx";

export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function homeroom({ school, token }) {
  const { showAlert } = React.useContext(ToastContext)
  const [order, setOrder] = React.useState("asc");
  const [listCount, setlistCount] = React.useState(0);
  const [list, setList] = React.useState([]);
    React.useEffect(() => {

    setList(StudentList.slice(listCount, listCount + 10));
  }, [listCount]);
  const handleNext = () => {
    listCount >= 0 &&
      listCount + 10 < StudentList.length &&
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
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const searchBody = "#Students tr";
    SearchField({ value, searchBody });
  };
  return (
    <>
      <StaffLayout
        Component={
          <Class
            handleNameOrder={handleNameOrder}
            list={list}
            handleSearch={handleSearch}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            listCount={listCount}
            order={order}
          />
        }
        currentPage="Class"
        slug={school}
      />
    </>
  );
}
