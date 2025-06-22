export default function GoogleBtn({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-sm border border-[#747775] shadow"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google Logo"
        className="w-5 h-5"
      />
      <span className="font-roboto font-medium text-[#1F1F1F]">{label}</span>
    </button>
  );
}
