import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup' 
import AuthInput from "./AuthInput";

import { Link, useNavigate } from "react-router-dom";
import { signUpSchema } from "../../utils/validationUtil.js";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { userRegister } from "../../itemSlices/userSlice";

export default function RegisterForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {status, error} = useSelector((state) => state.user)

  // console.log(error);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema)
  });

  const onSubmit = async (userData) => {
    const res = await dispatch(userRegister({ userData, picture: ""}));
    console.log(res);

    if (res.payload.user) {
      navigate("/");
    }
    // or 
    // if (status === "succeeded" ) {
    //   navigate("/");
    // }
    console.log(status)
  }
   
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg2 rounded-xl">
      
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

{/* if we have any errors */}
          {
            error ? <div> <p className="text-red-400">{error}</p> </div> : null
          }
         
          <button
            className="w-full flex justify-center bg-blue2 text-gray-100 p-4 rounded-full tracking-wide
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
