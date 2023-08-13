import axios from 'axios';

export const uploadFiles = async (files: any[]) => {
  const formData = new FormData();
  formData.append('upload_preset', `${process.env.REACT_APP_CLOUD_SECRET}`);

  const uploaded = [];

  for (const f of files) {
    const { file, type } = f;
    formData.append('file', file);
    const res = await uploadCloudinary(formData);
    uploaded.push({
      file: res,
      type: type,
    });
  }
  return uploaded;
};

const uploadCloudinary = async (formData: FormData): Promise<void> => {
  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/raw/upload`,
      formData,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
