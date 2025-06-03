import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // secure: true
})

// upload the file on cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    if(!localFilePath) return null

    try {
         //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        // file has been uploaded successfully
        console.log(`3. File uploaded on cloudinary successfully ${response}`);

        fs.unlinkSync(localFilePath)
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null
    }
}

// delete the file from cloudinary
const deleteOnCloudinary = async (publicId) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId)
        return response
    } catch (error) {
        return null
    }
}

// update the file on cloudinary
// const updateOnCloudinary = async (publicId, localFilePath) => {
//     try {
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             public_id: publicId,
//             resource_type: 'auto'
//         })
//         return response
//     } catch (error) {
//         return null
//     }
// }

// extract public id from url

const extractPublicIdFromUrl = (imageUrl) => {
    try {
        const parts = imageUrl.url.split('/');
        const fileName = parts.pop()
        const publicId = parts.slice(parts.indexOf('upload')+1).join('/') + '/' + fileName.split('.')[0];
        return publicId
    } catch (error) {
        console.error("Error extracting public ID from URL:", error);
        return null
    }
}

export { 
    uploadOnCloudinary,
    deleteOnCloudinary,
    extractPublicIdFromUrl,
 }
