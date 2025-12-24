import { TechLabel } from "./TechLabel";
import { TechnicalBorder } from "./TechnicalBorder";
import { ArrowUpRight } from "lucide-react";
import { Product3DViewer } from "./Product3DViewer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

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
  const [shouldLoadModel, setShouldLoadModel] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!modelType || !cardRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadModel(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px", threshold: 0.01 }
    );
    
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [modelType]);
  
  const handleClick = () => {
    if (slug) {
      navigate(`/product/${slug}`);
    }
  };

  return (
    <TechnicalBorder 
      onClick={handleClick}
      className="group p-10 border-r border-b border-gray-200 hover:bg-white hover:shadow-2xl hover:z-10 hover:-translate-y-1 transition-all duration-500 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 via-gray-50/0 to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 z-10">
        <ArrowUpRight className="w-5 h-5 text-gray-900" />
      </div>

      <div className="flex justify-between items-start mb-12 relative z-10">
        <TechLabel>{category}</TechLabel>
        <span className="font-mono text-[10px] text-gray-500 tracking-wide group-hover:text-gray-900 transition-colors duration-300">{partNumber}</span>
      </div>
      
      <div 
        ref={cardRef}
        className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100/50 mb-10 flex items-center justify-center overflow-hidden relative rounded-sm border border-gray-200 group-hover:border-gray-300 transition-all duration-500 group-hover:shadow-inner"
      >
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }} 
        />
        
        {modelType ? (
          <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
            {shouldLoadModel ? (
              <Product3DViewer type={modelType} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-mono">
                Loading...
              </div>
            )}
          </div>
        ) : image ? (
          <img src={image} alt={title} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="text-gray-400 text-sm font-mono">No Preview</div>
        )}
      </div>

      <h3 className="text-lg font-semibold uppercase tracking-tight mb-3 text-gray-900 group-hover:text-black transition-colors duration-300 relative z-10">{title}</h3>
      <div className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
    </TechnicalBorder>
  );
};
