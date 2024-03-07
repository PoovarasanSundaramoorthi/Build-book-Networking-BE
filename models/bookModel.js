import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    author: String,
    description: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
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
