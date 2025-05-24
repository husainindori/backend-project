import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory: [
            {
            type: Schema.Types.ObjectId,
            ref: "Video",
            },
        ],
        password: {
            type: String,
            required: [true, "Password Is Required"],
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);


// Middleware function that runs before saving a user document
userSchema.pre('save', async function (next) {
    // If the password is not modified, skip hashing and move to the next middleware
    if (!this.isModified('password')) return next();

    // Hash the password with a salt round of 10 before saving to the database
    this.password = await bcrypt.hash(this.password, 10);

    // Proceed to the next middleware or save operation
    next();
});

// Instance method to check if entered password matches the hashed password in the database
userSchema.methods.isPasswordCorrect = async function(password) {
    // Compare the plain password with the hashed one
    return await bcrypt.compare(password, this.password);
}

// Instance method to generate an access token for the user (used for authentication)
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            // Payload data included in the token
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },
        // Secret key to sign the token (stored in environment variables for security)
        process.env.ACCESS_TOKEN_SECRET,
        {
            // Token expiration time (also from environment variable)
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    );
};

// Instance method to generate a refresh token (used to get a new access token after it expires)
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            // Typically minimal payload for refresh token
            _id: this._id,
        },
        // Secret key for refresh token
        process.env.REFRESH_TOKEN_SECRET,
        {
            // Expiration time for refresh token
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    );
};


export const User = mongoose.model("User", userSchema);
