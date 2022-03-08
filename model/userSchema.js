import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
},
{
    timestamp: true
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

const User = mongoose.model('users', userSchema)
export default User;
