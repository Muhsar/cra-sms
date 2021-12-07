import SchoolDashboard from "pages/school";
import StaffDashboard from "pages/staff";
import UnAuthorizedResult from "pages/parent-result/student";
import LandingPage from "pages";
import LoginPage from "pages/login";
import OTP from "pages/otp";
import VerifyAccount from "pages/verify/staff";
import { Route } from 'react-router-dom';
import { Switch } from "react-router-dom";
import ErrorPage from "pages/404";
import { Redirect } from "react-router-dom"

export const UnAuthorized = (
  <Switch>
  <Route path="/:slug/school" render={({ location, match }) =>
        localStorage?.easysch_token && localStorage?.easysch_token!=="undefined" ? (
          <SchoolDashboard />
        ) : (
          <Redirect
            to={{
              pathname: `/${match.params.slug}/login`,
              state: { from: location }
            }}
          />
        )
      } />
  <Route path="/:slug/staff" render={({ location, match }) =>
        localStorage?.easysch_token && localStorage?.easysch_token!=="undefined" ? (
          <StaffDashboard />
        ) : (
          <Redirect
            to={{
              pathname: `/${match.params.slug}/login`,
              state: { from: location }
            }}
          />
        )
      } />
    <Route path="/:slug/login" component={LoginPage} exact />
    <Route path="/:slug/" component={LoginPage} exact />
    <Route path="/:slug/otp" component={OTP} exact />
    <Route path="/:slug/verify/:id" component={VerifyAccount} exact />
    <Route path="/" component={LandingPage} exact />
    <Route
      path="/:slug/parent-result/:id"
      component={UnAuthorizedResult}
      exact
    />
    <Route
      // path="*"
      // component={ErrorPage}
      render={(props)=>(
        <ErrorPage {...props} />
      )}
    />
  </Switch>
);