export default function AuthInput({
  name,
  placeholder,
  type,
  register,
  error,
}) {
  
  return (
    <div className="mt-8 content-center dark:text-dark_text1 space-y-1">
      <label htmlFor={name} className="text-sm font-bold tracking-wide">
        {placeholder}
      </label>

      <input
        className="w-full dark:bg-dark_bg3 text-base py-2 px-4 rounded-lg outline-none"
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="text-red-400">{error}</p>}
      <p className="text-red-400"></p>
    </div>
  );
}
