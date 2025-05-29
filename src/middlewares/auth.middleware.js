import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";

// Middleware to verify JWT token for protected routes
const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Retrieve token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            // If no token found, throw unauthorized error
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify and decode the JWT token using the secret key
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user by ID from the decoded token, exclude password and refreshToken fields
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            // If user not found, throw invalid access token error
            throw new ApiError(401, "Invalid access token");
        }

        // Attach the user object to the request for use in next middleware/routes
        req.user = user;
        next(); // Proceed to the next middleware/route handler

    } catch (error) {
        // If any error occurs, throw invalid token access error
        throw new ApiError(401, "invalid token access");
    }
});

export { verifyJWT }