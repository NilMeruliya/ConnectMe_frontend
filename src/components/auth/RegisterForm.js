import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup' 
import AuthInput from "./AuthInput";

import { Link, useNavigate } from "react-router-dom";
import { signUpSchema } from "../../utils/validationUtil.js";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { changeStatus, userRegister } from "../../itemSlices/userSlice";
import { useState } from "react";
import Image from "./Image";
import axios from "axios";
const cloud_name = process.env.REACT_APP_CLOUDNAME;
const cloud_secret = process.env.REACT_APP_CLOUDSECRET;

export default function RegisterForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {status, error} = useSelector((state) => state.user)
    // console.log(error);
  const [image, setImage] = useState();
  const [readableImage, setReadableImage] = useState("");

  // console.log(`image: ${image}, readableImage: ${readableImage}`);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema)
  });

  // submit the form

  const onSubmit = async (userData) => {
    dispatch(changeStatus("loading"));
    if (image) {
      //upload to cloudinary and then register user
      await uploadImage().then(async (response) => {
        let res = await dispatch(
          userRegister({ ...userData, picture: response.secure_url })
        );
        if (res?.payload?.user) {
          navigate("/");
        }
      });
    } else {
      let res = await dispatch(userRegister({ ...userData, picture: "" }));
      if (res?.payload?.user) {
        navigate("/");
      }
    }
  }

  // upload an image

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file", image);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    console.log(data);
    return data;
   
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-[80%] max-w-md space-y-8 p-10 dark:bg-dark_bg2 rounded-xl">
      
        <div className="text-center dark:text-dark_text1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
      
        <form
          className="mt-6 space-y-6"
          onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            name="name"
            type="text"
            placeholder="Full Name"
            register={register}  // using react-form
            error={errors?.name?.message} // using react-form
      
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}  // using react-form
            error={errors?.email?.message} // using react-form
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}  // using react-form
            error={errors?.status?.message} // using react-form
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}  // using react-form
            error={errors?.password?.message} // using react-form
          />

          {/* profile picture */}
          <Image 
            readableImage={readableImage}
            setImage={setImage}
            setReadableImage={setReadableImage}
           />

{/* if we have any errors */}
          {
            error ? <div> <p className="text-red-400">{error}</p> </div> : null
          }
         
          <button
            className="w-full flex justify-center bg-blue3 text-black-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-blue1 shadow-lg cursor-pointer transition ease-in duration-300
          "
            type="submit"
          >
          {status === "loading" ? <BeatLoader  color="#fff" size={16}/> : "Sign Up"}
          {/* https://www.davidhu.io/react-spinners/  */}
           
          </button>
         
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text1">
            <span>Already have an account ?</span>
            <Link
              to="/login"
              className=" hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
