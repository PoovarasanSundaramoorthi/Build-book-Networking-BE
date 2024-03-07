import { Router } from 'express';
import { CreateUser, GetAllUsers } from '../controllers/userController.js';

const router = Router();

router.route('/create').post(CreateUser);
router.route('/').get(GetAllUsers);
// router.route('/:id').patch(updateBook).get(getOneBook).delete(deleteBook);

export default router;