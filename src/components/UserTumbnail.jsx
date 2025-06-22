import defaultThumb from "../assets/user.webp";

export default function UserThumbnail({ onClick, thumbnail = defaultThumb }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-8 h-8 rounded-full mask-radial-at-center mask-radial-from-100% bg-center bg-cover"
      style={{ backgroundImage: `url(${thumbnail})` }}
    />
  );
}
