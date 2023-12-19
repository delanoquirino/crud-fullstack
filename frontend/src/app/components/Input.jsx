"use client";

export const Input = ({name, placeholder, type, register, rules, error}) => {
  return (
    <>
      <input
        className="w-full border-2 rounded-md h-11 px-2 outline-none"
        placeholder={placeholder}
        type={type}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className="text-red-500 my-1">{error}</p>}
    </>
  );
};