export default function FormInput({
  label,
  type,
  placeholder,
  inputRef,
  validation,
  onInput,
}) {
  const isInvalid = !!validation; // 에러 문구 여부 체크

  return (
    <div className="flex flex-col gap-1">
      <label className="flex flex-col gap-2 text-sm text-[#aaaaaa]">
        {label}
        <input
          ref={inputRef}
          type={type}
          className={`px-4 py-2 rounded-md bg-[#0f0f0f] border ${
            isInvalid
              ? "border-[#ff5f5f] focus:ring-[#ff5f5f]/70 focus:border-[#ff5f5f]/70"
              : "border-[#2e2e2e] focus:ring-[#00ffff]/70 focus:border-[#00ffff]/70"
          } text-[#f1f1f1] placeholder-[#aaaaaa] focus:outline-none focus:ring-1 transition duration-200`}
          placeholder={placeholder}
          onChange={onInput}
        />
      </label>
      {isInvalid && <p className="text-sm text-[#ff5f5f] mt-1">{validation}</p>}
    </div>
  );
}
