/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
import React from "react";
import jwtDecode from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import {Helmet} from "react-helmet"
import { UnAuthorized } from "./routes/auth";
import { Both } from "./routes/both";
import { Bursar } from "./routes/bursar";
import { Owner } from "./routes/owner";
import { Parent } from "./routes/parent";
import { Secretary } from "./routes/secretary";
import { Teacher } from "./routes/teacher";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import useToast from './components/Alerts';

export const ToastContext = React.createContext();

export default function Test() {
  console.log(window.location, window.location.hostname, window.location.hostname.slice(0, window.location.hostname.length-10))
const [page, setPage] = React.useState("Dashboard");
const { showAlert, Toast } = useToast();
    const easysch_token =
      localStorage?.easysch_token && jwtDecode(localStorage?.easysch_token);
    const AuthFunction = () => {
      let auth = "";
      if (easysch_token && easysch_token !== "undefined") {
        if (easysch_token?.groups.length === 2) {
          auth = "Both";
        }
        if (easysch_token?.groups.length === 1) {
          if (easysch_token?.groups[0] === "Teacher") {
            auth = "Teacher";
          }
          if (easysch_token?.groups[0] === "Owner") {
            auth = "Owner";
          }
          if (easysch_token?.groups[0] === "Secretary") {
            auth = "Secretary";
          }
          if (easysch_token?.groups[0] === "Bursar") {
            auth = "Bursar";
          }
          if (easysch_token?.groups[0] === "Parent") {
            auth = "Parent";
          }
        }
      }
      if (!localStorage?.easysch_token) {
        localStorage.setItem("redirectTo", window.location.pathname)
        auth = "UnAuthorized";
      }
      if (!easysch_token) {
        localStorage.setItem("redirectTo", window.location.pathname)
        auth = "UnAuthorized";
      }
      if (easysch_token && ((easysch_token?.exp*1000) < (Date.now()))) {
        localStorage.setItem("redirectTo", window.location.pathname)
        localStorage.removeItem("easysch_token")
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
      <AnimateSharedLayout>
      <ToastContext.Provider value={{ showAlert }}>
      <Toast />
      <Router>
      <Route
      render={({location})=>(
        <AnimatePresence exitBeforeEnter>
          {user === "Both" && Both}
          {user === "UnAuthorized" && UnAuthorized}
          {user === "Teacher" && Teacher}
          {user === "Owner" && Owner}
          {user === "Parent" && Parent}
          {user === "Secretary" && Secretary}
          {user === "Bursar" && Bursar}
        </AnimatePresence>
      )}
      />
      </Router>
      </ToastContext.Provider>
      </AnimateSharedLayout>
      </>
    );
}
