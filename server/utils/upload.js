import imagekit from './imagekit.js';

export const uploadToImageKit = async (file) => {
  try {
    const result = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: 'digital-archive'
    });

    return {
      url: result.url
    };
  } catch (error) {
    throw new Error('Failed to upload file to ImageKit: ' + error.message);
  }
};
