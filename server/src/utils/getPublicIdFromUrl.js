// utils/getCloudinaryPublicId.js
export const getPublicIdFromUrl = (url) => {
  if (!url) return null;

  // Example URL: https://res.cloudinary.com/cloud_name/image/upload/v12345/folder/logo.png
  const parts = url.split("/upload/");
  if (parts.length < 2) return null;

  const pathWithVersion = parts[1]; // v12345/folder/logo.png
  const pathWithoutVersion = pathWithVersion.replace(/^v\d+\//, ""); // folder/logo.png

  // Removes extension -> folder/logo
  const publicId = pathWithoutVersion.substring(0, pathWithoutVersion.lastIndexOf("."));
  return publicId;
};