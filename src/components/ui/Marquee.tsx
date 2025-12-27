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
    <section className="py-16 border-y border-gray-200 bg-gray-50 overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto mb-10 px-6 md:px-8 text-center">
        <TechLabel className="tracking-widest uppercase text-sm font-semibold">
          Authorized Distributor
        </TechLabel>
      </div>
      
      <div 
        className="relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <div className="flex w-max animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
          <div className="flex gap-8 px-4">
            {manufacturers.map((m, i) => (
              <div key={i} className="px-8 py-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-400 hover:shadow-md transition-all duration-300 min-w-[240px] flex justify-center items-center group cursor-default">
                <span className="font-sans font-semibold text-gray-700 group-hover:text-blue-600 transition-colors text-lg whitespace-nowrap">{m}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-8 px-4" aria-hidden="true">
            {manufacturers.map((m, i) => (
              <div key={`dup-${i}`} className="px-8 py-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-400 hover:shadow-md transition-all duration-300 min-w-[240px] flex justify-center items-center group cursor-default">
                <span className="font-sans font-semibold text-gray-700 group-hover:text-blue-600 transition-colors text-lg whitespace-nowrap">{m}</span>
              </div>
            ))}
          </div>
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
