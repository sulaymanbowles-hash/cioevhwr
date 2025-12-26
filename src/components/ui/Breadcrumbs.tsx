import { ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-gray-600 hover:text-black transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </button>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.path && index < items.length - 1 ? (
            <button
              onClick={() => navigate(item.path!)}
              className="text-gray-600 hover:text-black transition-colors font-medium"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-black font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};
