import express from 'express';
import { createCourses, deleteCourses, getCourses, getCoursesById, updateCourses } from '../controller/CourseController.js';
import { verifyToken, validateUser } from '../middleware/middleware.js';

const router = express.Router()

router.get('/getCourses', verifyToken, getCourses)
router.get('/getCourseById/:id', getCoursesById)
router.get('/createCourses/',verifyToken, validateUser, createCourses)
router.put('/updateCourses/', updateCourses)
router.delete('/deleteCoursesById/:id', deleteCourses)

export default router;