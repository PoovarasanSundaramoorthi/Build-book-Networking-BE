import UserBook from "../models/userBookModel.js";

export async function CreateUserBook(req, res, next) {
    try {
        const data = req.body;
        const userId = req.params.id;

        // Check if the user already has this book
        const existingUserBook = await UserBook.findOne({
            userId: userId,
            bookId: data.bookId
        });

        if (existingUserBook) {
            return res.status(200).json({
                message: 'User already has this book'
            });
        }

        // Create a new UserBook entry if it doesn't already exist
        const createBook = await UserBook.create({
            userId: userId,
            bookId: data.bookId
        });

        return res.json({
            message: 'User Books created successfully',
            userBooks: createBook
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getUserIdBooks(req, res, next) {
    try {
        const { userId } = req.params;
        // Find all user book entries for the given user ID
        const userBooks = await UserBook.find({ userId: userId }).populate('bookId');
        // // Extract book details from populated bookId field
        // const books = userBooks.map(userBook => ({
        //     id: userBook.bookId.id,
        //     title: userBook.bookId.title,
        //     // Include other book details as needed
        // }));

        return res.status(200).json({
            message: 'User books fetched successfully',
            userBooks: userBooks
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
