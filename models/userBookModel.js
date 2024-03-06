import mongoose from 'mongoose';

const userBookSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
});

userBookSchema.set('timestamps', true);
userBookSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

userBookSchema.set('autoIndex', true);

const UserBook = mongoose.model('UserBook', userBookSchema);
export default UserBook;
