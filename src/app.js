import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Create an Express application instance
const app = express();

// ===================== MIDDLEWARE CONFIGURATION =====================

// Enable CORS (Cross-Origin Resource Sharing) with options
// Allows requests from the specified origin and enables credentials (cookies, etc.)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Parse incoming cookies
app.use(cookieParser());

// Parse incoming JSON requests with a size limit of 16kb
app.use(express.json({ limit: '16kb' }));

// Parse URL-encoded data with a size limit of 16kb
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// ====================================================================

// Export the configured app instance for use in other modules
export { app }