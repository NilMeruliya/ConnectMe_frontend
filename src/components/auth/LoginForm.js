
import { yupResolver } from '@hookform/resolvers/yup' 
import AuthInput from "./AuthInput";

import { Link } from "react-router-dom";
import { signInSchema } from "../../utils/validationUtil";
import { useForm } from 'react-hook-form';

export default function LoginForm() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema)
  })

  const onSubmit = (data) => console.log(data)
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
    
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg2 rounded-xl">
      <img src="" alt="" srcset="" />
     
        <div className="text-center dark:text-dark_text1">
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
       
        <form
         className="mt-6 space-y-6"
         onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
           placeholder="Email address"
           name="email"
            type="text"
            register={register}  // using react-form
            error={errors?.email?.message} // using react-form
     
          />
          <AuthInput
            placeholder="Password"
            name="password"
            type="password"
            register={register}  // using react-form
            error={errors?.password?.message} // using react-form
          />

         
          <button
            className="w-full flex justify-center bg-blue2 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-blue1 shadow-lg cursor-pointer transition ease-in duration-300
          "
            type="submit"
          >
           Login
          </button>
          
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text1">
            <span>Don't have an account ?</span>
            <Link
              to="/register"
              className=" hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
