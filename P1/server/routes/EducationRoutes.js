const { Router } = require('express');
const router = Router();

// Import controllers2
const courseController = require('../controllers/courseController');
const studentController = require('../controllers/studentController');
const teacherController = require('../controllers/teacherController');
const examController = require('../controllers/examController');
const classController = require('../controllers/classController');
const subjectController = require('../controllers/subjectController');
const enrollmentController = require('../controllers/enrollmentController');
const gradeController = require('../controllers/gradeController');
const assignmentController = require('../controllers/assignmentController');
const attendanceController = require('../controllers/attendanceController');

// Course routes
router.post('/courses', courseController.createCourse);
router.get('/courses', courseController.getCourses);
router.get('/courses/:id', courseController.getCourseById);
router.put('/courses/:id', courseController.updateCourseByID);
router.get('/coursesOfUser/:id', courseController.getCourseByUserId);
router.put('/coursesOfUser/:id', courseController.updateCourseByUserId);
router.delete('/courses/:id', courseController.deleteCourse);

// Student routes
router.post('/students', studentController.createStudent);
router.post('/students/login', studentController.loginStudent);
router.get('/students', studentController.getStudents);
router.get('/students/:id', studentController.getStudentById);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

// Teacher routes
router.post('/teachers', teacherController.createTeacher);
router.post('/teachers/login', teacherController.loginTeacher);
router.get('/teachers', teacherController.getTeachers);
router.get('/teachers/:id', teacherController.getTeacherById);
router.put('/teachers/:id', teacherController.updateTeacher);
router.delete('/teachers/:id', teacherController.deleteTeacher);

// Exam routes
router.post('/exams', examController.createExam);
router.get('/exams', examController.getExams);
router.get('/exams/:id', examController.getExamById);
router.put('/exams/:id', examController.updateExam);
router.delete('/exams/:id', examController.deleteExam);

// Class routes
router.post('/classes', classController.createClass);
router.get('/classes', classController.getClasses);
router.get('/classes/:id', classController.getClassById);
router.put('/classes/:id', classController.updateClass);
router.delete('/classes/:id', classController.deleteClass);

// Subject routes
router.post('/subjects', subjectController.createSubject);
router.get('/subjects', subjectController.getSubjects);
router.get('/subjects/:id', subjectController.getSubjectById);
router.put('/subjects/:id', subjectController.updateSubject);
router.delete('/subjects/:id', subjectController.deleteSubject);

// Enrollment routes
router.post('/enrollments', enrollmentController.createEnrollment);
router.get('/enrollments', enrollmentController.getEnrollments);
router.get('/enrollments/:id', enrollmentController.getEnrollmentById);
router.put('/enrollments/:id', enrollmentController.updateEnrollment);
router.delete('/enrollments/:id', enrollmentController.deleteEnrollment);

// Grade routes
router.post('/grades', gradeController.createGrade);
router.get('/grades', gradeController.getGrades);
router.get('/grades/:id', gradeController.getGradeById);
router.put('/grades/:id', gradeController.updateGrade);
router.delete('/grades/:id', gradeController.deleteGrade);

// Assignment routes
router.post('/assignments', assignmentController.createAssignment);
router.get('/assignments', assignmentController.getAssignments);
router.get('/assignments/:id', assignmentController.getAssignmentById);
router.put('/assignments/:id', assignmentController.updateAssignment);
router.delete('/assignments/:id', assignmentController.deleteAssignment);

// Attendance routes
router.post('/attendances', attendanceController.createAttendance);
router.get('/attendances', attendanceController.getAttendances);
router.get('/attendances/:id', attendanceController.getAttendanceRecordById);
router.put('/attendances/:id', attendanceController.updateAttendanceRecord);
router.delete('/attendances/:id', attendanceController.deleteAttendanceRecord);

module.exports = router;
