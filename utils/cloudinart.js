const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadeCloudinary = async (fileBuffer) => {
    try {
        if (!fileBuffer) {
            console.log("File buffer not provided");
            return false;
        }

        const response = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                resource_type: 'auto'
            }, (error, result) => {
                if (error) {
                    console.log("Error in uploading file to Cloudinary", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });

            // Write the buffer to the upload stream
            uploadStream.end(fileBuffer);
        });

        return response;
    } catch (error) {
        console.log("Error in uploading file to Cloudinary", error);
        return false;
    }

}