import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen dark:bg-dark_bg1 flex justify-center items-center py-[19px] overflow-hidden">
     
      <div className="flex w-[1600px] mx-auto h-full">
 
        <RegisterForm />
      </div>
    </div>
  );
}
