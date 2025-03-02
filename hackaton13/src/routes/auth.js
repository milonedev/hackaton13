import express from 'express';
import { createUser, loginUser } from '../controller/UserController.js';
// import {}

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)

export default router;