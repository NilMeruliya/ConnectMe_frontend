import axios from "axios";

const cloudName = process.env.REACT_APP_CLOUDNAME;
const cloudSecret = process.env.REACT_APP_CLOUDSECRET;

export const uploadFiles = async (files) => {
  let formData = new FormData();
  formData.append("upload_preset", cloudSecret);
  // console.log(cloudSecret);
  let uploaded = [];
  for (const f of files) {
    const { file, type } = f;
    formData.append("file", file);
    let res = await uploadToTheCloudinary(formData);
    uploaded.push({
      file: res,
      type: type,
    });
    // console.log(res);
    console.log("uploaded");
    console.log(uploaded);
  }
  return uploaded;
  
};


const uploadToTheCloudinary = async (formData) => {
  return new Promise(async (resolve) => {
    return await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        formData
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
