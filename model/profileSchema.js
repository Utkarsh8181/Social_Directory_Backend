import mongoose from "mongoose";
const profileSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    interests: [
    ]
})

const Profile = mongoose.model('profile', profileSchema)
export default Profile;