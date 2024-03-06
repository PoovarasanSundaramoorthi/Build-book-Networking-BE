import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please fill your email'],
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, 'Please fill your name']
  },
});

userSchema.set('timestamps', true);
userSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

userSchema.set('autoIndex', true);

const User = mongoose.model('User', userSchema);
export default User;