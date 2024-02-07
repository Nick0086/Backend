const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadeCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            // console.log(`File not found : ${localFilePath}`);
            return false;
        } else {
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: 'auto'
            });
            // Delete the temporary file from the server after successful upload
            return response;
        }

    } catch (error) {
        console.log("Error in uploading file to Cloudinary");
        return false;
    }
}

exports.deleteFromCloudinary = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        throw error;
    }

}