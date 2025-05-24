import multer from "multer";

// Configure storage settings for multer
const storage = multer.diskStorage({
  // Set the destination folder for uploaded files
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Files will be saved in 'public/temp'
  },
  // Set the filename for uploaded files
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});

// Create the multer upload middleware with the defined storage settings
const upload = multer({
  storage, // Use the custom storage configuration
});

export { upload }; // Export the upload middleware for use in routes