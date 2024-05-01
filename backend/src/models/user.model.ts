import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const userSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, "Field must be a valid email address"]
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String
    }
});

export default mongoose.model('User', userSchema);