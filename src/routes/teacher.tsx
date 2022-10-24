import StaffDashboard from "pages/staff";
import StaffCourses from "pages/staff/courses";
import StaffClass from "pages/staff/class";
import StaffCourse from "pages/staff/course";
import AuthorizedResult from "pages/result/student";
import UnAuthorizedResult from "pages/parent-result/student";
import LandingPage from "pages";
import { Route } from 'react-router-dom';
import { Switch } from "react-router-dom";
import ErrorPage from "pages/404";
import EditResult from "pages/staff/editResult";

export const Teacher = (
  <Switch>
    {/* <Route path="/:slug/login" component={LoginPage} exact /> */}
    <Route path="/:slug/staff" component={StaffDashboard} exact />
    <Route path="/:slug/" component={StaffDashboard} exact />
    <Route path="/:slug/staff/courses" component={StaffCourses} exact />
    <Route path="/:slug/staff/course/:room/:corse/:id" component={StaffCourse} exact />
    <Route path="/:slug/staff/class" component={StaffClass} exact />
    <Route path="/:slug/staff/edit-result/:token" component={EditResult} exact />
    <Route
      path="/:slug/parent-result/:id"
      component={UnAuthorizedResult}
      exact
    />
    <Route path="/:slug/result/:id" component={AuthorizedResult} exact />
    <Route path="/" component={LandingPage} exact />
    <Route
      // path="*"
      // component={ErrorPage}
      render={(props)=>(
        <ErrorPage {...props} />
      )}
    />
  </Switch>
);