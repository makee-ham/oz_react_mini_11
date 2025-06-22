export default function FormInput({ label, type, placeholder, validation }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex flex-col gap-2 text-sm text-[#aaaaaa]">
        {label}
        <input
          type={type}
          className="px-4 py-2 rounded-md bg-[#0f0f0f] border border-[#2e2e2e] text-[#f1f1f1] placeholder-[#aaaaaa]
                   focus:outline-none focus:ring-1 focus:ring-[#00ffff]/70 focus:border-[#00ffff]/70 transition duration-200"
          placeholder={placeholder}
        />
      </label>
      <p className="text-sm text-[#ff5f5f] mt-1">{validation}</p>
    </div>
  );
}
