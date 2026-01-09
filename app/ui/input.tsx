type InputType = "email" | "password" | "username";

export default function Input({ type }: { type: InputType }) {
  const placeholder = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <input className="rounded-xl w-full bg-black px-3 p-2 py-2 text-lg outline" id={type} type={type} name={type} placeholder={placeholder} />
  );
}
