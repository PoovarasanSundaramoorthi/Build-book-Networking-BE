import Book from '../models/bookModel.js';
import { createOne, getAll, getOne, updateOne, deleteOne } from '../controllers/baseController.js';

export const createBook = createOne(Book);
export const getAllBook = getAll(Book);
export const getOneBook = getOne(Book);
export const updateBook = updateOne(Book);
export const deleteBook = deleteOne(Book);

export async function SearchBook(req, res, next) {
    try {

    } catch (err) {
        next(err);
        console.log('err', err);
    }
}