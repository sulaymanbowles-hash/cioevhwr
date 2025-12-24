import { TechLabel } from "./TechLabel";

const manufacturers = [
  "Howmet Aerospace",
  "Shur-Lok",
  "Freudenberg",
  "Parker Seal",
  "SPS Technologies",
  "Precision Form Rivets",
  "MacLean-ESNA",
];

export const Marquee = () => {
  return (
    <section className="py-20 border-y border-gray-200 bg-gradient-to-r from-white via-gray-50 to-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent)] pointer-events-none" />
      <div className="max-w-[1600px] mx-auto mb-8 px-6 md:px-8">
        <TechLabel className="text-center block">Authorized Distributor</TechLabel>
      </div>
      <div className="flex w-[200%] animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
        <div className="flex space-x-20 items-center px-12 w-1/2 justify-around">
          {manufacturers.map((m, i) => (
            <div key={i} className="px-8 py-4 bg-white border border-gray-100 rounded-lg hover:border-gray-300 hover:shadow-md transition-all">
              <TechLabel className="!text-gray-700 whitespace-nowrap hover:!text-black cursor-default">{m}</TechLabel>
            </div>
          ))}
        </div>
        <div className="flex space-x-20 items-center px-12 w-1/2 justify-around">
          {manufacturers.map((m, i) => (
            <div key={`dup-${i}`} className="px-8 py-4 bg-white border border-gray-100 rounded-lg hover:border-gray-300 hover:shadow-md transition-all">
              <TechLabel className="!text-gray-700 whitespace-nowrap hover:!text-black cursor-default">{m}</TechLabel>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </section>
  );
};
