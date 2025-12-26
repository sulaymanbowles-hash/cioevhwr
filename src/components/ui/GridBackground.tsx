import { cn } from "../../utils/cn";

type GridPattern = "dots" | "lines" | "radial" | "diagonal";

interface GridBackgroundProps {
  pattern?: GridPattern;
  opacity?: number;
  className?: string;
}

export const GridBackground = ({
  pattern = "lines",
  opacity = 0.02,
  className,
}: GridBackgroundProps) => {
  const patterns = {
    lines: {
      backgroundImage:
        "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    },
    dots: {
      backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
      backgroundSize: "12px 12px",
    },
    radial: {
      backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    },
    diagonal: {
      backgroundImage:
        "repeating-linear-gradient(45deg, #000, #000 1px, transparent 1px, transparent 60px)",
      backgroundSize: "auto",
    },
  };

  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        ...patterns[pattern],
        opacity,
      }}
      aria-hidden="true"
    />
  );
};
