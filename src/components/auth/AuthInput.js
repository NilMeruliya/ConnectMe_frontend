export default function AuthInput({placeholder, type}) {
    return (
      <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
        <label className="text-sm font-bold tracking-wide">
          
        </label>
        <input
          className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
          type={type}
          placeholder={placeholder}
        />
      <p className="text-red-400"></p>
      </div>
    );
  }
  