import { CloudinaryUploader } from "../services/CloudinaryUploader";

const uploader = new CloudinaryUploader(
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    import.meta.env.VITE_CLOUDINARY_PRESET
)

uploader.attachInput("file_upload_p1", "preview_p1");
uploader.attachInput("file_upload_p2", "preview_p2");