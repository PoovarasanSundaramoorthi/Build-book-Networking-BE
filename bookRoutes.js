import { Router } from 'express';
import { SearchBook, createBook, deleteBook, getAllBook, getOneBook, updateBook } from '../controllers/bookController.js';

const router = Router();

router.route('/').post(createBook).get(getAllBook);
router.route('/:id').patch(updateBook).get(getOneBook).delete(deleteBook);
router.route('/search').post(SearchBook);

export default router;