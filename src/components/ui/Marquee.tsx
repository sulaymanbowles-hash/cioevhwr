import { TechLabel } from "./TechLabel";

const manufacturers = [
  "Arconic",
  "PCC Fasteners",
  "Lisi Aerospace",
  "Huck",
  "Cherry Aerospace",
  "SPS Technologies",
  "Shur-Lok",
];

export const Marquee = () => {
  return (
    <section className="py-16 border-y border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="flex w-[200%] animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
        <div className="flex space-x-24 items-center px-16 w-1/2 justify-around">
          {manufacturers.map((m, i) => (
            <TechLabel key={i} className="!text-gray-500 whitespace-nowrap hover:!text-gray-900 transition-colors cursor-default">{m}</TechLabel>
          ))}
        </div>
        <div className="flex space-x-24 items-center px-16 w-1/2 justify-around">
          {manufacturers.map((m, i) => (
            <TechLabel key={`dup-${i}`} className="!text-gray-500 whitespace-nowrap hover:!text-gray-900 transition-colors cursor-default">{m}</TechLabel>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
