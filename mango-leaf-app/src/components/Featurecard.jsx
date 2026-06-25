export default function FeatureCard({
  icon,
  title,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        bg-white/10
        backdrop-blur-lg
        rounded-2xl
        p-4
        text-left
        border
        border-white/10
        hover:border-green-500
        hover:scale-105
        transition-all
        duration-300
      "
    >
      <div className="text-4xl">
        {icon}
      </div>

      <h3 className="text-white font-bold mt-3">
        {title}
      </h3>
    </button>
  );
}