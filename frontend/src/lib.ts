
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_cloud_name,
//     api_key: process.env.CLOUDINARY_api_key,
//     api_secret: process.env.CLOUDINARY_api_secret
// });

export function uploadImage(imageUploaded: string): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            imageUploaded,
            { width: 400, height: 300, crop: "fill" },
            (err, res) => {
                if (err) reject(err);
                resolve(res!);
            }
        );
    });
}