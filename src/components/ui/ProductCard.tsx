import { TechLabel } from "./TechLabel";
import { TechnicalBorder } from "./TechnicalBorder";
import { Box, ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  title: string;
  category: string;
  partNumber: string;
  image?: string;
}

export const ProductCard = ({ title, category, partNumber, image }: ProductCardProps) => {
  return (
    <TechnicalBorder className="group p-8 border-r border-b border-black/10 hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden">
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="w-4 h-4 text-gray-400" />
      </div>

      <div className="flex justify-between items-start mb-12">
        <TechLabel>{category}</TechLabel>
        <span className="font-mono text-[10px] text-gray-400">{partNumber}</span>
      </div>
      
      <div className="aspect-square bg-gray-50 mb-8 flex items-center justify-center overflow-hidden relative">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }} 
        />
        
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-24 h-24 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-gray-400 transition-colors">
            <Box className="w-8 h-8 text-gray-300 group-hover:text-gray-500 transition-colors" strokeWidth={1} />
          </div>
        )}
      </div>

      <h3 className="text-lg font-medium uppercase tracking-tight mb-2">{title}</h3>
      <div className="w-full h-px bg-black/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
    </TechnicalBorder>
  );
};
