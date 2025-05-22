// asyncHandler is a higher-order function that wraps async route handlers

// It ensures that any errors thrown in the async handler are passed to Express's error middleware

const asyncHandler = (requestHandler) => (req, res, next) => {
    // Execute the requestHandler and catch any errors, passing them to next()
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
}

export { asyncHandler }


// Alternative version using try-catch (commented out):
// const asyncHandler = (fn) => async (req, res, next) =>{
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


