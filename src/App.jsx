/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
import React from "react";
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router
} from "react-router-dom";
import {Helmet} from "react-helmet"
import { UnAuthorized } from "./routes/auth";
import { Both } from "./routes/both";
import { Bursar } from "./routes/bursar";
import { Owner } from "./routes/owner";
import { Parent } from "./routes/parent";
import { Secretary } from "./routes/secretary";
import { Teacher } from "./routes/teacher";
import useToast from './components/Alerts';
// import { schoolRoutes, unauthorizedUser, staffRoutes, joinedRoutes } from './navigation.ts';

export const ToastContext = React.createContext();

export default function Test() {
  // console.log(window.location.hostname.slice(0, -10))
const { showAlert, Toast } = useToast();

    const token: { groups: any[] } =
      localStorage?.token && jwt_decode(localStorage?.token);
      console.log(token)
    const AuthFunction = () => {
      let auth = "";
      if (token && token !== "undefined") {
        if (token?.groups.length === 2) {
          auth = "Both";
        }
        if (token?.groups.length === 1) {
          if (token?.groups[0] === "Teacher") {
            auth = "Teacher";
          }
          if (token?.groups[0] === "School Owner") {
            auth = "Owner";
          }
          if (token?.groups[0] === "Secretary") {
            auth = "Secretary";
          }
          if (token?.groups[0] === "Bursar") {
            auth = "Bursar";
          }
          if (token?.groups[0] === "Parent") {
            auth = "Parent";
          }
        }
      }
      if (!token || token == "undefined") {
        auth = "UnAuthorized";
      }
      return auth;
    };
    const user = AuthFunction();

    return (
      <>
      <Helmet>
        <title>Easy SCH</title>
        <div>
          <meta name="description" content="A School Management System Made Easy For Primary and Secondary Schools" />
          <meta
            property="og:description"
            content="A School Management System Made Easy For Primary and Secondary Schools"
          />
          <meta property="og:title" content="Easy SCH" />
          <meta
            name="twitter:description"
            content="A School Management System Made Easy For Primary and Secondary Schools"
          />
          <meta name="twitter:title" content="Easy SCH" />
          <meta property="og:type" content="website" />
        </div>
      </Helmet>
      <ToastContext.Provider value={{ showAlert }}>
      <Toast />
      <Router>
          {user === "Both" && Both}
          {user === "UnAuthorized" && UnAuthorized}
          {user === "Teacher" && Teacher}
          {user === "Owner" && Owner}
          {user === "Parent" && Parent}
          {user === "Secretary" && Secretary}
          {user === "Bursar" && Bursar}
          {/* <UserRoutes /> */}
      </Router>
      </ToastContext.Provider>
      </>
    );
}
