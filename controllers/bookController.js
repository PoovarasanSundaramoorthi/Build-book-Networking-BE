import Book from '../models/bookModel.js';
import { createOne, getAll, getOne, updateOne, deleteOne } from '../controllers/baseController.js';

// export const createBook = createOne(Book);
// export const getAllBook = getAll(Book);
export const getOneBook = getOne(Book);
export const updateBook = updateOne(Book);
export const deleteBook = deleteOne(Book);

export async function getAllBook(req, res, next) {
    try {
        const { data } = req.query;
        const query = data ? { title: { $regex: data, $options: 'i' } } : {};
        const books = await Book.find(query);

        return res.json({
            message: 'Books fetched successfully',
            user: books
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function createBook(req, res, next) {
    try {
        const { title, ISBN, author, description } = req.body;
        // Check if the book already exists in the catalog
        const existingBook = await Book.findOne({ ISBN });
        if (existingBook) {
            return res.status(400).json({ message: 'Book with this ISBN already exists in the catalog' });
        }
        const newBook = await Book.create({
            title,
            ISBN,
            author,
            description
        });
        return res.json({
            message: 'User created',
            book: newBook
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function SearchBook(req, res, next) {
    try {

    } catch (err) {
        next(err);
        console.log('err', err);
    }
}