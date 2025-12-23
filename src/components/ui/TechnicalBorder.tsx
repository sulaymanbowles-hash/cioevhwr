import { cn } from "../../utils/cn";

interface TechnicalBorderProps {
  className?: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const TechnicalBorder = ({
  className,
  top,
  bottom,
  left,
  right,
  children,
  onClick,
}: TechnicalBorderProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative",
        top && "border-t border-black/10",
        bottom && "border-b border-black/10",
        left && "border-l border-black/10",
        right && "border-r border-black/10",
        className
      )}
    >
      {children}
    </div>
  );
};
