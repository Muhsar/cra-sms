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
import StaffDashboard from "pages/staff";
import StaffCourses from "pages/staff/courses";
import StaffClass from "pages/staff/class";
import StaffCourse from "pages/staff/course";
import AuthorizedResult from "pages/result/student";
import UnAuthorizedResult from "pages/parent-result/student";
import LandingPage from "pages";
import LoginPage from "pages/login";
import OTP from "pages/otp";
import VerifyAccount from "pages/verify/staff";
import { Route } from 'react-router-dom';
import { Switch } from "react-router-dom";
import ErrorPage from "./pages/404";
import { Redirect } from "react-router-dom"
import SecretaryDashboard from "pages/secretary";
import SecretaryStudents from "pages/secretary";
import SecretaryClasses from "pages/secretary";
import SecretaryCourses from "pages/secretary";
import SecretaryStudent from "pages/secretary";
import SecretaryClass from "pages/secretary";
import SecretaryCourse from "pages/secretary";
import SecretaryEditCourse from "pages/secretary";
import SecretaryEditClass from "pages/secretary";
import SecretaryEditStudent from "pages/secretary";

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
export const Teacher = (
  <Switch>
    {/* <Route path="/:slug/login" component={LoginPage} exact /> */}
    <Route path="/:slug/staff" component={StaffDashboard} exact />
    <Route path="/:slug/staff/courses" component={StaffCourses} exact />
    <Route path="/:slug/staff/course/:id" component={StaffCourse} exact />
    <Route path="/:slug/staff/class" component={StaffClass} exact />
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
export const Parent = (
  <Switch>
    {/* <Route path="/:slug/login" component={LoginPage} exact /> */}
    <Route path="/:slug/parent" component={StaffDashboard} exact />
    <Route path="/:slug/parent/courses" component={StaffCourses} exact />
    <Route path="/:slug/parent/course/:id" component={StaffCourse} exact />
    <Route path="/:slug/parent/class" component={StaffClass} exact />
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
export const Secretary = (
  <Switch>
    {/* <Route path="/:slug/login" component={LoginPage} exact /> */}
    <Route path="/:slug/secretary" component={SecretaryDashboard} exact />
    <Route path="/:slug/secretary/students" component={SecretaryStudents} exact />
    <Route path="/:slug/secretary/classes" component={SecretaryClasses} exact />
    <Route path="/:slug/secretary/courses" component={SecretaryCourses} exact />
    <Route path="/:slug/secretary/student/:id" component={SecretaryStudent} exact />
    <Route path="/:slug/secretary/class/:id" component={SecretaryClass} exact />
    <Route path="/:slug/secretary/course/:id" component={SecretaryCourse} exact />
    <Route path="/:slug/secretary/course/edit/:id" component={SecretaryEditCourse} exact />
    <Route path="/:slug/secretary/class/edit/:id" component={SecretaryEditClass} exact />
    <Route path="/:slug/secretary/student/edit/:id" component={SecretaryEditStudent} exact />
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
export const Bursar = (
  <Switch>
    {/* <Route path="/:slug/login" component={LoginPage} exact /> */}
    <Route path="/:slug/bursar" component={StaffDashboard} exact />
    <Route path="/:slug/bursar/students" component={StaffCourses} exact />
    <Route path="/:slug/bursar/history/:id" component={StaffCourse} exact />
    <Route path="/:slug/bursar/payments" component={StaffClass} exact />
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
export const Owner = (
  <Switch>
    {/* <Route path="/:slug/login" component={LoginPage} exact /> */}
    <Route path="/" component={LandingPage} exact />
    <Route
      path="/:slug/parent-result/:id"
      component={UnAuthorizedResult}
      exact
    />
    <Route path="/:slug/result/:id" component={AuthorizedResult} exact />
    <Route path="/:slug/school" component={SchoolDashboard} exact />
    <Route path="/:slug/school/classes" component={SchoolClasses} exact />
    <Route path="/:slug/school/students" component={SchoolStudents} exact />
    <Route path="/:slug/school/staffs" component={SchoolStaffs} exact />
    <Route path="/:slug/school/courses" component={SchoolCourses} exact />
    <Route path="/:slug/school/fees" component={SchoolFees} exact />
    <Route path="/:slug/school/sms" component={SMS} exact />
    <Route path="/:slug/school/birthdays" component={SchoolBirthdays} exact />
    <Route path="/:slug/school/class/:id" component={SingleClass} exact />
    <Route path="/:slug/school/course/:id" component={SingleCourse} exact />
    <Route path="/:slug/school/staff/:id" component={SingleStaff} exact />
    <Route
      path="/:slug/school/staff/:id/courses"
      component={TeacherCourses}
      exact
    />
    <Route path="/:slug/school/staff/:id/edit" component={EditStaff} exact />
    <Route path="/:slug/school/student/:id" component={SingleStudent} exact />
    <Route
      path="/:slug/school/student/:id/courses"
      component={StudentCourses}
      exact
    />
    <Route
      path="/:slug/school/student/:id/edit"
      component={EditStudent}
      exact
    />
    <Route
      path="/:slug/school/student/:id/history"
      component={StudentFeeHistory}
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
export const Both = (
  <Switch>
    {/* <Route path="/:slug/login" component={LoginPage} exact /> */}
    <Route path="/:slug/school" component={SchoolDashboard} exact />
    <Route path="/:slug/school/classes" component={SchoolClasses} exact />
    <Route path="/:slug/school/students" component={SchoolStudents} exact />
    <Route path="/:slug/school/staffs" component={SchoolStaffs} exact />
    <Route path="/:slug/school/courses" component={SchoolCourses} exact />
    <Route path="/:slug/school/fees" component={SchoolFees} exact />
    <Route path="/:slug/school/sms" component={SMS} exact />
    <Route path="/:slug/school/birthdays" component={SchoolBirthdays} exact />
    <Route path="/:slug/school/class/:id" component={SingleClass} exact />
    <Route path="/:slug/school/course/:id" component={SingleCourse} exact />
    <Route path="/:slug/school/staff/:id" component={SingleStaff} exact />
    <Route
      path="/:slug/school/staff/:id/courses"
      component={TeacherCourses}
      exact
    />
    <Route path="/:slug/school/staff/:id/edit" component={EditStaff} exact />
    <Route path="/:slug/school/student/:id" component={SingleStudent} exact />
    <Route
      path="/:slug/school/student/:id/courses"
      component={StudentCourses}
      exact
    />
    <Route
      path="/:slug/school/student/:id/edit"
      component={EditStudent}
      exact
    />
    <Route
      path="/:slug/school/student/:id/history"
      component={StudentFeeHistory}
      exact
    />
    <Route path="/:slug/staff" component={StaffDashboard} exact />
    <Route path="/:slug/staff/courses" component={StaffCourses} exact />
    <Route path="/:slug/staff/course/:id" component={StaffCourse} exact />
    <Route path="/:slug/staff/class" component={StaffClass} exact />
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
