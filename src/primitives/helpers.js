import axios from "axios";

// Cloudinary Credentials
const CLOUDINARY_API_KEY = "393821722314564",
  CLOUDINARY_UPLOAD_PRESET = "m90fd8kv",
  CLOUDINARY_API_URL =
    "https://api.cloudinary.com/v1_1/adebayosegun/image/upload";

// Function to upload to Cloudinary
export function uploadToCloudinary(file, callback, errorCallback) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("api_key", CLOUDINARY_API_KEY);
  formData.append("timestamp", (Date.now() / 1000) | 0);

  return axios
    .post(CLOUDINARY_API_URL, formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" }
    })
    .then(response => {
      const data = response.data;
      const fileURL = data.secure_url;
      callback(fileURL);
    })
    .catch(error => {
      errorCallback(error);
    });
}
