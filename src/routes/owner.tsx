import SchoolBirthdays from "pages/school/birthdays";
import SchoolCourses from "pages/school/courses";
import SchoolFees from "pages/school/fees";
import SMS from "pages/school/sms";
import SchoolStaffs from "pages/school/staffs";
import SchoolStudents from "pages/school/students";
import SchoolDashboard from "pages/school";
import SchoolClasses from "pages/school/classes";
import SingleClass from "pages/school/class/class";
import SingleCourse from "pages/school/course/course";
import SingleStaff from "pages/school/staff/index";
import TeacherCourses from "pages/school/staff/courses";
import EditStaff from "pages/school/staff/edit";
import SingleStudent from "pages/school/student/index";
import StudentCourses from "pages/school/student/courses";
import EditStudent from "pages/school/student/edit";
import StudentFeeHistory from "pages/school/student/history";
import AuthorizedResult from "pages/result/student";
import UnAuthorizedResult from "pages/parent-result/student";
import LandingPage from "pages";
import { Route } from 'react-router-dom';
import { Switch } from "react-router-dom";
import ErrorPage from "pages/404";
import Bill from "pages/school/bill";

export const Owner = (
  <Switch>
    {/* <Route path="/" component={LandingPage} exact /> */}
    <Route
      path="/parent-result/:id"
      component={UnAuthorizedResult}
      exact
    />
    <Route path="/result/:id" component={AuthorizedResult} exact />
    <Route path="/" component={SchoolDashboard} exact />
    {/* <Route path="" component={SchoolDashboard} exact /> */}
    <Route path="/classes" component={SchoolClasses} exact />
    <Route path="/students" component={SchoolStudents} exact />
    <Route path="/staffs" component={SchoolStaffs} exact />
    <Route path="/courses" component={SchoolCourses} exact />
    <Route path="/fees" component={SchoolFees} exact />
    <Route path="/sms" component={SMS} exact />
    <Route path="/bill" component={Bill} exact />
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
    <Route
      path="/student/:id/edit"
      component={EditStudent}
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
