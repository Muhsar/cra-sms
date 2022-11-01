/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// TODO: return teacher ID gotten in the token from the page that actually requires it
// const teacher_id = token()?.groups.length > 0 && (token()?.groups[0] || token()?.groups[1]) === "Teacher" && token()?.teacher_id
// const API_URL = "https://scoolz.herokuapp.com/api/v1";
// const API_URL = "http://localhost:8000/api/v1";
// const schoolId = token()?.school_uid;

// TODO: return teacher ID gotten in the easysch_token from the page that actually requires it
// const teacher_id = easysch_token()?.groups.length > 0 && (easysch_token()?.groups[0] || easysch_token()?.groups[1]) === "Teacher" && easysch_token()?.teacher_id
const API_URL = "https://scoolz.herokuapp.com/api/v1";
const LOGGED_IN = (schoolId) => `${API_URL}/schools/${schoolId}`;
export const VERIFY_OTP = (schoolId) => `${API_URL}/schools/${schoolId}/otp`
export const CHANGE_PASSWORD =(schoolId,uid)=> `${API_URL}/schools/${schoolId}/user-activate/${uid}`
export const LOGIN_URL =(schoolId)=> `${API_URL}/schools/${schoolId}/token`;
export const REGISTER_URL = `${API_URL}/register`;
export const STUDENTS = (schoolId) =>`${LOGGED_IN(schoolId)}/students`; //Add and get students
export const STUDENTSCOUNT = (schoolId) =>`${LOGGED_IN(schoolId)}/metadata`; //Add and get students
export const SENDMESSAGE = (schoolId) =>`${LOGGED_IN(schoolId)}/send-message`; //Add and get students
export const BIRTHDAYS = (schoolId) =>`${LOGGED_IN(schoolId)}/birthdays`; //Add and get students
export const TEACHERBIRTHDAYS = (schoolId) =>`${LOGGED_IN(schoolId)}/birthdays?role=Teacher`; //Add and get students
export const STUDENT = (schoolId, studentId) => `${STUDENTS(schoolId)}/${studentId}`; // get single student
export const STUDENTPAYMENT = (schoolId, studentId) => `${STUDENT(schoolId, studentId)}/payments`
export const TEACHERS = (schoolId) =>`${LOGGED_IN(schoolId)}/staffs`; //Add and get teachers
export const TEACHER = (schoolId, teacherId) => `${TEACHERS(schoolId)}/${teacherId}`; //get singe teacher
// export const TEACHERACCOUNT = `${TEACHER(teacher_id)}`; //get singe teacher
export const TEACHERCOURSES = (schoolId, teacherId) => `${TEACHERS(schoolId)}/${teacherId}/courses`; //get singe teacher
// export const TEACHER_COURSES = `${TEACHERCOURSES(teacher_id)}`
export const STUDENTCOURSES = (schoolId, studentId) => `${STUDENTS(schoolId)}/${studentId}/courses`; //get singe teacher
export const HOMEROOMS = (schoolId) =>`${LOGGED_IN(schoolId)}/classes`; // get and classes
export const HOMEROOM = (schoolId, classId) => `${HOMEROOMS(schoolId)}/${classId}`; //get single class
export const HOMEROOMCOURSES = (schoolId, classId) => `${HOMEROOMS(schoolId)}/${classId}/courses`; //get singe teacher
export const PAYMENTS = (schoolId) =>`${LOGGED_IN(schoolId)}/payments`; // get and make payments
export const PAYMENT = (schoolId, paymentId) => `${PAYMENTS(schoolId)}/${paymentId}`; //get a single payment
export const GET_COURSES = (schoolId) =>`${LOGGED_IN(schoolId)}/courses`; // get and courses
export const COURSE = (schoolId, courseId) => `${GET_COURSES(schoolId)}/${courseId}`;
export const CLASSSTUDENTS = (schoolId, classId) => `${HOMEROOM(schoolId, classId)}/students` // get a single course
export const  COURSESTUDENTS = (schoolId, id) => `${GET_COURSES(schoolId)}/${id}/students`
export const GRADE = (schoolId, id) => `${STUDENT(schoolId, id)}/grade`
export const RESULTS = (schoolId, id) => `${STUDENT(schoolId, id)}/result`
export const VIEW_RESULT = (slug, id) => `${API_URL}/schools/${slug}/students/${id}/result-slug`
export const GETSCHOOL = (slug) => `${API_URL}/schools/${slug}`
export const SENDRESULTS = (schoolId, classId) => `${API_URL}/schools/${schoolId}/classes/${classId}/send-result`
export const ADDBILL = (schoolId, classId) => `${API_URL}/schools/${schoolId}/classes/${classId}/bills`
export const GETBILL = (schoolId) => `${API_URL}/schools/${schoolId}/bills`
export const GETSTUDENTBILL = (schoolId, studentId) => `${API_URL}/schools/${schoolId}/students/${studentId}/bills`
