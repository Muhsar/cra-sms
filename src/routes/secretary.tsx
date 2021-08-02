import AuthorizedResult from "pages/result/student";
import UnAuthorizedResult from "pages/parent-result/student";
import LandingPage from "pages";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import ErrorPage from "pages/404";
import SecretaryDashboard from "pages/secretary/";
import SecretaryStudents from "pages/secretary/students";
import SecretaryClasses from "pages/secretary/classes";
import SecretaryCourses from "pages/secretary/courses";
import SecretaryStudent from "pages/secretary/student/";
import SecretaryClass from "pages/secretary/class/";
import SecretaryCourse from "pages/secretary/course/";
import SecretaryEditCourse from "pages/secretary/course/edit";
import SecretaryEditClass from "pages/secretary/class/edit";
import SecretaryEditStudent from "pages/secretary/student/edit";

export const Secretary = (
  <Switch>
    <Route path="/:slug/secretary" component={SecretaryDashboard} exact />
    <Route
      path="/:slug/secretary/students"
      component={SecretaryStudents}
      exact
    />
    <Route path="/:slug/secretary/classes" component={SecretaryClasses} exact />
    <Route path="/:slug/secretary/courses" component={SecretaryCourses} exact />
    <Route
      path="/:slug/secretary/student/:id"
      component={SecretaryStudent}
      exact
    />
    <Route path="/:slug/secretary/class/:id" component={SecretaryClass} exact />
    <Route
      path="/:slug/secretary/course/:id"
      component={SecretaryCourse}
      exact
    />
    <Route
      path="/:slug/secretary/course/edit/:id"
      component={SecretaryEditCourse}
      exact
    />
    <Route
      path="/:slug/secretary/class/edit/:id"
      component={SecretaryEditClass}
      exact
    />
    <Route
      path="/:slug/secretary/student/edit/:id"
      component={SecretaryEditStudent}
      exact
    />
    <Route
      path="/:slug/parent-result/:id"
      component={UnAuthorizedResult}
      exact
    />
    <Route path="/:slug/result/:id" component={AuthorizedResult} exact />
    <Route path="/" component={LandingPage} exact />
    <Route render={(props) => <ErrorPage {...props} />} />
  </Switch>
);
