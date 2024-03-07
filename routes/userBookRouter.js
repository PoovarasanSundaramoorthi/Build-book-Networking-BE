import { Router } from 'express';
import { CreateUserBook, getUserIdBooks } from '../controllers/bookUserController.js';

const router = Router();
router.route('/:id').post(CreateUserBook);
router.route('/:userId').get(getUserIdBooks);
export default router;