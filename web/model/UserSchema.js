import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    }
},
    {
        timestamps: true,
    });

const Users = models.user || model('user', userSchema);

export default Users;
