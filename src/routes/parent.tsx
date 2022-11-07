import AuthorizedResult from "pages/result/student";
import UnAuthorizedResult from "pages/parent-result/student";
import LandingPage from "pages";
import { Route } from 'react-router-dom';
import { Switch } from "react-router-dom";
import ErrorPage from "pages/404";
import ParentDashboard from "Parent/pages/";
import ParentChildDashboard from "Parent/pages/child";
import ParentTestResult from "Parent/pages/test";
import ParentStats from "Parent/pages/stats";

export const Parent = (
  <Switch>
    {/* <Route path="/login" component={LoginPage} exact /> */}
    <Route path="/" component={ParentDashboard} exact />
    <Route path="/" component={ParentDashboard} exact />
    <Route path="/child/:id" component={ParentChildDashboard} exact />
    <Route path="/child/:id/result/test" component={ParentTestResult} exact />
    <Route path="/child/:id/stats" component={ParentStats} exact />
    <Route
      path="/parent-result/:id"
      component={UnAuthorizedResult}
      exact
    />
    <Route path="/result/:id" component={AuthorizedResult} exact />
    {/* <Route path="/" component={LandingPage} exact /> */}
    <Route
      // path="*"
      // component={ErrorPage}
      render={(props)=>(
        <ErrorPage {...props} />
      )}
    />
  </Switch>
);