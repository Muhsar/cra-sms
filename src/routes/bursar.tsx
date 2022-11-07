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
import BursarDashBoard from "Bursar/pages";
import BursarStudents from "Bursar/pages/students";
import BursarStudentHistory from "Bursar/pages/history";
import BursarPayments from "Bursar/pages/payments";
import LandingPage from "pages";
import { Route } from 'react-router-dom';
import { Switch } from "react-router-dom";
import ErrorPage from "pages/404";
import Dashboard from '../pages/bursar/index';
import Bill from "pages/bursar/bill";
import Debt from "pages/bursar/debt";
import Discount from "pages/bursar/discount";

export const Bursar = (
  <Switch>
    {/* <Route path="/login" component={LoginPage} exact /> */}
    <Route path="/" component={Dashboard} exact />
    <Route path="/" component={Dashboard} exact />
    <Route path="/fees" component={SchoolFees} exact />
    <Route path="/bill" component={Bill} exact />
    <Route path="/debt" component={Debt} exact />
    <Route path="/discount" component={Discount} exact />
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