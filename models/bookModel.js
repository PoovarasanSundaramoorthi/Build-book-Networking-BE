import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: String,
    isbn: String,
});

bookSchema.set('timestamps', true);
bookSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

bookSchema.set('autoIndex', true);

const Book = mongoose.model('Book', bookSchema);
export default Book;
