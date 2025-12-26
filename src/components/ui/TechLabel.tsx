import { cn } from "../../utils/cn";

interface TechLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const TechLabel = ({ children, className }: TechLabelProps) => {
  return (
    <span
      className={cn(
        "text-[0.65rem] font-bold uppercase tracking-[0.25em] text-slate-600",
        className
      )}
    >
      {children}
    </span>
  );
};
