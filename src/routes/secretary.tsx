import SchoolBirthdays from "pages/secretary/birthdays";
import SchoolCourses from "pages/secretary/courses";
import SchoolFees from "pages/secretary/fees";
import SMS from "pages/secretary/sms";
import SchoolStaffs from "pages/secretary/staffs";
import SchoolStudents from "pages/secretary/students";
import Dashboard from "pages/secretary";
import SchoolClasses from "pages/secretary/classes";
import SingleClass from "pages/secretary/class/class";
import SingleCourse from "pages/secretary/course/course";
import SingleStaff from "pages/secretary/staff/index";
import TeacherCourses from "pages/secretary/staff/courses";
import EditStaff from "pages/secretary/staff/edit";
import SingleStudent from "pages/secretary/student/index";
import StudentCourses from "pages/secretary/student/courses";
import EditStudent from "pages/secretary/student/edit";
import StudentFeeHistory from "pages/secretary/student/history";
import AuthorizedResult from "pages/result/student";
import UnAuthorizedResult from "pages/parent-result/student";
import LandingPage from "pages";
import { Route } from 'react-router-dom';
import { Switch } from "react-router-dom";
import ErrorPage from "pages/404";

export const Secretary = (
  <Switch>
    <Route path="/" component={LandingPage} exact />
    <Route
      path="/:slug/parent-result/:id"
      component={UnAuthorizedResult}
      exact
    />
    <Route path="/:slug/result/:id" component={AuthorizedResult} exact />
    <Route path="/:slug" component={Dashboard} exact />
    <Route path="/:slug/secretary" component={Dashboard} exact />
    <Route path="/:slug/secretary/classes" component={SchoolClasses} exact />
    <Route path="/:slug/secretary/students" component={SchoolStudents} exact />
    <Route path="/:slug/secretary/staffs" component={SchoolStaffs} exact />
    <Route path="/:slug/secretary/courses" component={SchoolCourses} exact />
    <Route path="/:slug/secretary/fees" component={SchoolFees} exact />
    <Route path="/:slug/secretary/sms" component={SMS} exact />
    <Route path="/:slug/secretary/birthdays" component={SchoolBirthdays} exact />
    <Route path="/:slug/secretary/class/:id" component={SingleClass} exact />
    <Route path="/:slug/secretary/course/:id" component={SingleCourse} exact />
    <Route path="/:slug/secretary/staff/:id" component={SingleStaff} exact />
    <Route
      path="/:slug/secretary/staff/:id/courses"
      component={TeacherCourses}
      exact
    />
    <Route path="/:slug/secretary/staff/:id/edit" component={EditStaff} exact />
    <Route path="/:slug/secretary/student/:id" component={SingleStudent} exact />
    <Route
      path="/:slug/secretary/student/:id/courses"
      component={StudentCourses}
      exact
    />
    <Route
      path="/:slug/secretary/student/:id/edit"
      component={EditStudent}
      exact
    />
    <Route
      path="/:slug/secretary/student/:id/history"
      component={StudentFeeHistory}
      exact
    />
    <Route render={(props) => <ErrorPage {...props} />} />
  </Switch>
);
