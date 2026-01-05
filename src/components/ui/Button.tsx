import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white hover:bg-gray-900 shadow-sm border border-transparent",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        outline:
          "border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-900",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200/80",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-gray-900 underline-offset-4 hover:underline",
        technical: 
          "bg-white border border-gray-200 text-gray-900 hover:border-safety-orange hover:text-safety-orange transition-colors duration-300",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ElementType<{ className?: string }>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, icon: Icon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && Icon && <Icon className="mr-2 h-4 w-4" />}
        {children}
        
        {/* Technical Corner Accents for 'technical' variant */}
        {variant === 'technical' && (
          <>
            <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-current opacity-50" />
            <span className="absolute top-0 right-0 w-1 h-1 border-t border-r border-current opacity-50" />
            <span className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-current opacity-50" />
            <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-current opacity-50" />
          </>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
