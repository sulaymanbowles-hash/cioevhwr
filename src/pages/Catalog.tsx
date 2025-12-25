import { motion, AnimatePresence } from "framer-motion";
import { TechLabel } from "../components/ui/TechLabel";
import { TechnicalBorder } from "../components/ui/TechnicalBorder";
import { Search, Filter, Download, ShoppingCart, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuoteStore } from "../stores/quoteStore";
import { ToastNotification } from "../components/ui/ToastNotification";
import type { ToastType } from "../components/ui/ToastNotification";
import { Catalog3DViewer, preloadCatalogModels } from "../components/ui/Catalog3DViewer";

interface Product {
  title: string;
  category: string;
  partNumber: string;
  modelFile: string; // Unique GLTF model file for this specific part
  slug: string;
  material: string;
  threadType?: string;
  specification: string;
  description: string;
}

const categories = ["All Categories", "Fittings", "Screws", "Bolts", "Pins", "Nuts", "O-Rings & Retaining Rings", "Rivets", "Washers", "Specialty Products"];
const materials = ["All Materials", "Titanium", "Aluminum", "Stainless Steel", "Brass"];
const threadTypes = ["All Thread Types", "UNF", "UNC", "Metric", "NPT", "N/A"];

const allProducts: Product[] = [
  // Non-fitting products (bolts, nuts, screws, pins)
  { 
    title: "Titanium Hex Bolt", 
    category: "Bolts", 
    partNumber: "NAS6204-12",
    modelFile: "nas6204-12.glb", 
    slug: "titanium-hex-bolt",
    material: "Titanium",
    threadType: "UNF",
    specification: "NAS6204 - Grade 5 Ti-6Al-4V",
    description: "High-strength aerospace fastener with exceptional corrosion resistance"
  },
  { 
    title: "Self-Locking Nut", 
    category: "Nuts", 
    partNumber: "MS21042-4",
    modelFile: "ms21042-4.glb", 
    slug: "self-locking-nut",
    material: "Aluminum",
    threadType: "UNF",
    specification: "MS21042 - 2024-T4 Aluminum",
    description: "Self-locking design prevents loosening under vibration"
  },
  { 
    title: "Precision Pin", 
    category: "Pins", 
    partNumber: "MS16555-2",
    modelFile: "ms16555-2.glb", 
    slug: "precision-pin",
    material: "Stainless Steel",
    threadType: "N/A",
    specification: "MS16555 - 304 Stainless",
    description: "Hardened precision alignment pin with tight tolerances"
  },
  { 
    title: "Hex Head Cap Screw", 
    category: "Screws", 
    partNumber: "NAS1351-4",
    modelFile: "nas1351-4.glb", 
    slug: "hex-head-cap-screw",
    material: "Titanium",
    threadType: "UNC",
    specification: "NAS1351 - Grade 5 Titanium",
    description: "Heavy-duty hex head design for structural applications"
  },
  { 
    title: "Nylon Insert Lock Nut", 
    category: "Nuts", 
    partNumber: "MS21044-4",
    modelFile: "ms21044-4.glb", 
    slug: "nylon-insert-lock-nut",
    material: "Stainless Steel",
    threadType: "UNC",
    specification: "MS21044 - 303 Stainless",
    description: "Nylon insert provides superior locking performance"
  },
  { 
    title: "Clevis Pin", 
    category: "Pins", 
    partNumber: "AN392-12",
    modelFile: "an392-12.glb", 
    slug: "clevis-pin",
    material: "Stainless Steel",
    threadType: "N/A",
    specification: "AN392 - 17-4PH Stainless",
    description: "Clevis design with cotter pin hole for secure retention"
  },
  {
    title: "Aerospace Hex Bolt",
    category: "Bolts",
    partNumber: "NAS6204-16",
    modelFile: "nas6204-16.glb",
    slug: "aerospace-hex-bolt",
    material: "Titanium",
    threadType: "UNF",
    specification: "NAS6204 - Ti-6Al-4V Grade 5",
    description: "Extended length bolt for deep structural connections"
  },
  {
    title: "Castle Nut",
    category: "Nuts",
    partNumber: "AN310-4",
    modelFile: "an310-4.glb",
    slug: "castle-nut",
    material: "Stainless Steel",
    threadType: "UNF",
    specification: "AN310 - CRES 303",
    description: "Castle design for cotter pin safety wire retention"
  },
  {
    title: "Dowel Pin",
    category: "Pins",
    partNumber: "MS16555-4",
    modelFile: "ms16555-4.glb",
    slug: "dowel-pin",
    material: "Stainless Steel",
    threadType: "N/A",
    specification: "MS16555 - Hardened",
    description: "Precision ground dowel for exact alignment"
  },
  {
    title: "Socket Head Cap Screw",
    category: "Screws",
    partNumber: "NAS1352-5",
    modelFile: "nas1352-5.glb",
    slug: "socket-head-cap-screw",
    material: "Titanium",
    threadType: "UNC",
    specification: "NAS1352 - Grade 5",
    description: "Low-profile socket head for recessed applications"
  },
  {
    title: "All-Metal Lock Nut",
    category: "Nuts",
    partNumber: "MS21042-6",
    modelFile: "ms21042-6.glb",
    slug: "all-metal-lock-nut",
    material: "Aluminum",
    threadType: "UNF",
    specification: "MS21042 - Self-Locking",
    description: "All-metal construction for high-temperature applications"
  },
  {
    title: "Taper Pin",
    category: "Pins",
    partNumber: "AN385-3",
    modelFile: "an385-3.glb",
    slug: "taper-pin",
    material: "Stainless Steel",
    threadType: "N/A",
    specification: "AN385 - CRES",
    description: "Tapered design for self-tightening alignment"
  },
  {
    title: "Straight Union AN774",
    category: "Fittings",
    partNumber: "AN774",
    modelFile: "an774.glb",
    slug: "an774",
    material: "Brass",
    threadType: "NPT",
    specification: "AN774 - Aerospace Fitting",
    description: "Union coupling for connecting tubes"
  },
  {
    title: "Straight Union AN775",
    category: "Fittings",
    partNumber: "AN775",
    modelFile: "an775.glb",
    slug: "an775",
    material: "Brass",
    threadType: "NPT",
    specification: "AN775 - Aerospace Fitting",
    description: "Union coupling for connecting tubes"
  },
  {
    title: "Adapter AN776",
    category: "Fittings",
    partNumber: "AN776",
    modelFile: "an776.glb",
    slug: "an776",
    material: "Brass",
    threadType: "NPT",
    specification: "AN776 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN777",
    category: "Fittings",
    partNumber: "AN777",
    modelFile: "an777.glb",
    slug: "an777",
    material: "Brass",
    threadType: "NPT",
    specification: "AN777 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN778",
    category: "Fittings",
    partNumber: "AN778",
    modelFile: "an778.glb",
    slug: "an778",
    material: "Brass",
    threadType: "NPT",
    specification: "AN778 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN779",
    category: "Fittings",
    partNumber: "AN779",
    modelFile: "an779.glb",
    slug: "an779",
    material: "Brass",
    threadType: "NPT",
    specification: "AN779 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN780",
    category: "Fittings",
    partNumber: "AN780",
    modelFile: "an780.glb",
    slug: "an780",
    material: "Brass",
    threadType: "NPT",
    specification: "AN780 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN783",
    category: "Fittings",
    partNumber: "AN783",
    modelFile: "an783.glb",
    slug: "an783",
    material: "Brass",
    threadType: "NPT",
    specification: "AN783 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN784",
    category: "Fittings",
    partNumber: "AN784",
    modelFile: "an784.glb",
    slug: "an784",
    material: "Brass",
    threadType: "NPT",
    specification: "AN784 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN785",
    category: "Fittings",
    partNumber: "AN785",
    modelFile: "an785.glb",
    slug: "an785",
    material: "Brass",
    threadType: "NPT",
    specification: "AN785 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN786",
    category: "Fittings",
    partNumber: "AN786",
    modelFile: "an786.glb",
    slug: "an786",
    material: "Brass",
    threadType: "NPT",
    specification: "AN786 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN790",
    category: "Fittings",
    partNumber: "AN790",
    modelFile: "an790.glb",
    slug: "an790",
    material: "Brass",
    threadType: "NPT",
    specification: "AN790 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN791",
    category: "Fittings",
    partNumber: "AN791",
    modelFile: "an791.glb",
    slug: "an791",
    material: "Brass",
    threadType: "NPT",
    specification: "AN791 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN792",
    category: "Fittings",
    partNumber: "AN792",
    modelFile: "an792.glb",
    slug: "an792",
    material: "Brass",
    threadType: "NPT",
    specification: "AN792 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN795",
    category: "Fittings",
    partNumber: "AN795",
    modelFile: "an795.glb",
    slug: "an795",
    material: "Brass",
    threadType: "NPT",
    specification: "AN795 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN800",
    category: "Fittings",
    partNumber: "AN800",
    modelFile: "an800.glb",
    slug: "an800",
    material: "Brass",
    threadType: "NPT",
    specification: "AN800 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN801",
    category: "Fittings",
    partNumber: "AN801",
    modelFile: "an801.glb",
    slug: "an801",
    material: "Brass",
    threadType: "NPT",
    specification: "AN801 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN802",
    category: "Fittings",
    partNumber: "AN802",
    modelFile: "an802.glb",
    slug: "an802",
    material: "Brass",
    threadType: "NPT",
    specification: "AN802 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN803",
    category: "Fittings",
    partNumber: "AN803",
    modelFile: "an803.glb",
    slug: "an803",
    material: "Brass",
    threadType: "NPT",
    specification: "AN803 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN804",
    category: "Fittings",
    partNumber: "AN804",
    modelFile: "an804.glb",
    slug: "an804",
    material: "Brass",
    threadType: "NPT",
    specification: "AN804 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Cap/Plug AN806",
    category: "Fittings",
    partNumber: "AN806",
    modelFile: "an806.glb",
    slug: "an806",
    material: "Brass",
    threadType: "NPT",
    specification: "AN806 - Aerospace Fitting",
    description: "End cap or plug fitting"
  },
  {
    title: "Cap/Plug AN807",
    category: "Fittings",
    partNumber: "AN807",
    modelFile: "an807.glb",
    slug: "an807",
    material: "Brass",
    threadType: "NPT",
    specification: "AN807 - Aerospace Fitting",
    description: "End cap or plug fitting"
  },
  {
    title: "Straight Union AN814",
    category: "Fittings",
    partNumber: "AN814",
    modelFile: "an814.glb",
    slug: "an814",
    material: "Brass",
    threadType: "NPT",
    specification: "AN814 - Aerospace Fitting",
    description: "Union coupling for connecting tubes"
  },
  {
    title: "Straight Union AN815",
    category: "Fittings",
    partNumber: "AN815",
    modelFile: "an815.glb",
    slug: "an815",
    material: "Brass",
    threadType: "NPT",
    specification: "AN815 - Aerospace Fitting",
    description: "Union coupling for connecting tubes"
  },
  {
    title: "Straight Union AN816",
    category: "Fittings",
    partNumber: "AN816",
    modelFile: "an816.glb",
    slug: "an816",
    material: "Brass",
    threadType: "NPT",
    specification: "AN816 - Aerospace Fitting",
    description: "Union coupling for connecting tubes"
  },
  {
    title: "Adapter AN818",
    category: "Fittings",
    partNumber: "AN818",
    modelFile: "an818.glb",
    slug: "an818",
    material: "Brass",
    threadType: "NPT",
    specification: "AN818 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Reducer AN821",
    category: "Fittings",
    partNumber: "AN821",
    modelFile: "an821.glb",
    slug: "an821",
    material: "Brass",
    threadType: "NPT",
    specification: "AN821 - Aerospace Fitting",
    description: "Size adapter for different tube diameters"
  },
  {
    title: "Adapter AN824",
    category: "Fittings",
    partNumber: "AN824",
    modelFile: "an824.glb",
    slug: "an824",
    material: "Brass",
    threadType: "NPT",
    specification: "AN824 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN825",
    category: "Fittings",
    partNumber: "AN825",
    modelFile: "an825.glb",
    slug: "an825",
    material: "Brass",
    threadType: "NPT",
    specification: "AN825 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "90° Elbow AN826",
    category: "Fittings",
    partNumber: "AN826",
    modelFile: "an826.glb",
    slug: "an826",
    material: "Brass",
    threadType: "NPT",
    specification: "AN826 - Aerospace Fitting",
    description: "90-degree elbow for routing lines"
  },
  {
    title: "Adapter AN827",
    category: "Fittings",
    partNumber: "AN827",
    modelFile: "an827.glb",
    slug: "an827",
    material: "Brass",
    threadType: "NPT",
    specification: "AN827 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN832",
    category: "Fittings",
    partNumber: "AN832",
    modelFile: "an832.glb",
    slug: "an832",
    material: "Brass",
    threadType: "NPT",
    specification: "AN832 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Bulkhead AN833",
    category: "Fittings",
    partNumber: "AN833",
    modelFile: "an833.glb",
    slug: "an833",
    material: "Brass",
    threadType: "NPT",
    specification: "AN833 - Aerospace Fitting",
    description: "Panel mount fitting"
  },
  {
    title: "Bulkhead AN834",
    category: "Fittings",
    partNumber: "AN834",
    modelFile: "an834.glb",
    slug: "an834",
    material: "Brass",
    threadType: "NPT",
    specification: "AN834 - Aerospace Fitting",
    description: "Panel mount fitting"
  },
  {
    title: "Adapter AN837",
    category: "Fittings",
    partNumber: "AN837",
    modelFile: "an837.glb",
    slug: "an837",
    material: "Brass",
    threadType: "NPT",
    specification: "AN837 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN838",
    category: "Fittings",
    partNumber: "AN838",
    modelFile: "an838.glb",
    slug: "an838",
    material: "Brass",
    threadType: "NPT",
    specification: "AN838 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN839",
    category: "Fittings",
    partNumber: "AN839",
    modelFile: "an839.glb",
    slug: "an839",
    material: "Brass",
    threadType: "NPT",
    specification: "AN839 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN840",
    category: "Fittings",
    partNumber: "AN840",
    modelFile: "an840.glb",
    slug: "an840",
    material: "Brass",
    threadType: "NPT",
    specification: "AN840 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN841",
    category: "Fittings",
    partNumber: "AN841",
    modelFile: "an841.glb",
    slug: "an841",
    material: "Brass",
    threadType: "NPT",
    specification: "AN841 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN842",
    category: "Fittings",
    partNumber: "AN842",
    modelFile: "an842.glb",
    slug: "an842",
    material: "Brass",
    threadType: "NPT",
    specification: "AN842 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN844",
    category: "Fittings",
    partNumber: "AN844",
    modelFile: "an844.glb",
    slug: "an844",
    material: "Brass",
    threadType: "NPT",
    specification: "AN844 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN846",
    category: "Fittings",
    partNumber: "AN846",
    modelFile: "an846.glb",
    slug: "an846",
    material: "Brass",
    threadType: "NPT",
    specification: "AN846 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN848",
    category: "Fittings",
    partNumber: "AN848",
    modelFile: "an848.glb",
    slug: "an848",
    material: "Brass",
    threadType: "NPT",
    specification: "AN848 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN849",
    category: "Fittings",
    partNumber: "AN849",
    modelFile: "an849.glb",
    slug: "an849",
    material: "Brass",
    threadType: "NPT",
    specification: "AN849 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN871",
    category: "Fittings",
    partNumber: "AN871",
    modelFile: "an871.glb",
    slug: "an871",
    material: "Brass",
    threadType: "NPT",
    specification: "AN871 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN893",
    category: "Fittings",
    partNumber: "AN893",
    modelFile: "an893.glb",
    slug: "an893",
    material: "Brass",
    threadType: "NPT",
    specification: "AN893 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN894",
    category: "Fittings",
    partNumber: "AN894",
    modelFile: "an894.glb",
    slug: "an894",
    material: "Brass",
    threadType: "NPT",
    specification: "AN894 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN910",
    category: "Fittings",
    partNumber: "AN910",
    modelFile: "an910.glb",
    slug: "an910",
    material: "Brass",
    threadType: "NPT",
    specification: "AN910 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN911",
    category: "Fittings",
    partNumber: "AN911",
    modelFile: "an911.glb",
    slug: "an911",
    material: "Brass",
    threadType: "NPT",
    specification: "AN911 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN912",
    category: "Fittings",
    partNumber: "AN912",
    modelFile: "an912.glb",
    slug: "an912",
    material: "Brass",
    threadType: "NPT",
    specification: "AN912 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN914",
    category: "Fittings",
    partNumber: "AN914",
    modelFile: "an914.glb",
    slug: "an914",
    material: "Brass",
    threadType: "NPT",
    specification: "AN914 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN915",
    category: "Fittings",
    partNumber: "AN915",
    modelFile: "an915.glb",
    slug: "an915",
    material: "Brass",
    threadType: "NPT",
    specification: "AN915 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN916",
    category: "Fittings",
    partNumber: "AN916",
    modelFile: "an916.glb",
    slug: "an916",
    material: "Brass",
    threadType: "NPT",
    specification: "AN916 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN917",
    category: "Fittings",
    partNumber: "AN917",
    modelFile: "an917.glb",
    slug: "an917",
    material: "Brass",
    threadType: "NPT",
    specification: "AN917 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN918",
    category: "Fittings",
    partNumber: "AN918",
    modelFile: "an918.glb",
    slug: "an918",
    material: "Brass",
    threadType: "NPT",
    specification: "AN918 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN919",
    category: "Fittings",
    partNumber: "AN919",
    modelFile: "an919.glb",
    slug: "an919",
    material: "Brass",
    threadType: "NPT",
    specification: "AN919 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN924",
    category: "Fittings",
    partNumber: "AN924",
    modelFile: "an924.glb",
    slug: "an924",
    material: "Brass",
    threadType: "NPT",
    specification: "AN924 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN929",
    category: "Fittings",
    partNumber: "AN929",
    modelFile: "an929.glb",
    slug: "an929",
    material: "Brass",
    threadType: "NPT",
    specification: "AN929 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN933",
    category: "Fittings",
    partNumber: "AN933",
    modelFile: "an933.glb",
    slug: "an933",
    material: "Brass",
    threadType: "NPT",
    specification: "AN933 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN937",
    category: "Fittings",
    partNumber: "AN937",
    modelFile: "an937.glb",
    slug: "an937",
    material: "Brass",
    threadType: "NPT",
    specification: "AN937 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN938",
    category: "Fittings",
    partNumber: "AN938",
    modelFile: "an938.glb",
    slug: "an938",
    material: "Brass",
    threadType: "NPT",
    specification: "AN938 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN939",
    category: "Fittings",
    partNumber: "AN939",
    modelFile: "an939.glb",
    slug: "an939",
    material: "Brass",
    threadType: "NPT",
    specification: "AN939 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN941",
    category: "Fittings",
    partNumber: "AN941",
    modelFile: "an941.glb",
    slug: "an941",
    material: "Brass",
    threadType: "NPT",
    specification: "AN941 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AN6289",
    category: "Fittings",
    partNumber: "AN6289",
    modelFile: "an6289.glb",
    slug: "an6289",
    material: "Brass",
    threadType: "NPT",
    specification: "AN6289 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS20819",
    category: "Fittings",
    partNumber: "MS20819",
    modelFile: "ms20819.glb",
    slug: "ms20819",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS20819 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "90° Elbow MS20822",
    category: "Fittings",
    partNumber: "MS20822",
    modelFile: "ms20822.glb",
    slug: "ms20822",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS20822 - Aerospace Fitting",
    description: "90-degree elbow for routing lines"
  },
  {
    title: "90° Elbow MS20823",
    category: "Fittings",
    partNumber: "MS20823",
    modelFile: "ms20823.glb",
    slug: "ms20823",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS20823 - Aerospace Fitting",
    description: "90-degree elbow for routing lines"
  },
  {
    title: "Adapter MS20825",
    category: "Fittings",
    partNumber: "MS20825",
    modelFile: "ms20825.glb",
    slug: "ms20825",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS20825 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "90° Elbow MS20826",
    category: "Fittings",
    partNumber: "MS20826",
    modelFile: "ms20826.glb",
    slug: "ms20826",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS20826 - Aerospace Fitting",
    description: "90-degree elbow for routing lines"
  },
  {
    title: "45° Elbow MS20913",
    category: "Fittings",
    partNumber: "MS20913",
    modelFile: "ms20913.glb",
    slug: "ms20913",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS20913 - Aerospace Fitting",
    description: "45-degree angle fitting"
  },
  {
    title: "Adapter MS21900",
    category: "Fittings",
    partNumber: "MS21900",
    modelFile: "ms21900.glb",
    slug: "ms21900",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21900 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Tee Fitting MS21902",
    category: "Fittings",
    partNumber: "MS21902",
    modelFile: "ms21902.glb",
    slug: "ms21902",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21902 - Aerospace Fitting",
    description: "T-junction for branching lines"
  },
  {
    title: "90° Elbow MS21904",
    category: "Fittings",
    partNumber: "MS21904",
    modelFile: "ms21904.glb",
    slug: "ms21904",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21904 - Aerospace Fitting",
    description: "90-degree elbow for routing lines"
  },
  {
    title: "45° Elbow MS21905",
    category: "Fittings",
    partNumber: "MS21905",
    modelFile: "ms21905.glb",
    slug: "ms21905",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21905 - Aerospace Fitting",
    description: "45-degree angle fitting"
  },
  {
    title: "Tee Fitting MS21906",
    category: "Fittings",
    partNumber: "MS21906",
    modelFile: "ms21906.glb",
    slug: "ms21906",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21906 - Aerospace Fitting",
    description: "T-junction for branching lines"
  },
  {
    title: "Reducer MS21907",
    category: "Fittings",
    partNumber: "MS21907",
    modelFile: "ms21907.glb",
    slug: "ms21907",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21907 - Aerospace Fitting",
    description: "Size adapter for different tube diameters"
  },
  {
    title: "90° Elbow MS21908",
    category: "Fittings",
    partNumber: "MS21908",
    modelFile: "ms21908.glb",
    slug: "ms21908",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21908 - Aerospace Fitting",
    description: "90-degree elbow for routing lines"
  },
  {
    title: "Cap/Plug MS21909",
    category: "Fittings",
    partNumber: "MS21909",
    modelFile: "ms21909.glb",
    slug: "ms21909",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21909 - Aerospace Fitting",
    description: "End cap or plug fitting"
  },
  {
    title: "Cross Fitting MS21910",
    category: "Fittings",
    partNumber: "MS21910",
    modelFile: "ms21910.glb",
    slug: "ms21910",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21910 - Aerospace Fitting",
    description: "4-way cross junction"
  },
  {
    title: "Bulkhead MS21911",
    category: "Fittings",
    partNumber: "MS21911",
    modelFile: "ms21911.glb",
    slug: "ms21911",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21911 - Aerospace Fitting",
    description: "Panel mount fitting"
  },
  {
    title: "Adapter MS21912",
    category: "Fittings",
    partNumber: "MS21912",
    modelFile: "ms21912.glb",
    slug: "ms21912",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21912 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21913",
    category: "Fittings",
    partNumber: "MS21913",
    modelFile: "ms21913.glb",
    slug: "ms21913",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21913 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21914",
    category: "Fittings",
    partNumber: "MS21914",
    modelFile: "ms21914.glb",
    slug: "ms21914",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21914 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21915",
    category: "Fittings",
    partNumber: "MS21915",
    modelFile: "ms21915.glb",
    slug: "ms21915",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21915 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21916",
    category: "Fittings",
    partNumber: "MS21916",
    modelFile: "ms21916.glb",
    slug: "ms21916",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21916 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21921",
    category: "Fittings",
    partNumber: "MS21921",
    modelFile: "ms21921.glb",
    slug: "ms21921",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21921 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21922",
    category: "Fittings",
    partNumber: "MS21922",
    modelFile: "ms21922.glb",
    slug: "ms21922",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21922 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21924",
    category: "Fittings",
    partNumber: "MS21924",
    modelFile: "ms21924.glb",
    slug: "ms21924",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21924 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21925",
    category: "Fittings",
    partNumber: "MS21925",
    modelFile: "ms21925.glb",
    slug: "ms21925",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21925 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21926",
    category: "Fittings",
    partNumber: "MS21926",
    modelFile: "ms21926.glb",
    slug: "ms21926",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21926 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS27073",
    category: "Fittings",
    partNumber: "MS27073",
    modelFile: "ms27073.glb",
    slug: "ms27073",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS27073 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS27074",
    category: "Fittings",
    partNumber: "MS27074",
    modelFile: "ms27074.glb",
    slug: "ms27074",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS27074 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Reducer AS5160",
    category: "Fittings",
    partNumber: "AS5160",
    modelFile: "as5160.glb",
    slug: "as5160",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5160 - Aerospace Fitting",
    description: "Size adapter for different tube diameters"
  },
  {
    title: "Reducer AS5161",
    category: "Fittings",
    partNumber: "AS5161",
    modelFile: "as5161.glb",
    slug: "as5161",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5161 - Aerospace Fitting",
    description: "Size adapter for different tube diameters"
  },
  {
    title: "Adapter AS5162",
    category: "Fittings",
    partNumber: "AS5162",
    modelFile: "as5162.glb",
    slug: "as5162",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5162 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5163",
    category: "Fittings",
    partNumber: "AS5163",
    modelFile: "as5163.glb",
    slug: "as5163",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5163 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5164",
    category: "Fittings",
    partNumber: "AS5164",
    modelFile: "as5164.glb",
    slug: "as5164",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5164 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5165",
    category: "Fittings",
    partNumber: "AS5165",
    modelFile: "as5165.glb",
    slug: "as5165",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5165 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1031",
    category: "Fittings",
    partNumber: "AS1031",
    modelFile: "as1031.glb",
    slug: "as1031",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1031 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1032",
    category: "Fittings",
    partNumber: "AS1032",
    modelFile: "as1032.glb",
    slug: "as1032",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1032 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS28740",
    category: "Fittings",
    partNumber: "MS28740",
    modelFile: "ms28740.glb",
    slug: "ms28740",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS28740 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1033",
    category: "Fittings",
    partNumber: "AS1033",
    modelFile: "as1033.glb",
    slug: "as1033",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1033 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5168",
    category: "Fittings",
    partNumber: "AS5168",
    modelFile: "as5168.glb",
    slug: "as5168",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5168 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5180",
    category: "Fittings",
    partNumber: "AS5180",
    modelFile: "as5180.glb",
    slug: "as5180",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5180 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5169",
    category: "Fittings",
    partNumber: "AS5169",
    modelFile: "as5169.glb",
    slug: "as5169",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5169 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5174",
    category: "Fittings",
    partNumber: "AS5174",
    modelFile: "as5174.glb",
    slug: "as5174",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5174 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5194",
    category: "Fittings",
    partNumber: "AS5194",
    modelFile: "as5194.glb",
    slug: "as5194",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5194 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5175",
    category: "Fittings",
    partNumber: "AS5175",
    modelFile: "as5175.glb",
    slug: "as5175",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5175 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1034",
    category: "Fittings",
    partNumber: "AS1034",
    modelFile: "as1034.glb",
    slug: "as1034",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1034 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1035",
    category: "Fittings",
    partNumber: "AS1035",
    modelFile: "as1035.glb",
    slug: "as1035",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1035 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5197",
    category: "Fittings",
    partNumber: "AS5197",
    modelFile: "as5197.glb",
    slug: "as5197",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5197 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5198",
    category: "Fittings",
    partNumber: "AS5198",
    modelFile: "as5198.glb",
    slug: "as5198",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5198 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1036",
    category: "Fittings",
    partNumber: "AS1036",
    modelFile: "as1036.glb",
    slug: "as1036",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1036 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5406",
    category: "Fittings",
    partNumber: "AS5406",
    modelFile: "as5406.glb",
    slug: "as5406",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5406 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1038",
    category: "Fittings",
    partNumber: "AS1038",
    modelFile: "as1038.glb",
    slug: "as1038",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1038 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1039",
    category: "Fittings",
    partNumber: "AS1039",
    modelFile: "as1039.glb",
    slug: "as1039",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1039 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1040",
    category: "Fittings",
    partNumber: "AS1040",
    modelFile: "as1040.glb",
    slug: "as1040",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1040 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5181",
    category: "Fittings",
    partNumber: "AS5181",
    modelFile: "as5181.glb",
    slug: "as5181",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5181 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5182",
    category: "Fittings",
    partNumber: "AS5182",
    modelFile: "as5182.glb",
    slug: "as5182",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5182 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5183",
    category: "Fittings",
    partNumber: "AS5183",
    modelFile: "as5183.glb",
    slug: "as5183",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5183 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5184",
    category: "Fittings",
    partNumber: "AS5184",
    modelFile: "as5184.glb",
    slug: "as5184",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5184 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5185",
    category: "Fittings",
    partNumber: "AS5185",
    modelFile: "as5185.glb",
    slug: "as5185",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5185 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5186",
    category: "Fittings",
    partNumber: "AS5186",
    modelFile: "as5186.glb",
    slug: "as5186",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5186 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5187",
    category: "Fittings",
    partNumber: "AS5187",
    modelFile: "as5187.glb",
    slug: "as5187",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5187 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5188",
    category: "Fittings",
    partNumber: "AS5188",
    modelFile: "as5188.glb",
    slug: "as5188",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5188 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5189",
    category: "Fittings",
    partNumber: "AS5189",
    modelFile: "as5189.glb",
    slug: "as5189",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5189 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5227",
    category: "Fittings",
    partNumber: "AS5227",
    modelFile: "as5227.glb",
    slug: "as5227",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5227 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5172",
    category: "Fittings",
    partNumber: "AS5172",
    modelFile: "as5172.glb",
    slug: "as5172",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5172 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5173",
    category: "Fittings",
    partNumber: "AS5173",
    modelFile: "as5173.glb",
    slug: "as5173",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5173 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4859",
    category: "Fittings",
    partNumber: "AS4859",
    modelFile: "as4859.glb",
    slug: "as4859",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4859 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4860",
    category: "Fittings",
    partNumber: "AS4860",
    modelFile: "as4860.glb",
    slug: "as4860",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4860 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4861",
    category: "Fittings",
    partNumber: "AS4861",
    modelFile: "as4861.glb",
    slug: "as4861",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4861 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4854",
    category: "Fittings",
    partNumber: "AS4854",
    modelFile: "as4854.glb",
    slug: "as4854",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4854 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4855",
    category: "Fittings",
    partNumber: "AS4855",
    modelFile: "as4855.glb",
    slug: "as4855",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4855 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4856",
    category: "Fittings",
    partNumber: "AS4856",
    modelFile: "as4856.glb",
    slug: "as4856",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4856 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4857",
    category: "Fittings",
    partNumber: "AS4857",
    modelFile: "as4857.glb",
    slug: "as4857",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4857 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4858",
    category: "Fittings",
    partNumber: "AS4858",
    modelFile: "as4858.glb",
    slug: "as4858",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4858 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5178",
    category: "Fittings",
    partNumber: "AS5178",
    modelFile: "as5178.glb",
    slug: "as5178",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5178 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5177",
    category: "Fittings",
    partNumber: "AS5177",
    modelFile: "as5177.glb",
    slug: "as5177",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5177 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4862",
    category: "Fittings",
    partNumber: "AS4862",
    modelFile: "as4862.glb",
    slug: "as4862",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4862 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5193",
    category: "Fittings",
    partNumber: "AS5193",
    modelFile: "as5193.glb",
    slug: "as5193",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5193 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5192",
    category: "Fittings",
    partNumber: "AS5192",
    modelFile: "as5192.glb",
    slug: "as5192",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5192 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5190",
    category: "Fittings",
    partNumber: "AS5190",
    modelFile: "as5190.glb",
    slug: "as5190",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5190 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5191",
    category: "Fittings",
    partNumber: "AS5191",
    modelFile: "as5191.glb",
    slug: "as5191",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5191 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5179",
    category: "Fittings",
    partNumber: "AS5179",
    modelFile: "as5179.glb",
    slug: "as5179",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5179 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5176",
    category: "Fittings",
    partNumber: "AS5176",
    modelFile: "as5176.glb",
    slug: "as5176",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5176 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5195",
    category: "Fittings",
    partNumber: "AS5195",
    modelFile: "as5195.glb",
    slug: "as5195",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5195 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5196",
    category: "Fittings",
    partNumber: "AS5196",
    modelFile: "as5196.glb",
    slug: "as5196",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5196 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4863",
    category: "Fittings",
    partNumber: "AS4863",
    modelFile: "as4863.glb",
    slug: "as4863",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4863 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21900",
    category: "Fittings",
    partNumber: "AS21900",
    modelFile: "as21900.glb",
    slug: "as21900",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21900 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Tee Fitting AS21902",
    category: "Fittings",
    partNumber: "AS21902",
    modelFile: "as21902.glb",
    slug: "as21902",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21902 - Aerospace Fitting",
    description: "T-junction for branching lines"
  },
  {
    title: "90° Elbow AS21904",
    category: "Fittings",
    partNumber: "AS21904",
    modelFile: "as21904.glb",
    slug: "as21904",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21904 - Aerospace Fitting",
    description: "90-degree elbow for routing lines"
  },
  {
    title: "45° Elbow AS21905",
    category: "Fittings",
    partNumber: "AS21905",
    modelFile: "as21905.glb",
    slug: "as21905",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21905 - Aerospace Fitting",
    description: "45-degree angle fitting"
  },
  {
    title: "Tee Fitting AS21906",
    category: "Fittings",
    partNumber: "AS21906",
    modelFile: "as21906.glb",
    slug: "as21906",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21906 - Aerospace Fitting",
    description: "T-junction for branching lines"
  },
  {
    title: "Adapter AS21907",
    category: "Fittings",
    partNumber: "AS21907",
    modelFile: "as21907.glb",
    slug: "as21907",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21907 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21908",
    category: "Fittings",
    partNumber: "AS21908",
    modelFile: "as21908.glb",
    slug: "as21908",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21908 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Cap/Plug AS21909",
    category: "Fittings",
    partNumber: "AS21909",
    modelFile: "as21909.glb",
    slug: "as21909",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21909 - Aerospace Fitting",
    description: "End cap or plug fitting"
  },
  {
    title: "Cross Fitting AS21910",
    category: "Fittings",
    partNumber: "AS21910",
    modelFile: "as21910.glb",
    slug: "as21910",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21910 - Aerospace Fitting",
    description: "4-way cross junction"
  },
  {
    title: "Bulkhead AS21911",
    category: "Fittings",
    partNumber: "AS21911",
    modelFile: "as21911.glb",
    slug: "as21911",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21911 - Aerospace Fitting",
    description: "Panel mount fitting"
  },
  {
    title: "Adapter AS21912",
    category: "Fittings",
    partNumber: "AS21912",
    modelFile: "as21912.glb",
    slug: "as21912",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21912 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21913",
    category: "Fittings",
    partNumber: "AS21913",
    modelFile: "as21913.glb",
    slug: "as21913",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21913 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21914",
    category: "Fittings",
    partNumber: "AS21914",
    modelFile: "as21914.glb",
    slug: "as21914",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21914 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21915",
    category: "Fittings",
    partNumber: "AS21915",
    modelFile: "as21915.glb",
    slug: "as21915",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21915 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21916",
    category: "Fittings",
    partNumber: "AS21916",
    modelFile: "as21916.glb",
    slug: "as21916",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21916 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21921",
    category: "Fittings",
    partNumber: "AS21921",
    modelFile: "as21921.glb",
    slug: "as21921",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21921 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21922",
    category: "Fittings",
    partNumber: "AS21922",
    modelFile: "as21922.glb",
    slug: "as21922",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21922 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21924",
    category: "Fittings",
    partNumber: "AS21924",
    modelFile: "as21924.glb",
    slug: "as21924",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21924 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21925",
    category: "Fittings",
    partNumber: "AS21925",
    modelFile: "as21925.glb",
    slug: "as21925",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21925 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21926",
    category: "Fittings",
    partNumber: "AS21926",
    modelFile: "as21926.glb",
    slug: "as21926",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21926 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Cap/Plug AS4370",
    category: "Fittings",
    partNumber: "AS4370",
    modelFile: "as4370.glb",
    slug: "as4370",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4370 - Aerospace Fitting",
    description: "End cap or plug fitting"
  },
  {
    title: "Adapter AS1791",
    category: "Fittings",
    partNumber: "AS1791",
    modelFile: "as1791.glb",
    slug: "as1791",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1791 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Straight Union MS24388",
    category: "Fittings",
    partNumber: "MS24388",
    modelFile: "ms24388.glb",
    slug: "ms24388",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24388 - Aerospace Fitting",
    description: "Union coupling for connecting tubes"
  },
  {
    title: "Adapter MS24389",
    category: "Fittings",
    partNumber: "MS24389",
    modelFile: "ms24389.glb",
    slug: "ms24389",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24389 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24587",
    category: "Fittings",
    partNumber: "MS24587",
    modelFile: "ms24587.glb",
    slug: "ms24587",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24587 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24390",
    category: "Fittings",
    partNumber: "MS24390",
    modelFile: "ms24390.glb",
    slug: "ms24390",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24390 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24404",
    category: "Fittings",
    partNumber: "MS24404",
    modelFile: "ms24404.glb",
    slug: "ms24404",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24404 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24391",
    category: "Fittings",
    partNumber: "MS24391",
    modelFile: "ms24391.glb",
    slug: "ms24391",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24391 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24392",
    category: "Fittings",
    partNumber: "MS24392",
    modelFile: "ms24392.glb",
    slug: "ms24392",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24392 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24401",
    category: "Fittings",
    partNumber: "MS24401",
    modelFile: "ms24401.glb",
    slug: "ms24401",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24401 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24402",
    category: "Fittings",
    partNumber: "MS24402",
    modelFile: "ms24402.glb",
    slug: "ms24402",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24402 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24403",
    category: "Fittings",
    partNumber: "MS24403",
    modelFile: "ms24403.glb",
    slug: "ms24403",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24403 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24393",
    category: "Fittings",
    partNumber: "MS24393",
    modelFile: "ms24393.glb",
    slug: "ms24393",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24393 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24394",
    category: "Fittings",
    partNumber: "MS24394",
    modelFile: "ms24394.glb",
    slug: "ms24394",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24394 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24395",
    category: "Fittings",
    partNumber: "MS24395",
    modelFile: "ms24395.glb",
    slug: "ms24395",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24395 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24396",
    category: "Fittings",
    partNumber: "MS24396",
    modelFile: "ms24396.glb",
    slug: "ms24396",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24396 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24397",
    category: "Fittings",
    partNumber: "MS24397",
    modelFile: "ms24397.glb",
    slug: "ms24397",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24397 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24398",
    category: "Fittings",
    partNumber: "MS24398",
    modelFile: "ms24398.glb",
    slug: "ms24398",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24398 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24399",
    category: "Fittings",
    partNumber: "MS24399",
    modelFile: "ms24399.glb",
    slug: "ms24399",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24399 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24400",
    category: "Fittings",
    partNumber: "MS24400",
    modelFile: "ms24400.glb",
    slug: "ms24400",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24400 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5238",
    category: "Fittings",
    partNumber: "AS5238",
    modelFile: "as5238.glb",
    slug: "as5238",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5238 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5230",
    category: "Fittings",
    partNumber: "AS5230",
    modelFile: "as5230.glb",
    slug: "as5230",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5230 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5231",
    category: "Fittings",
    partNumber: "AS5231",
    modelFile: "as5231.glb",
    slug: "as5231",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5231 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5232",
    category: "Fittings",
    partNumber: "AS5232",
    modelFile: "as5232.glb",
    slug: "as5232",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5232 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4864",
    category: "Fittings",
    partNumber: "AS4864",
    modelFile: "as4864.glb",
    slug: "as4864",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4864 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Reducer AN817",
    category: "Fittings",
    partNumber: "AN817",
    modelFile: "an817.glb",
    slug: "an817",
    material: "Brass",
    threadType: "NPT",
    specification: "AN817 - Aerospace Fitting",
    description: "Size adapter for different tube diameters"
  },
  {
    title: "Tee Fitting AN932",
    category: "Fittings",
    partNumber: "AN932",
    modelFile: "an932.glb",
    slug: "an932",
    material: "Brass",
    threadType: "NPT",
    specification: "AN932 - Aerospace Fitting",
    description: "T-junction for branching lines"
  },
  {
    title: "Straight Union MS24387",
    category: "Fittings",
    partNumber: "MS24387",
    modelFile: "ms24387.glb",
    slug: "ms24387",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24387 - Aerospace Fitting",
    description: "Union coupling for connecting tubes"
  },
  {
    title: "Adapter AS21923",
    category: "Fittings",
    partNumber: "AS21923",
    modelFile: "as21923.glb",
    slug: "as21923",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21923 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21937",
    category: "Fittings",
    partNumber: "AS21937",
    modelFile: "as21937.glb",
    slug: "as21937",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21937 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21938",
    category: "Fittings",
    partNumber: "AS21938",
    modelFile: "as21938.glb",
    slug: "as21938",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21938 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21939",
    category: "Fittings",
    partNumber: "AS21939",
    modelFile: "as21939.glb",
    slug: "as21939",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21939 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21940",
    category: "Fittings",
    partNumber: "AS21940",
    modelFile: "as21940.glb",
    slug: "as21940",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21940 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21941",
    category: "Fittings",
    partNumber: "AS21941",
    modelFile: "as21941.glb",
    slug: "as21941",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21941 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21942",
    category: "Fittings",
    partNumber: "AS21942",
    modelFile: "as21942.glb",
    slug: "as21942",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21942 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21943",
    category: "Fittings",
    partNumber: "AS21943",
    modelFile: "as21943.glb",
    slug: "as21943",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21943 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21944",
    category: "Fittings",
    partNumber: "AS21944",
    modelFile: "as21944.glb",
    slug: "as21944",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21944 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS21945",
    category: "Fittings",
    partNumber: "AS21945",
    modelFile: "as21945.glb",
    slug: "as21945",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS21945 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS24405",
    category: "Fittings",
    partNumber: "AS24405",
    modelFile: "as24405.glb",
    slug: "as24405",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS24405 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS24651",
    category: "Fittings",
    partNumber: "AS24651",
    modelFile: "as24651.glb",
    slug: "as24651",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS24651 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS24652",
    category: "Fittings",
    partNumber: "AS24652",
    modelFile: "as24652.glb",
    slug: "as24652",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS24652 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS24654",
    category: "Fittings",
    partNumber: "AS24654",
    modelFile: "as24654.glb",
    slug: "as24654",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS24654 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1001",
    category: "Fittings",
    partNumber: "AS1001",
    modelFile: "as1001.glb",
    slug: "as1001",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1001 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1002",
    category: "Fittings",
    partNumber: "AS1002",
    modelFile: "as1002.glb",
    slug: "as1002",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1002 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1003",
    category: "Fittings",
    partNumber: "AS1003",
    modelFile: "as1003.glb",
    slug: "as1003",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1003 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1004",
    category: "Fittings",
    partNumber: "AS1004",
    modelFile: "as1004.glb",
    slug: "as1004",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1004 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1005",
    category: "Fittings",
    partNumber: "AS1005",
    modelFile: "as1005.glb",
    slug: "as1005",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1005 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1006",
    category: "Fittings",
    partNumber: "AS1006",
    modelFile: "as1006.glb",
    slug: "as1006",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1006 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1007",
    category: "Fittings",
    partNumber: "AS1007",
    modelFile: "as1007.glb",
    slug: "as1007",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1007 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1008",
    category: "Fittings",
    partNumber: "AS1008",
    modelFile: "as1008.glb",
    slug: "as1008",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1008 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1009",
    category: "Fittings",
    partNumber: "AS1009",
    modelFile: "as1009.glb",
    slug: "as1009",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1009 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1010",
    category: "Fittings",
    partNumber: "AS1010",
    modelFile: "as1010.glb",
    slug: "as1010",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1010 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1790",
    category: "Fittings",
    partNumber: "AS1790",
    modelFile: "as1790.glb",
    slug: "as1790",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1790 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1792",
    category: "Fittings",
    partNumber: "AS1792",
    modelFile: "as1792.glb",
    slug: "as1792",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1792 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS1860",
    category: "Fittings",
    partNumber: "AS1860",
    modelFile: "as1860.glb",
    slug: "as1860",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS1860 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4130",
    category: "Fittings",
    partNumber: "AS4130",
    modelFile: "as4130.glb",
    slug: "as4130",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4130 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4131",
    category: "Fittings",
    partNumber: "AS4131",
    modelFile: "as4131.glb",
    slug: "as4131",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4131 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4132",
    category: "Fittings",
    partNumber: "AS4132",
    modelFile: "as4132.glb",
    slug: "as4132",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4132 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4133",
    category: "Fittings",
    partNumber: "AS4133",
    modelFile: "as4133.glb",
    slug: "as4133",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4133 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4134",
    category: "Fittings",
    partNumber: "AS4134",
    modelFile: "as4134.glb",
    slug: "as4134",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4134 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4135",
    category: "Fittings",
    partNumber: "AS4135",
    modelFile: "as4135.glb",
    slug: "as4135",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4135 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4136",
    category: "Fittings",
    partNumber: "AS4136",
    modelFile: "as4136.glb",
    slug: "as4136",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4136 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4137",
    category: "Fittings",
    partNumber: "AS4137",
    modelFile: "as4137.glb",
    slug: "as4137",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4137 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4138",
    category: "Fittings",
    partNumber: "AS4138",
    modelFile: "as4138.glb",
    slug: "as4138",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4138 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4139",
    category: "Fittings",
    partNumber: "AS4139",
    modelFile: "as4139.glb",
    slug: "as4139",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4139 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4140",
    category: "Fittings",
    partNumber: "AS4140",
    modelFile: "as4140.glb",
    slug: "as4140",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4140 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS4141",
    category: "Fittings",
    partNumber: "AS4141",
    modelFile: "as4141.glb",
    slug: "as4141",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS4141 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5233",
    category: "Fittings",
    partNumber: "AS5233",
    modelFile: "as5233.glb",
    slug: "as5233",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5233 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5239",
    category: "Fittings",
    partNumber: "AS5239",
    modelFile: "as5239.glb",
    slug: "as5239",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5239 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5240",
    category: "Fittings",
    partNumber: "AS5240",
    modelFile: "as5240.glb",
    slug: "as5240",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5240 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5241",
    category: "Fittings",
    partNumber: "AS5241",
    modelFile: "as5241.glb",
    slug: "as5241",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5241 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter AS5242",
    category: "Fittings",
    partNumber: "AS5242",
    modelFile: "as5242.glb",
    slug: "as5242",
    material: "Stainless Steel",
    threadType: "NPT",
    specification: "AS5242 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21923",
    category: "Fittings",
    partNumber: "MS21923",
    modelFile: "ms21923.glb",
    slug: "ms21923",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21923 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21937",
    category: "Fittings",
    partNumber: "MS21937",
    modelFile: "ms21937.glb",
    slug: "ms21937",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21937 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21938",
    category: "Fittings",
    partNumber: "MS21938",
    modelFile: "ms21938.glb",
    slug: "ms21938",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21938 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21939",
    category: "Fittings",
    partNumber: "MS21939",
    modelFile: "ms21939.glb",
    slug: "ms21939",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21939 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21940",
    category: "Fittings",
    partNumber: "MS21940",
    modelFile: "ms21940.glb",
    slug: "ms21940",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21940 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21941",
    category: "Fittings",
    partNumber: "MS21941",
    modelFile: "ms21941.glb",
    slug: "ms21941",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21941 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21942",
    category: "Fittings",
    partNumber: "MS21942",
    modelFile: "ms21942.glb",
    slug: "ms21942",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21942 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21943",
    category: "Fittings",
    partNumber: "MS21943",
    modelFile: "ms21943.glb",
    slug: "ms21943",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21943 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21944",
    category: "Fittings",
    partNumber: "MS21944",
    modelFile: "ms21944.glb",
    slug: "ms21944",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21944 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS21945",
    category: "Fittings",
    partNumber: "MS21945",
    modelFile: "ms21945.glb",
    slug: "ms21945",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS21945 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24405",
    category: "Fittings",
    partNumber: "MS24405",
    modelFile: "ms24405.glb",
    slug: "ms24405",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24405 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24651",
    category: "Fittings",
    partNumber: "MS24651",
    modelFile: "ms24651.glb",
    slug: "ms24651",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24651 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24652",
    category: "Fittings",
    partNumber: "MS24652",
    modelFile: "ms24652.glb",
    slug: "ms24652",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24652 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  {
    title: "Adapter MS24654",
    category: "Fittings",
    partNumber: "MS24654",
    modelFile: "ms24654.glb",
    slug: "ms24654",
    material: "Aluminum",
    threadType: "NPT",
    specification: "MS24654 - Aerospace Fitting",
    description: "Hydraulic adapter fitting"
  },
  // SCREWS - Socket Cap Screws
  {
    title: "Socket Cap Screw",
    category: "Screws",
    partNumber: "MS24673-1",
    modelFile: "ms24673-1.glb",
    slug: "ms24673-1",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "MS24673 - Socket Head Cap",
    description: "Socket head cap screw for structural assembly and engine mounts"
  },
  {
    title: "Socket Cap Screw",
    category: "Screws",
    partNumber: "MS24673-2",
    modelFile: "ms24673-2.glb",
    slug: "ms24673-2",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "MS24673 - Socket Head Cap",
    description: "Socket head cap screw for structural assembly"
  },
  {
    title: "Socket Cap Screw, Drilled",
    category: "Screws",
    partNumber: "MS24674-1",
    modelFile: "ms24674-1.glb",
    slug: "ms24674-1",
    material: "Stainless Steel",
    threadType: "UNF",
    specification: "MS24674 - Socket Head Drilled",
    description: "Drilled socket head cap screw for safety wire applications"
  },
  {
    title: "Socket Cap Screw, Cad Plated",
    category: "Screws",
    partNumber: "MS24677-1",
    modelFile: "ms24677-1.glb",
    slug: "ms24677-1",
    material: "Steel",
    threadType: "UNF",
    specification: "MS24677 - Cadmium Plated",
    description: "Cadmium plated socket head screw for corrosion resistance"
  },
  {
    title: "Socket Head Self Locking",
    category: "Screws",
    partNumber: "MS21295-3",
    modelFile: "ms21295-3.glb",
    slug: "ms21295-3",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "MS21295 - Self Locking",
    description: "Self-locking socket head cap screw prevents vibration loosening"
  },
  // SCREWS - Fillister Head
  {
    title: "Fillister Head Screw",
    category: "Screws",
    partNumber: "AN115-4",
    modelFile: "an115-4.glb",
    slug: "an115-4",
    material: "Steel",
    threadType: "UNC",
    specification: "AN115 - Fillister Head",
    description: "Fillister head screw for panel attachment"
  },
  {
    title: "Fillister Head Screw",
    category: "Screws",
    partNumber: "AN115-6",
    modelFile: "an115-6.glb",
    slug: "an115-6",
    material: "Steel",
    threadType: "UNC",
    specification: "AN115 - Fillister Head",
    description: "Fillister head screw for structural assembly"
  },
  {
    title: "Fillister Head Screw, Drilled",
    category: "Screws",
    partNumber: "AN116-4",
    modelFile: "an116-4.glb",
    slug: "an116-4",
    material: "Steel",
    threadType: "UNC",
    specification: "AN116 - Fillister Drilled",
    description: "Drilled fillister head screw for safety wire"
  },
  {
    title: "Oval Fillister Head Screw",
    category: "Screws",
    partNumber: "AN117-4",
    modelFile: "an117-4.glb",
    slug: "an117-4",
    material: "Steel",
    threadType: "UNC",
    specification: "AN117 - Oval Fillister",
    description: "Oval profile fillister head screw"
  },
  // SCREWS - Machine Screws
  {
    title: "Machine Screw, Slotted Hex",
    category: "Screws",
    partNumber: "MS9122-1",
    modelFile: "ms9122-1.glb",
    slug: "ms9122-1",
    material: "Steel",
    threadType: "UNC",
    specification: "MS9122 - Slotted Hex",
    description: "Slotted hex head machine screw"
  },
  {
    title: "Machine Screw, Slotted Hex",
    category: "Screws",
    partNumber: "MS9316-1",
    modelFile: "ms9316-1.glb",
    slug: "ms9316-1",
    material: "Steel",
    threadType: "UNF",
    specification: "MS9316 - .190-32",
    description: "Slotted hex head machine screw, 190-32 thread"
  },
  {
    title: "Machine Screw, Slotted Hex",
    category: "Screws",
    partNumber: "MS9317-1",
    modelFile: "ms9317-1.glb",
    slug: "ms9317-1",
    material: "Steel",
    threadType: "UNF",
    specification: "MS9317 - .250-28",
    description: "Slotted hex head machine screw, 250-28 thread"
  },
  // SCREWS - 12 Point Head
  {
    title: "12 Point Head Screw",
    category: "Screws",
    partNumber: "MS9177-1",
    modelFile: "ms9177-1.glb",
    slug: "ms9177-1",
    material: "Alloy Steel",
    threadType: "UNC",
    specification: "MS9177 - 12 Point",
    description: "12-point head screw for high-torque applications"
  },
  {
    title: "12 Point Head Screw, Drilled",
    category: "Screws",
    partNumber: "MS9192-1",
    modelFile: "ms9192-1.glb",
    slug: "ms9192-1",
    material: "Alloy Steel",
    threadType: "UNC",
    specification: "MS9192 - 12 Point Drilled",
    description: "Drilled 12-point head screw for safety wire"
  },
  // SCREWS - Shoulder Screws
  {
    title: "Shoulder Screw, Slotted",
    category: "Screws",
    partNumber: "MS51575-1",
    modelFile: "ms51575-1.glb",
    slug: "ms51575-1",
    material: "Steel",
    threadType: "UNC",
    specification: "MS51575 - Shoulder, Slotted",
    description: "Shoulder screw with slotted head"
  },
  {
    title: "Shoulder Screw, Hex Socket",
    category: "Screws",
    partNumber: "MS51576-1",
    modelFile: "ms51576-1.glb",
    slug: "ms51576-1",
    material: "Steel",
    threadType: "UNC",
    specification: "MS51576 - Shoulder, Hex Socket",
    description: "Shoulder screw with hex socket head"
  },
  {
    title: "Shoulder Screw, Socket Head",
    category: "Screws",
    partNumber: "MS51975-1",
    modelFile: "ms51975-1.glb",
    slug: "ms51975-1",
    material: "Alloy Steel",
    threadType: "UNC",
    specification: "MS51975 - Shoulder, Socket",
    description: "Shoulder screw with socket head"
  },
  // SCREWS - Pan Head (Metric)
  {
    title: "Pan Head Screw, Close Tolerance",
    category: "Screws",
    partNumber: "NA0035-3",
    modelFile: "na0035-3.glb",
    slug: "na0035-3",
    material: "Steel",
    threadType: "Metric",
    specification: "NA0035 - Pan Head Metric",
    description: "Close tolerance pan head screw, metric threads"
  },
  {
    title: "Pan Head Screw, A286 CRES",
    category: "Screws",
    partNumber: "NA0068-4",
    modelFile: "na0068-4.glb",
    slug: "na0068-4",
    material: "A286 CRES",
    threadType: "Metric",
    specification: "NA0068 - A286 CRES",
    description: "A286 CRES pan head screw with offset cruciform"
  },
  {
    title: "Pan Head Screw, Self Locking",
    category: "Screws",
    partNumber: "NAS1171-4",
    modelFile: "nas1171-4.glb",
    slug: "nas1171-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1171 - Pan Head Self Locking",
    description: "Self-locking pan head screw with offset cruciform"
  },
  {
    title: "Pan Head Screw, Full Thread",
    category: "Screws",
    partNumber: "NAS1216-4",
    modelFile: "nas1216-4.glb",
    slug: "nas1216-4",
    material: "Steel",
    threadType: "UNC",
    specification: "NAS1216 - Pan Head Full Thread",
    description: "Pan head screw with full thread length"
  },
  // SCREWS - Flush Head (100 degree)
  {
    title: "100° Flush Head Screw",
    category: "Screws",
    partNumber: "NA0038-4",
    modelFile: "na0038-4.glb",
    slug: "na0038-4",
    material: "Steel",
    threadType: "Metric",
    specification: "NA0038 - 100° Flush Head",
    description: "Close tolerance 100-degree flush head screw, metric"
  },
  {
    title: "A286 CRES 100° Flush Head",
    category: "Screws",
    partNumber: "NA0070-4",
    modelFile: "na0070-4.glb",
    slug: "na0070-4",
    material: "A286 CRES",
    threadType: "Metric",
    specification: "NA0070 - A286 CRES 100°",
    description: "A286 CRES 100-degree flush head with offset cruciform"
  },
  {
    title: "100° Head Screw, Self Locking",
    category: "Screws",
    partNumber: "NAS1161-4",
    modelFile: "nas1161-4.glb",
    slug: "nas1161-4",
    material: "Alloy Steel",
    threadType: "UNC",
    specification: "NAS1161 - 100° Self Locking",
    description: "Self-locking 100-degree head screw"
  },
  {
    title: "100° Flush Head, Full Thread",
    category: "Screws",
    partNumber: "NAS1219-4",
    modelFile: "nas1219-4.glb",
    slug: "nas1219-4",
    material: "Steel",
    threadType: "UNC",
    specification: "NAS1219 - 100° Full Thread",
    description: "100-degree flush head with full thread and dovetail slot"
  },
  {
    title: "100° Flush Head, Close Tolerance",
    category: "Screws",
    partNumber: "NAS583-4",
    modelFile: "nas583-4.glb",
    slug: "nas583-4",
    material: "Steel",
    threadType: "UNC",
    specification: "NAS583 - 100° Close Tolerance",
    description: "Close tolerance 100-degree flush head screw"
  },
  {
    title: "Flat Fillister Head Screw",
    category: "Screws",
    partNumber: "NAS1121-4",
    modelFile: "nas1121-4.glb",
    slug: "nas1121-4",
    material: "Steel",
    threadType: "UNC",
    specification: "NAS1121 - Flat Fillister",
    description: "Flat fillister head with short thread and offset cruciform"
  },
  // SCREWS - Hex Head
  {
    title: "Dual Hex Head Screw",
    category: "Screws",
    partNumber: "NA0067-4",
    modelFile: "na0067-4.glb",
    slug: "na0067-4",
    material: "Steel",
    threadType: "Metric",
    specification: "NA0067 - Dual Hex",
    description: "Dual hex head with offset cruciform, metric"
  },
  {
    title: "Hex Head Screw, Offset Cruciform",
    category: "Screws",
    partNumber: "NA0113-4",
    modelFile: "na0113-4.glb",
    slug: "na0113-4",
    material: "Steel",
    threadType: "Metric",
    specification: "NA0113 - Hex Head Metric",
    description: "Hex head screw with offset cruciform, metric threads"
  },
  // SCREWS - Specialty
  {
    title: "Socket Head A286 CRES",
    category: "Screws",
    partNumber: "NA0069-4",
    modelFile: "na0069-4.glb",
    slug: "na0069-4",
    material: "A286 CRES",
    threadType: "Metric",
    specification: "NA0069 - A286 Socket Head",
    description: "A286 CRES socket head with full thread, metric"
  },
  {
    title: "Externally Relieved Body Screw",
    category: "Screws",
    partNumber: "MS25087-1",
    modelFile: "ms25087-1.glb",
    slug: "ms25087-1",
    material: "Alloy Steel",
    threadType: "UNC",
    specification: "MS25087 - Relieved Body",
    description: "Externally relieved body screw for weight reduction"
  },
  {
    title: "Captive Screw",
    category: "Screws",
    partNumber: "MS90402-1",
    modelFile: "ms90402-1.glb",
    slug: "ms90402-1",
    material: "Stainless Steel",
    threadType: "UNC",
    specification: "MS90402 - Captive",
    description: "Captive screw with retention feature"
  },
  {
    title: "Shoulder Screw, Brazier Head",
    category: "Screws",
    partNumber: "NAS1298-4",
    modelFile: "nas1298-4.glb",
    slug: "nas1298-4",
    material: "Steel",
    threadType: "UNC",
    specification: "NAS1298 - Brazier Head",
    description: "Shoulder screw with brazier head and cruciform recess"
  },
  // STUDS
  {
    title: "Straight Stud",
    category: "Screws",
    partNumber: "AN126-4",
    modelFile: "an126-4.glb",
    slug: "an126-4",
    material: "Steel",
    threadType: "UNC",
    specification: "AN126 - Straight Stud",
    description: "Straight threaded stud, drilled or undrilled"
  },
  {
    title: "Stepped Stud",
    category: "Screws",
    partNumber: "AN151-4",
    modelFile: "an151-4.glb",
    slug: "an151-4",
    material: "Steel",
    threadType: "UNC",
    specification: "AN151 - Stepped Stud",
    description: "Stepped stud with .250-20 x .190-32 threads"
  },
  {
    title: "Shouldered Hexagon Wrenching Stud",
    category: "Screws",
    partNumber: "MS9303-1",
    modelFile: "ms9303-1.glb",
    slug: "ms9303-1",
    material: "Alloy Steel",
    threadType: "UNC",
    specification: "MS9303 - Shouldered Hex",
    description: "Shouldered hexagon wrenching stud, drilled or undrilled"
  },
  {
    title: "Stepped Stud, Drilled",
    category: "Screws",
    partNumber: "MS9834-1",
    modelFile: "ms9834-1.glb",
    slug: "ms9834-1",
    material: "Steel",
    threadType: "UNC",
    specification: "MS9834 - Stepped Drilled",
    description: "Stepped stud, drilled, steel construction"
  },
  {
    title: "Stud, Coarse or Fine Thread",
    category: "Screws",
    partNumber: "NAS183-2",
    modelFile: "nas183-2.glb",
    slug: "nas183-2",
    material: "Alloy Steel",
    threadType: "UNC",
    specification: "NAS183 - Coarse/Fine",
    description: "Stud with coarse or fine thread, drilled or undrilled"
  },

  // Hex Head Bolts
  {
    title: "AN173-3 Hex Bolt",
    category: "Bolts",
    partNumber: "AN173-3",
    modelFile: "an173-3.glb",
    slug: "an173-3",
    material: "Carbon Steel",
    threadType: "UNC",
    specification: "AN173 - 3/16\" x 3/8\"",
    description: "Standard hex head bolt, cadmium plated"
  },
  {
    title: "AN173-5 Hex Bolt",
    category: "Bolts",
    partNumber: "AN173-5",
    modelFile: "an173-5.glb",
    slug: "an173-5",
    material: "Carbon Steel",
    threadType: "UNC",
    specification: "AN173 - 3/16\" x 5/8\"",
    description: "Standard hex head bolt, cadmium plated"
  },
  {
    title: "AN174-4 Hex Bolt",
    category: "Bolts",
    partNumber: "AN174-4",
    modelFile: "an174-4.glb",
    slug: "an174-4",
    material: "Carbon Steel",
    threadType: "UNC",
    specification: "AN174 - 1/4\" x 1/2\"",
    description: "Standard hex head bolt, cadmium plated"
  },
  {
    title: "AN175-6 Hex Bolt",
    category: "Bolts",
    partNumber: "AN175-6",
    modelFile: "an175-6.glb",
    slug: "an175-6",
    material: "Carbon Steel",
    threadType: "UNC",
    specification: "AN175 - 5/16\" x 3/4\"",
    description: "Standard hex head bolt, cadmium plated"
  },
  {
    title: "NAS1003-4 Hex Bolt",
    category: "Bolts",
    partNumber: "NAS1003-4",
    modelFile: "nas1003-4.glb",
    slug: "nas1003-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1003 - 1/4-28 UNF",
    description: "Hex head bolt, drilled or undrilled, high strength"
  },
  {
    title: "NAS6303-4 A286 Hex Bolt",
    category: "Bolts",
    partNumber: "NAS6303-4",
    modelFile: "nas6303-4.glb",
    slug: "nas6303-4",
    material: "A286 CRES",
    threadType: "UNF",
    specification: "NAS6303 - 1/4-28 UNF",
    description: "Hex head bolt, A286 steel, high temperature"
  },
  {
    title: "NAS6403-4 Titanium Hex Bolt",
    category: "Bolts",
    partNumber: "NAS6403-4",
    modelFile: "nas6403-4.glb",
    slug: "nas6403-4",
    material: "Titanium",
    threadType: "UNF",
    specification: "NAS6403 - 1/4-28 UNF",
    description: "Hex head bolt, titanium, lightweight"
  },
  {
    title: "MS20033-4 Hex Bolt",
    category: "Bolts",
    partNumber: "MS20033-4",
    modelFile: "ms20033-4.glb",
    slug: "ms20033-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "MS20033 - 1/4-28 UNF",
    description: "Hex head bolt, drilled head"
  },
  {
    title: "MS9631-4 Hex Bolt",
    category: "Bolts",
    partNumber: "MS9631-4",
    modelFile: "ms9631-4.glb",
    slug: "ms9631-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "MS9631 - 1/4-28 UNF",
    description: "Hex head bolt, high strength"
  },

  // 12-Point Head Bolts
  {
    title: "MS14181-4 Tension Bolt",
    category: "Bolts",
    partNumber: "MS14181-4",
    modelFile: "ms14181-4.glb",
    slug: "ms14181-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "MS14181 - 1/4-28 UNF",
    description: "12-point tension bolt, 220 ksi, high stress applications"
  },
  {
    title: "MS21098-4 Self-Locking 12-Point",
    category: "Bolts",
    partNumber: "MS21098-4",
    modelFile: "ms21098-4.glb",
    slug: "ms21098-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "MS21098 - 1/4-28 UNF",
    description: "12-point self-locking bolt, steel"
  },
  {
    title: "MS21099-4 Self-Locking 12-Point CRES",
    category: "Bolts",
    partNumber: "MS21099-4",
    modelFile: "ms21099-4.glb",
    slug: "ms21099-4",
    material: "Stainless Steel",
    threadType: "UNF",
    specification: "MS21099 - 1/4-28 UNF",
    description: "12-point self-locking bolt, corrosion resistant"
  },
  {
    title: "MS21250-4 12-Point Bolt",
    category: "Bolts",
    partNumber: "MS21250-4",
    modelFile: "ms21250-4.glb",
    slug: "ms21250-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "MS21250 - 1/4-28 UNF",
    description: "12-point head bolt, high torque"
  },
  {
    title: "MS9146-4 12-Point Bolt",
    category: "Bolts",
    partNumber: "MS9146-4",
    modelFile: "ms9146-4.glb",
    slug: "ms9146-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "MS9146 - 1/4-28 UNF",
    description: "12-point head bolt, steel"
  },
  {
    title: "MS9694-4 12-Point CRES Bolt",
    category: "Bolts",
    partNumber: "MS9694-4",
    modelFile: "ms9694-4.glb",
    slug: "ms9694-4",
    material: "Stainless Steel",
    threadType: "UNF",
    specification: "MS9694 - 1/4-28 UNF",
    description: "12-point head bolt, corrosion resistant"
  },
  {
    title: "MS9883-4 12-Point CRES Bolt",
    category: "Bolts",
    partNumber: "MS9883-4",
    modelFile: "ms9883-4.glb",
    slug: "ms9883-4",
    material: "Stainless Steel",
    threadType: "UNF",
    specification: "MS9883 - 1/4-28 UNF",
    description: "12-point bolt, CRES"
  },
  {
    title: "NAS1271-4 12-Point Bolt",
    category: "Bolts",
    partNumber: "NAS1271-4",
    modelFile: "nas1271-4.glb",
    slug: "nas1271-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1271 - 1/4-28 UNF",
    description: "12-point bolt, drilled or undrilled"
  },
  {
    title: "NAS624-4 12-Point High Strength",
    category: "Bolts",
    partNumber: "NAS624-4",
    modelFile: "nas624-4.glb",
    slug: "nas624-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS624 - 1/4-28 UNF",
    description: "12-point bolt, 180 ksi, drilled or undrilled"
  },

  // Flush Head Bolts (100° Countersunk)
  {
    title: "NAS1083-4 Flush Bolt Close Tolerance",
    category: "Bolts",
    partNumber: "NAS1083-4",
    modelFile: "nas1083-4.glb",
    slug: "nas1083-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1083 - 1/4-28 UNF",
    description: "100° flush head bolt, close tolerance"
  },
  {
    title: "NAS1220-4 Flush Bolt Dovetail Slot",
    category: "Bolts",
    partNumber: "NAS1220-4",
    modelFile: "nas1220-4.glb",
    slug: "nas1220-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1220 - 1/4-28 UNF",
    description: "100° flush head bolt, short thread, dovetail slot"
  },
  {
    title: "NAS1503-4 Flush Bolt Short Thread",
    category: "Bolts",
    partNumber: "NAS1503-4",
    modelFile: "nas1503-4.glb",
    slug: "nas1503-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1503 - 1/4-28 UNF",
    description: "100° flush head bolt, short thread"
  },
  {
    title: "NAS1580-4 Flush Bolt Standard",
    category: "Bolts",
    partNumber: "NAS1580-4",
    modelFile: "nas1580-4.glb",
    slug: "nas1580-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1580 - 1/4-28 UNF",
    description: "100° flush head bolt"
  },
  {
    title: "NAS1581-4 Flush Reduced Head",
    category: "Bolts",
    partNumber: "NAS1581-4",
    modelFile: "nas1581-4.glb",
    slug: "nas1581-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1581 - 1/4-28 UNF",
    description: "100° flush reduced head bolt"
  },
  {
    title: "NAS1582-4 Flush Tension Head",
    category: "Bolts",
    partNumber: "NAS1582-4",
    modelFile: "nas1582-4.glb",
    slug: "nas1582-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1582 - 1/4-28 UNF",
    description: "100° flush tension head bolt"
  },
  {
    title: "NAS1724-4 Taper-Lok Flush Shear Bolt",
    category: "Bolts",
    partNumber: "NAS1724-4",
    modelFile: "nas1724-4.glb",
    slug: "nas1724-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1724 - 1/4-28 UNF",
    description: "100° flush shear bolt, tapered shank, Taper-Lok"
  },
  {
    title: "NAS7203-4 Flush Cruciform",
    category: "Bolts",
    partNumber: "NAS7203-4",
    modelFile: "nas7203-4.glb",
    slug: "nas7203-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS7203 - 1/4-28 UNF",
    description: "100° flush head bolt, cruciform recess"
  },
  {
    title: "NAS7400-4 Flush Cruciform",
    category: "Bolts",
    partNumber: "NAS7400-4",
    modelFile: "nas7400-4.glb",
    slug: "nas7400-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS7400 - 1/4-28 UNF",
    description: "100° flush head bolt, cruciform recess"
  },

  // Pan Head Bolts
  {
    title: "NAS1728-4 Pan Head Taper-Lok",
    category: "Bolts",
    partNumber: "NAS1728-4",
    modelFile: "nas1728-4.glb",
    slug: "nas1728-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1728 - 1/4-28 UNF",
    description: "Pan head bolt, tapered shank, Taper-Lok"
  },
  {
    title: "NAS1729-4 Pan Head Taper-Lok Oversize",
    category: "Bolts",
    partNumber: "NAS1729-4",
    modelFile: "nas1729-4.glb",
    slug: "nas1729-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1729 - 1/4-28 UNF",
    description: "Pan head bolt, oversize, tapered shank, Taper-Lok"
  },
  {
    title: "NAS7700-4 Pan Head Cruciform Short Thread",
    category: "Bolts",
    partNumber: "NAS7700-4",
    modelFile: "nas7700-4.glb",
    slug: "nas7700-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS7700 - 1/4-28 UNF",
    description: "Pan head bolt, cruciform recess, short thread"
  },
  {
    title: "NAS7800-4 Pan Head Cruciform Short Thread",
    category: "Bolts",
    partNumber: "NAS7800-4",
    modelFile: "nas7800-4.glb",
    slug: "nas7800-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS7800 - 1/4-28 UNF",
    description: "Pan head bolt, cruciform recess, short thread"
  },

  // Eye Bolts
  {
    title: "AN42-4 Eye Bolt",
    category: "Bolts",
    partNumber: "AN42-4",
    modelFile: "an42-4.glb",
    slug: "an42-4",
    material: "Carbon Steel",
    threadType: "UNC",
    specification: "AN42 - 1/4\" thread",
    description: "Eye bolt for lifting and rigging"
  },
  {
    title: "AN43-5 Eye Bolt",
    category: "Bolts",
    partNumber: "AN43-5",
    modelFile: "an43-5.glb",
    slug: "an43-5",
    material: "Carbon Steel",
    threadType: "UNC",
    specification: "AN43 - 5/16\" thread",
    description: "Eye bolt for lifting and rigging"
  },

  // Clevis Bolts
  {
    title: "AN21-10 Clevis Bolt",
    category: "Bolts",
    partNumber: "AN21-10",
    modelFile: "an21-10.glb",
    slug: "an21-10",
    material: "Carbon Steel",
    threadType: "UNC",
    specification: "AN21 - 1/4\" x 1.25\"",
    description: "Clevis bolt with cotter pin hole"
  },
  {
    title: "AN22-12 Clevis Bolt",
    category: "Bolts",
    partNumber: "AN22-12",
    modelFile: "an22-12.glb",
    slug: "an22-12",
    material: "Carbon Steel",
    threadType: "UNC",
    specification: "AN22 - 5/16\" x 1.50\"",
    description: "Clevis bolt with cotter pin hole"
  },
  {
    title: "AN23-14 Clevis Bolt",
    category: "Bolts",
    partNumber: "AN23-14",
    modelFile: "an23-14.glb",
    slug: "an23-14",
    material: "Carbon Steel",
    threadType: "UNC",
    specification: "AN23 - 3/8\" x 1.75\"",
    description: "Clevis bolt with cotter pin hole"
  },

  // Close Tolerance Bolts
  {
    title: "NAS464-4 Shear Bolt Close Tolerance",
    category: "Bolts",
    partNumber: "NAS464-4",
    modelFile: "nas464-4.glb",
    slug: "nas464-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS464 - 1/4-28 UNF",
    description: "Shear bolt, close tolerance, drilled or undrilled"
  },
  {
    title: "NAS673-4 Hex Bolt Close Tolerance",
    category: "Bolts",
    partNumber: "NAS673-4",
    modelFile: "nas673-4.glb",
    slug: "nas673-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS673 - 1/4-28 UNF",
    description: "Hex head bolt, close tolerance, drilled or undrilled"
  },
  {
    title: "NAS333-4 Flush Close Tolerance",
    category: "Bolts",
    partNumber: "NAS333-4",
    modelFile: "nas333-4.glb",
    slug: "nas333-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS333 - 1/4-28 UNF",
    description: "100° flush head bolt, close tolerance"
  },

  // Internal Wrenching Bolts
  {
    title: "MS20004-4 External Wrenching Bolt",
    category: "Bolts",
    partNumber: "MS20004-4",
    modelFile: "ms20004-4.glb",
    slug: "ms20004-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "MS20004 - 1/4-28 UNF",
    description: "External wrenching bolt"
  },
  {
    title: "NAS144-4 Internal Wrenching Bolt",
    category: "Bolts",
    partNumber: "NAS144-4",
    modelFile: "nas144-4.glb",
    slug: "nas144-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS144 - 1/4-28 UNF",
    description: "Internal wrenching bolt, drilled or undrilled head or shank"
  },

  // High Temperature Bolts
  {
    title: "MS9033-4 High Temperature 12-Point",
    category: "Bolts",
    partNumber: "MS9033-4",
    modelFile: "ms9033-4.glb",
    slug: "ms9033-4",
    material: "A286 CRES",
    threadType: "UNF",
    specification: "MS9033 - 1/4-28 UNF",
    description: "12-point head bolt, high temperature"
  },
  {
    title: "MS9224-4 Heat Resistant 12-Point",
    category: "Bolts",
    partNumber: "MS9224-4",
    modelFile: "ms9224-4.glb",
    slug: "ms9224-4",
    material: "A286 CRES",
    threadType: "UNF",
    specification: "MS9224 - 1/4-28 UNF",
    description: "12-point head bolt, heat resistant"
  },

  // Black Oxide Finish Bolts
  {
    title: "MS9281-4 Hex Bolt Black Oxide",
    category: "Bolts",
    partNumber: "MS9281-4",
    modelFile: "ms9281-4.glb",
    slug: "ms9281-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "MS9281 - 1/4-28 UNF",
    description: "Hex head bolt, black oxide finish"
  },
  {
    title: "MS9169-4 12-Point Bolt Black Oxide",
    category: "Bolts",
    partNumber: "MS9169-4",
    modelFile: "ms9169-4.glb",
    slug: "ms9169-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "MS9169 - 1/4-28 UNF",
    description: "12-point head bolt, drilled, black oxide finish"
  },

  // Shoulder Hex Head Bolts
  {
    title: "NAS1297-4 Shoulder Hex Bolt",
    category: "Bolts",
    partNumber: "NAS1297-4",
    modelFile: "nas1297-4.glb",
    slug: "nas1297-4",
    material: "Alloy Steel",
    threadType: "UNF",
    specification: "NAS1297 - 1/4-28 UNF",
    description: "Shoulder bolt with hex head"
  },

  // Fluid Passage Bolts
  {
    title: "MS24387-4 Fluid Passage Bolt",
    category: "Bolts",
    partNumber: "MS24387-4",
    modelFile: "ms24387-4.glb",
    slug: "ms24387-4",
    material: "Stainless Steel",
    threadType: "UNF",
    specification: "MS24387 - 1/4-28 UNF",
    description: "Fluid passage bolt, precision type"
  }
];



// Efficient memoized filtering with useMemo
export const Catalog = () => {
  const navigate = useNavigate();
  const { addItem } = useQuoteStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedMaterial, setSelectedMaterial] = useState("All Materials");
  const [selectedThreadType, setSelectedThreadType] = useState("All Thread Types");
  const [showFilters, setShowFilters] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success");

  // Preload models for above-the-fold products on mount
  useEffect(() => {
    const initialModels = allProducts.slice(0, 6).map(p => p.modelFile);
    preloadCatalogModels(initialModels);
  }, []);

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.partNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesMaterial = selectedMaterial === "All Materials" || product.material === selectedMaterial;
    const matchesThread = selectedThreadType === "All Thread Types" || product.threadType === selectedThreadType;
    return matchesSearch && matchesCategory && matchesMaterial && matchesThread;
  });

  const handleAddToQuote = (product: Product) => {
    addItem({
      partNumber: product.partNumber,
      title: product.title,
    });
    setAddedToCart(product.partNumber);
    setToastMessage(`${product.title} added to quote`);
    setToastType("success");
    setShowToast(true);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleDownloadSpec = (partNumber: string) => {
    // Trigger spec sheet download
    setToastMessage(`Downloading spec sheet for ${partNumber}`);
    setToastType("info");
    setShowToast(true);
  };

  const activeFiltersCount = [selectedCategory !== "All Categories", selectedMaterial !== "All Materials", selectedThreadType !== "All Thread Types"].filter(Boolean).length;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-6 md:px-8 border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <TechLabel className="mb-6">Product Catalog</TechLabel>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black">
              Aerospace Hardware
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Browse our complete inventory of certified aerospace fasteners, fittings, and precision hardware.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by part number or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 bg-white rounded-sm focus:border-black focus:outline-none transition-colors text-black placeholder:text-gray-400 font-mono text-sm"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="relative px-6 py-4 border-2 border-gray-200 bg-white rounded-sm hover:border-black transition-colors flex items-center gap-3 text-black font-semibold"
              >
                <Filter className="w-5 h-5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 p-6 bg-white border-2 border-gray-200 rounded-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-black">Advanced Filters</h3>
                      <button
                        onClick={() => {
                          setSelectedCategory("All Categories");
                          setSelectedMaterial("All Materials");
                          setSelectedThreadType("All Thread Types");
                        }}
                        className="text-sm text-gray-600 hover:text-black transition-colors font-mono"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-sm focus:border-black focus:outline-none transition-colors appearance-none text-black cursor-pointer font-mono text-sm"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Material</label>
                        <select
                          value={selectedMaterial}
                          onChange={(e) => setSelectedMaterial(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-sm focus:border-black focus:outline-none transition-colors appearance-none text-black cursor-pointer font-mono text-sm"
                        >
                          {materials.map(mat => (
                            <option key={mat} value={mat}>{mat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">Thread Type</label>
                        <select
                          value={selectedThreadType}
                          onChange={(e) => setSelectedThreadType(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 bg-white rounded-sm focus:border-black focus:outline-none transition-colors appearance-none text-black cursor-pointer font-mono text-sm"
                        >
                          {threadTypes.map(thread => (
                            <option key={thread} value={thread}>{thread}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6 md:px-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <p className="text-gray-600 font-mono text-sm">
              Showing <span className="font-bold text-black">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            <TechLabel>AS9120B Certified</TechLabel>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Categories");
                    setSelectedMaterial("All Materials");
                    setSelectedThreadType("All Thread Types");
                  }}
                  className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-bold rounded-sm transition-colors uppercase tracking-wide"
                >
                  Clear All Filters
                </button>
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={`${product.partNumber}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.8) }}
                >
                  <TechnicalBorder 
                    onClick={() => navigate(`/product/${product.slug}`)}
                    className="group p-8 border-r border-b border-gray-200 hover:bg-white hover:shadow-2xl hover:z-10 hover:-translate-y-1 transition-all duration-500 cursor-pointer relative overflow-hidden h-full"
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 via-gray-50/0 to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Arrow Icon */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 z-10">
                      <ArrowUpRight className="w-5 h-5 text-gray-900" />
                    </div>

                    {/* Header */}
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <TechLabel>{product.category}</TechLabel>
                      <span className="font-mono text-[10px] text-gray-500 tracking-wide group-hover:text-gray-900 transition-colors duration-300">
                        {product.partNumber}
                      </span>
                    </div>
                    
                    {/* 3D Model Viewer */}
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100/50 mb-6 flex items-center justify-center overflow-hidden relative rounded-sm border border-gray-200 group-hover:border-gray-300 transition-all duration-500 group-hover:shadow-inner">
                      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500" 
                           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '12px 12px' }} 
                      />
                      
                      <div className="w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
                        <Catalog3DViewer modelPath={product.modelFile} scale={1.3} />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3 relative z-10">
                      <h3 className="text-lg font-bold uppercase tracking-tight text-gray-900 group-hover:text-black transition-colors duration-300">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed font-mono">
                        {product.specification}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Material and Thread Type Tags */}
                      <div className="flex gap-2 flex-wrap pt-2">
                        <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-sm text-xs text-gray-700 font-mono">
                          {product.material}
                        </span>
                        {product.threadType !== "N/A" && (
                          <span className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-sm text-xs text-gray-700 font-mono">
                            {product.threadType}
                          </span>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToQuote(product);
                          }}
                          disabled={addedToCart === product.partNumber}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 h-11 bg-black hover:bg-gray-800 disabled:bg-green-600 text-white font-bold rounded-sm transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                        >
                          <AnimatePresence mode="wait">
                            {addedToCart === product.partNumber ? (
                              <motion.span
                                key="added"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex items-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                Added
                              </motion.span>
                            ) : (
                              <motion.span
                                key="add"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex items-center gap-2"
                              >
                                <ShoppingCart className="w-4 h-4" />
                                Add to RFQ
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadSpec(product.partNumber);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="h-11 px-4 border-2 border-gray-200 hover:border-black rounded-sm transition-colors flex items-center justify-center"
                          title="Download Spec Sheet"
                        >
                          <Download className="w-4 h-4 text-gray-600" />
                        </motion.button>
                      </div>
                    </div>
                  </TechnicalBorder>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};
