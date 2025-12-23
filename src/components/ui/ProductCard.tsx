import { TechLabel } from "./TechLabel";
import { TechnicalBorder } from "./TechnicalBorder";
import { ArrowUpRight } from "lucide-react";
import { Product3DViewer } from "./Product3DViewer";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  title: string;
  category: string;
  partNumber: string;
  image?: string;
  modelType?: "bolt" | "nut" | "fitting" | "pin";
  slug?: string;
}

export const ProductCard = ({ title, category, partNumber, image, modelType, slug }: ProductCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (slug) {
      navigate(`/product/${slug}`);
    }
  };

  return (
    <TechnicalBorder 
      onClick={handleClick}
      className="group p-10 border-r border-b border-gray-200 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="w-5 h-5 text-gray-500" />
      </div>

      <div className="flex justify-between items-start mb-12">
        <TechLabel>{category}</TechLabel>
        <span className="font-mono text-[10px] text-gray-500 tracking-wide">{partNumber}</span>
      </div>
      
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 mb-10 flex items-center justify-center overflow-hidden relative rounded-lg border border-gray-200/60 shadow-inner">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-[0.04]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }} 
        />
        
        {modelType ? (
          <div className="w-full h-full pointer-events-none">
            <Product3DViewer type={modelType} />
          </div>
        ) : image ? (
          <img src={image} alt={title} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="text-gray-400 text-sm font-mono">No Preview</div>
        )}
      </div>

      <h3 className="text-lg font-semibold uppercase tracking-tight mb-3 text-gray-900 group-hover:text-black transition-colors">{title}</h3>
      <div className="w-full h-px bg-gradient-to-r from-gray-300 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
    </TechnicalBorder>
  );
};
