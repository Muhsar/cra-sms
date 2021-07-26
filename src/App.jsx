/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import LoginPage from "pages/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Both, UnAuthorized, Owner, Teacher } from "./oldnav";
// import { schoolRoutes, unauthorizedUser, staffRoutes, joinedRoutes } from './navigation.ts';

export default class Test extends Component {
  render() {
    const token: { groups: any[] } =
      localStorage?.token && jwt_decode(localStorage?.token);
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
        }
      }
      if (!token || token == "undefined") {
        auth = "UnAuthorized";
      }
      return auth;
    };
    const user = AuthFunction();
    console.log(user);
    console.log(token);
    const UserRoutes =
      user === "Both"
        ? Both
        : user === "Teacher"
        ? Teacher
        : user === "Owner"
        ? Owner
        : UnAuthorized;

    return (
      <Router>
          {user === "Both" && Both}
          {user === "UnAuthorized" && UnAuthorized}
          {user === "Teacher" && Teacher}
          {user === "Owner" && Owner}
          {/* <UserRoutes /> */}
      </Router>
    );
  }
}
