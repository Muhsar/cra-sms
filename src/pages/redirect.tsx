import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert, Color } from "@material-ui/lab";
import { useHistory } from 'react-router-dom';

export const getServerSideProps = (context: { query: { school: any } }) => {
  const { school } = context.query;

  return { props: { school } };
};

export default function Redirect({redirectTo, school}) {
    // const [open, setOpen] = React.useState(true)
    const history = useHistory()
    setTimeout(()=> {
        history.replace(`/${school}/${redirectTo}`, `/${school}/${redirectTo}`)
    }, 3000)
    return (
        <div>
        {/* <div className="container bg-red-200 text-red-700 shadow-lg mx-auto px-3 md:px-6 py-5 md:py-10 text-center rounded-lg text-2xl font-extrabold">
          You are not authorized to view this page
           </div> */}
      
        </div>
    )
}
