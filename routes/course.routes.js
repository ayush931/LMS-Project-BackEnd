import { Router } from "express";

const router = Router()

router.get('/', getAllCourses)
router.get('/:id', getLectureByCourseId)

export default router