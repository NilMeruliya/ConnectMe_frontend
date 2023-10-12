
import AuthInput from "./AuthInput";

import { Link } from "react-router-dom";

export default function LoginForm() {
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
    
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg6 rounded-xl">
     
        <div className="text-center dark:text-dark_text1">
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
       
        <form className="mt-6 space-y-6">
          <AuthInput
           placeholder="Email address"
     
          />
          <AuthInput
            placeholder="Password"
           
          />

         
          <button
            className="w-full flex justify-center bg-blue2 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-blue1 shadow-lg cursor-pointer transition ease-in duration-300
          "
            type="submit"
          >
           Login
          </button>
          {/* Sign in link */}
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
