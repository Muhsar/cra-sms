/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// TODO: return teacher ID gotten in the token from the page that actually requires it
// const teacher_id = token()?.groups.length > 0 && (token()?.groups[0] || token()?.groups[1]) === "Teacher" && token()?.teacher_id
// const API_URL = "https://scoolz.herokuapp.com/api/v1";
const API_URL = "http://localhost:8000/api/v1";
// const schoolId = token()?.school_uid;
const LOGGED_IN = (schoolId) => `${API_URL}/schools/${schoolId}`;
export const VERIFY_OTP = (schoolId) => `${API_URL}/schools/${schoolId}/otp`
export const CHANGE_PASSWORD =(schoolId,uid)=> `${API_URL}/schools/${schoolId}/user-activate/${uid}`
export const LOGIN_URL = `${API_URL}/token`;
export const REGISTER_URL = `${API_URL}/register`;
export const STUDENTS = (schoolId) =>`${LOGGED_IN(schoolId)}/students`; //Add and get students
export const SENDMESSAGE = (schoolId) =>`${LOGGED_IN(schoolId)}/send-message`; //Add and get students
export const BIRTHDAYS = (schoolId) =>`${LOGGED_IN(schoolId)}/birthdays`; //Add and get students
export const TEACHERBIRTHDAYS = (schoolId) =>`${LOGGED_IN(schoolId)}/birthdays?role=Teacher`; //Add and get students
export const STUDENT = (schoolId, studentId) => `${STUDENTS(schoolId)}/${studentId}`; // get single student
export const STUDENTPAYMENT = (schoolId, studentId) => `${STUDENT(schoolId, studentId)}/payments`
export const TEACHERS = (schoolId) =>`${LOGGED_IN(schoolId)}/teachers`; //Add and get teachers
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
// /schools/slug
//  /students/studentId/payments
// /schools/schoolID/students/studentIIID/grade
// /schools/schoolID/birthdays?role=Teacher
// /schools/schoolID/students/studentId/results
// Ep to assign subject to classes. 
// /api/school/schoolid/classes/classid/courses.
// Post request.
// Request body is 
// {subject_ids : [ ]}
// path('schools/<uuid:school_id>/students', student_views.StudentsView.as_view()), # Create students and get all students
// path('schools/<uuid:school_id>/students/<int:pk>', TokenRefreshView.as_view(), name='token_refresh'), # View/edit/delete single student and
// path('schools/<uuid:school_id>/classes', TokenRefreshView.as_view(), name='token_refresh'), # Get all classes for school admin and create class
// path('schools/<uuid:school_id>/classes/<int:pk>', TokenRefreshView.as_view(), name='token_refresh'), # Edit/view and delete class
// path('schools/<uuid:school_id>/classes', TokenRefreshView.as_view(), name='token_refresh'),
// path('schools/<uuid:school_id>/classes/<int:pk>', TokenRefreshView.as_view(), name='token_refresh'),
// path('schools/<uuid:school_id>/payments', TokenRefreshView.as_view(), name='token_refresh'),
// path('schools/<uuid:school_id>/payments/<int:pk>', TokenRefreshView.as_view(), name='token_refresh'),
// path('schools/<uuid:school_id>/teachers', TokenRefreshView.as_view(), name='token_refresh'),
// path('schools/<uuid:school_id>/teachers/<int:pk>', TokenRefreshView.as_view(), name='token_refresh'),
// path('schools/<uuid:school_id>/courses', TokenRefreshView.as_view(), name='token_refresh'), # Add courses
// path('schools/<uuid:school_id>/courses/<int:pk>', TokenRefreshView.as_view(), name='token_refresh'),
// 4edd41dd - 0798 - 4184 - 90b8 - a4800f77685d
// {
// 	"first_name": "Issa",
// 	"last_name": "Jubril",
// 	"religion": "Islam",
// 	"middle_name": "isere",
// 	"guardian_full_name": "Seidu Jubril",
// 	"guardian_full_name2": "Safiat Jubril",
// 	"phone_number": "08034246506",
// 	"phone_number2": "08162203128",
// 	"address": "22 Olukosi street Agege",
// 	"state_of_origin": "Kogi",
// 	"date_of_birth": "1992-12-12",
// 	"email": "jubrilissa@gmail.com",
// 	"outstanding_debt": 400.50,
// 	"class_id": 3,
// 	"gender": "Male"
// }
// {
// 	"name": "JSS 2",
// 	"fee": 120000.56
// }
// {
// 	"first_name": "Issa",
// 	"last_name": "Jubril",
// 	"religion": "Islam",
// 	"phone_number": "08034246506",
// 	"address": "22 Olukosi street Agege",
// 	"date_of_birth": "1992-12-12",
// 	"email": "teacher2@gmail.com",
// 	"gender": "Male"
// }