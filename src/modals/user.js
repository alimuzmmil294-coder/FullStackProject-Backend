import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter the username...."],
        trim: true
    },
    email: {
        type: String,
        required: [true, "please enter the username...."],
        trim: true,
        unique: true
    },
    authProvider: {
        type: String,
        enum: ['LOCAL', 'GOOGLE'],
        default: 'LOCAL'
    },
    password: {
        type: String,
        required: function () {
            return this.authProvider === 'LOCAL'
        },
    },
    googleId: {
        type: String,
        required: function () {
            return this.authProvider === 'GOOGLE'
        },
    },
    avatar: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ['ADMIN', 'SELLER', 'BUYER'],
        default: 'BUYER'
    },
    shopName: {
        type: String,
        required: function () {
            return this.role === "SELLER"
        }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

export const User = mongoose.model("user", userSchema);