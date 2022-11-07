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
    {/* <Route path="/" component={LandingPage} exact /> */}
    <Route
      path="/parent-result/:id"
      component={UnAuthorizedResult}
      exact
    />
    <Route path="/result/:id" component={AuthorizedResult} exact />
    <Route path="/" component={Dashboard} exact />
    <Route path="/" component={Dashboard} exact />
    <Route path="/classes" component={SchoolClasses} exact />
    <Route path="/students" component={SchoolStudents} exact />
    <Route path="/staffs" component={SchoolStaffs} exact />
    <Route path="/courses" component={SchoolCourses} exact />
    <Route path="/fees" component={SchoolFees} exact />
    <Route path="/sms" component={SMS} exact />
    <Route path="/birthdays" component={SchoolBirthdays} exact />
    <Route path="/class/:id" component={SingleClass} exact />
    <Route path="/course/:id" component={SingleCourse} exact />
    <Route path="/staff/:id" component={SingleStaff} exact />
    <Route
      path="/staff/:id/courses"
      component={TeacherCourses}
      exact
    />
    <Route path="/staff/:id/edit" component={EditStaff} exact />
    <Route path="/student/:id" component={SingleStudent} exact />
    <Route
      path="/student/:id/courses"
      component={StudentCourses}
      exact
    />
    <Route
      path="/student/:id/edit"
      component={EditStudent}
      exact
    />
    <Route
      path="/student/:id/history"
      component={StudentFeeHistory}
      exact
    />
    <Route render={(props) => <ErrorPage {...props} />} />
  </Switch>
);
