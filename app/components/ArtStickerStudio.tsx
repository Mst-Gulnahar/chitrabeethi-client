'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Trash2, Download, Upload, Palette, Brush, Shapes,
  Undo2, Redo2, RotateCcw, RotateCw, History, Layers, ChevronUp, ChevronDown, X
} from "lucide-react";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";

const STICKER_ASSETS = {
  paintings: [
    { id: "p1", url: "/img/starry-night-bg.png", label: "Starry Night", defaultScale: 3.5 },
    { id: "p2", url: "/img/plain-near-auvers.png", label: "The Plains", defaultScale: 3.5 },
    { id: "p3", url: "/img/houses-at-auvers.png", label: "The Houses", defaultScale: 3.5 },
    { id: "p4", url: "/img/green-wheat-field.png", label: "Wheat Field", defaultScale: 3.5 },
  ],
  accents: [
    { id: "a1", url: "/img/star.png", label: "Star", defaultScale: 1.0 },
    { id: "a2", url: "/img/bee.png", label: "BumbleBee", defaultScale: 1.0 },
    { id: "a3", url: "/img/cow.png", label: "Cow", defaultScale: 1.0 },
    { id: "a4", url: "/img/cloud.png", label: "Cloud", defaultScale: 1.0 },
  ],
};

interface CanvasItem {
  id: string;
  url: string;
  label: string;
  type: "paintings" | "accents" | "custom";
  x: number;
  y: number;
  scale: number;
  rotate: number;
  zIndex: number;
}

// Cozy Toast Notification
const showCozyToast = (message: string, icon: string) => {
  toast(message, {
    icon: icon,
    style: {
      background: "#FDFBF7",
      color: "#3D2B1F",
      border: "2px solid #3D2B1F",
      borderRadius: "1rem",
      fontFamily: "inherit",
      fontSize: "12px",
      fontWeight: "800",
      letterSpacing: "0.025em",
      boxShadow: "3px 3px 0px #3D2B1F",
    },
  });
};

export default function ArtStickerStudio() {
  const [activeTab, setActiveTab] = useState<"paintings" | "accents">("paintings");
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [stickerHistory, setStickerHistory] = useState<string[]>([]);
  
  const [historyStack, setHistoryStack] = useState<CanvasItem[][]>([]);
  const [redoStack, setRedoStack] = useState<CanvasItem[][]>([]);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedItems = localStorage.getItem("art_studio_canvas_items");
    const savedHistory = localStorage.getItem("art_studio_sticker_history");
    if (savedItems) {
      try {
        const parsed = JSON.parse(savedItems);
        setCanvasItems(parsed);
        if (parsed.length > 0) {
          const highestZ = Math.max(...parsed.map((i: CanvasItem) => i.zIndex), 1);
          setMaxZIndex(highestZ);
        }
      } catch (e) {
        console.error("Error reading canvas cache storage:", e);
      }
    }
    if (savedHistory) {
      try { setStickerHistory(JSON.parse(savedHistory)); } catch (e) { console.error(e); }
    }
  }, []);

  const saveToBoardState = (newItems: CanvasItem[]) => {
    setHistoryStack(prev => [...prev, canvasItems]);
    setRedoStack([]); 
    setCanvasItems(newItems);
    localStorage.setItem("art_studio_canvas_items", JSON.stringify(newItems));
  };

  const handleStickerDeckWheelScroll = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  const getBroughtToFrontItems = (items: CanvasItem[], id: string, currentMaxZ: number) => {
    const nextZ = currentMaxZ + 1;
    setMaxZIndex(nextZ);
    return items.map(item => item.id === id ? { ...item, zIndex: nextZ } : item);
  };

  const addAssetToCanvas = (url: string, label: string, type: CanvasItem["type"], initialScale: number = 1.0) => {
    const nextZ = maxZIndex + 1;
    const offsetScatter = (canvasItems.length * 10) % 50;

    const approximateImageSize = 64; 
    const containerSize = canvasRef.current ? canvasRef.current.offsetWidth : 320;

    const centerX = (containerSize / 2) - (approximateImageSize / 2);
    const centerY = (containerSize / 2) - (approximateImageSize / 2);

    const newItem: CanvasItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url,
      label,
      type,
      x: Math.max(10, centerX + offsetScatter),
      y: Math.max(10, centerY + offsetScatter),
      scale: initialScale,
      rotate: 0,
      zIndex: nextZ
    };

    setMaxZIndex(nextZ);
    saveToBoardState([...canvasItems, newItem]);
    setSelectedItemId(newItem.id);

    const visualIcons = { paintings: "🖼️", accents: "✨", custom: "🎨" };
    showCozyToast(`${label} added to canvas!`, visualIcons[type] || "✨");
  };

  const handleArtworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addAssetToCanvas(url, "Custom Artwork", "custom", 1.0);
    }
  };

  const updateTransform = (property: 'scale' | 'rotate', amount: number) => {
    if (!selectedItemId) return;
    const nextItems = canvasItems.map(item => {
      if (item.id === selectedItemId) {
        const fallback = property === 'scale' ? 1 : 0;
        const currentVal = item[property] ?? fallback;
        let nextVal = currentVal + amount;
        if (property === 'scale') nextVal = Math.max(0.2, Math.min(nextVal, 4.0));
        return { ...item, [property]: nextVal };
      }
      return item;
    });
    saveToBoardState(nextItems);
  };

  const handleCanvasWheel = (e: React.WheelEvent, id: string) => {
    if (id !== selectedItemId) return;
    e.preventDefault();
    const direction = e.deltaY < 0 ? 0.05 : -0.05;
    updateTransform('scale', direction);
  };

  const resetSelectedItem = () => {
    if (!selectedItemId) return;
    const nextItems = canvasItems.map(item => 
      item.id === selectedItemId ? { ...item, scale: 1.0, rotate: 0 } : item
    );
    saveToBoardState(nextItems);
    showCozyToast("Element transforms reset!", "🌱");
  };

  const deleteSelectedItem = () => {
    if (!selectedItemId) return;
    const targetItem = canvasItems.find(item => item.id === selectedItemId);
    const filtered = canvasItems.filter(item => item.id !== selectedItemId);
    saveToBoardState(filtered);
    setSelectedItemId(null);
    
    if (targetItem) {
      showCozyToast(`${targetItem.label} removed!`, "broom");
    }
  };

  const clearWholeCanvas = () => {
    if (canvasItems.length === 0) return;
    saveToBoardState([]);
    setSelectedItemId(null);
    showCozyToast("Canvas wiped clean!", "🧼");
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const previous = historyStack[historyStack.length - 1];
    setRedoStack(prev => [canvasItems, ...prev]);
    setHistoryStack(prev => prev.slice(0, -1));
    setCanvasItems(previous);
    localStorage.setItem("art_studio_canvas_items", JSON.stringify(previous));
    showCozyToast("Undo action!", "⏳");
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setHistoryStack(prev => [...prev, canvasItems]);
    setRedoStack(prev => prev.slice(1));
    setCanvasItems(next);
    localStorage.setItem("art_studio_canvas_items", JSON.stringify(next));
    showCozyToast("Redo action!", "🔮");
  };

  const selectAndBringToFront = (id: string) => {
    const updated = getBroughtToFrontItems(canvasItems, id, maxZIndex);
    setCanvasItems(updated);
    localStorage.setItem("art_studio_canvas_items", JSON.stringify(updated));
    setSelectedItemId(id);
  };

  const adjustLayerDepth = (id: string, direction: 'up' | 'down') => {
    const targetIndex = canvasItems.findIndex(i => i.id === id);
    if (targetIndex === -1) return;

    const updated = [...canvasItems];
    if (direction === 'up' && targetIndex < updated.length - 1) {
      const tempZ = updated[targetIndex].zIndex;
      updated[targetIndex].zIndex = updated[targetIndex + 1].zIndex;
      updated[targetIndex + 1].zIndex = tempZ;
    } else if (direction === 'down' && targetIndex > 0) {
      const tempZ = updated[targetIndex].zIndex;
      updated[targetIndex].zIndex = updated[targetIndex - 1].zIndex;
      updated[targetIndex - 1].zIndex = tempZ;
    }
    
    updated.sort((a, b) => a.zIndex - b.zIndex);
    saveToBoardState(updated);
  };

  const handleDragEnd = (id: string, info: any) => {
    const updated = canvasItems.map(item => {
      if (item.id === id) {
        return { ...item, x: item.x + info.offset.x, y: item.y + info.offset.y };
      }
      return item;
    });
    const broughtToFront = getBroughtToFrontItems(updated, id, maxZIndex);
    saveToBoardState(broughtToFront);
  };

  const exportStickerCanvas = async () => {
    if (!canvasRef.current) return;
    try {
      setIsExporting(true);
      setSelectedItemId(null); 
      await new Promise((resolve) => setTimeout(resolve, 250));

      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        backgroundColor: "transparent", 
        style: { background: "transparent", backgroundImage: "none" }
      });

      const link = document.createElement("a");
      link.download = `art-sticker-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      const updatedHistory = [dataUrl, ...stickerHistory.slice(0, 5)];
      setStickerHistory(updatedHistory);
      localStorage.setItem("art_studio_sticker_history", JSON.stringify(updatedHistory));
      
      showCozyToast("Sticker compiled successfully!", "✨");
    } catch (error) {
      console.error("Export failure:", error);
      showCozyToast("Export failed!", "🩹");
    } finally {
      setIsExporting(false);
    }
  };

  const deleteHistoryItem = (indexToDelete: number) => {
    const updated = stickerHistory.filter((_, idx) => idx !== indexToDelete);
    setStickerHistory(updated);
    localStorage.setItem("art_studio_sticker_history", JSON.stringify(updated));
    showCozyToast("History item deleted!", "🗑️");
  };

  const clearAllHistory = () => {
    setStickerHistory([]);
    localStorage.removeItem("art_studio_sticker_history");
    showCozyToast("Studio collection cleared!", "🧺");
  };

  return (
    <section 
      id="art-sticker-studio"
      className="relative min-h-screen py-8 sm:py-16 px-3 sm:px-6 text-[#3D2B1F] select-none flex flex-col items-center justify-start pt-24 sm:pt-36 md:pt-48 pb-10"
    >
      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 w-full max-w-4xl px-2 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#3D2B1F] tracking-tight">
          Art Sticker Studio
        </h1>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5E6E8] border border-[#A84A5B] text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#A84A5B] shadow-sm whitespace-nowrap">
          <Sparkles className="w-3 h-3 animate-pulse text-[#A84A5B]" /> Custom Creator
        </span>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 relative z-10 items-start pb-6">
        
        {/* WORKSPACE CANVAS */}
        <div className="col-span-1 md:col-span-2 lg:col-span-5 flex flex-col items-center w-full max-w-[340px] sm:max-w-[420px] mx-auto">
          <div className="w-full flex items-center justify-between mb-2 px-1 gap-2">
            <div className="flex gap-1.5 items-center">
              <button 
                onClick={handleUndo} 
                disabled={historyStack.length === 0} 
                className="p-1.5 rounded-lg bg-[#FDFBF7] border border-[#EAE6DF] hover:border-[#3D2B1F] text-[#3D2B1F] disabled:opacity-30 transition-all shadow-sm active:scale-95"
                title="Undo"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleRedo} 
                disabled={redoStack.length === 0} 
                className="p-1.5 rounded-lg bg-[#FDFBF7] border border-[#EAE6DF] hover:border-[#3D2B1F] text-[#3D2B1F] disabled:opacity-30 transition-all shadow-sm active:scale-95"
                title="Redo"
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
              <div className="w-[1px] h-4 bg-[#EAE6DF] mx-0.5 sm:mx-1" />
              <button 
                onClick={clearWholeCanvas} 
                disabled={canvasItems.length === 0}
                className="text-[9px] font-black uppercase px-2 py-1.5 sm:px-2.5 rounded-lg border border-[#A84A5B] text-[#A84A5B] hover:bg-[#F5E6E8] disabled:opacity-30 transition-all active:scale-95"
              >
                Clear Board
              </button>
            </div>
            <span className="text-[8px] sm:text-[9px] uppercase font-black text-[#A84A5B] tracking-wider truncate">Transparent Canvas</span>
          </div>

          <div 
            ref={canvasRef}
            className="relative w-full aspect-square bg-[#FDFBF7] border-4 border-[#3D2B1F] rounded-[1.5rem] sm:rounded-[2rem] shadow-sm overflow-hidden touch-none" 
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedItemId(null); }}
          >
            {canvasItems.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none opacity-40">
                <Palette className="w-7 h-7 sm:w-8 sm:h-8 text-[#3D2B1F] mb-1 stroke-[1.5]" />
                <p className="font-black text-xs text-[#3D2B1F]">Canvas is Empty</p>
              </div>
            )}

            {canvasItems.map((item) => {
              const isSelected = selectedItemId === item.id;

              return (
                <motion.div
                  key={item.id}
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  onDragStart={() => selectAndBringToFront(item.id)}
                  onDragEnd={(e, info) => handleDragEnd(item.id, info)}
                  onWheel={(e) => handleCanvasWheel(e, item.id)}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    selectAndBringToFront(item.id);
                  }}
                  style={{
                    position: 'absolute',
                    x: item.x,
                    y: item.y,
                    zIndex: item.zIndex,
                    scale: item.scale,
                    rotate: item.rotate,
                    cursor: 'grab',
                    pointerEvents: selectedItemId && !isSelected ? 'none' : 'auto'
                  }}
                  className="absolute p-2 select-none active:cursor-grabbing touch-none transition-shadow"
                >
                  <img 
                    src={item.url} 
                    alt={item.label} 
                    className="w-14 h-14 sm:w-20 sm:h-20 object-contain pointer-events-none drop-shadow-md"
                    draggable={false}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Quick Transform Controls Bar */}
          <AnimatePresence>
            {selectedItemId && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="w-full mt-2.5 sm:mt-3 bg-[#FDFBF7] border-2 border-[#3D2B1F] rounded-xl p-1.5 shadow-sm flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => updateTransform('scale', -0.1)} className="w-7 h-7 rounded-lg bg-[#F4EFE6] border border-[#3D2B1F] font-black text-[10px] text-[#3D2B1F] hover:bg-[#EFF2E7] active:scale-95">🔍-</button>
                  <button onClick={() => updateTransform('scale', 0.1)} className="w-7 h-7 rounded-lg bg-[#F4EFE6] border border-[#3D2B1F] font-black text-[10px] text-[#3D2B1F] hover:bg-[#EFF2E7] active:scale-95">🔍+</button>
                  <div className="h-3 w-[1px] bg-[#EAE6DF] mx-0.5" />
                  <button onClick={() => updateTransform('rotate', -15)} className="w-7 h-7 rounded-lg bg-[#F4EFE6] border border-[#3D2B1F] text-[#3D2B1F] flex items-center justify-center hover:bg-[#EFF2E7] active:scale-95"><RotateCcw className="w-3 h-3" /></button>
                  <button onClick={() => updateTransform('rotate', 15)} className="w-7 h-7 rounded-lg bg-[#F4EFE6] border border-[#3D2B1F] text-[#3D2B1F] flex items-center justify-center hover:bg-[#EFF2E7] active:scale-95"><RotateCw className="w-3 h-3" /></button>
                  <button onClick={resetSelectedItem} className="text-[10px] font-black px-2 h-7 rounded-lg bg-[#F4EFE6] border border-[#3D2B1F] text-[#3D2B1F] hover:bg-[#EFF2E7] active:scale-95">Reset</button>
                </div>
                <button onClick={deleteSelectedItem} className="p-1.5 text-[#A84A5B] hover:bg-[#F5E6E8] rounded-lg transition-colors shrink-0"><Trash2 className="w-4 h-4" /></button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SIDEBAR PANELS */}
        <div className="col-span-1 md:col-span-1 lg:col-span-4 flex flex-col w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none mx-auto">
          <div className="bg-[#FDFBF7] border-4 border-[#3D2B1F] rounded-[1.25rem] sm:rounded-[1.5rem] shadow-sm p-3.5 sm:p-4 flex flex-col justify-between">
            <div>
              <div className="grid grid-cols-2 border-2 border-[#3D2B1F] p-0.5 rounded-xl bg-[#F4EFE6] mb-3">
                <button type="button" onClick={() => setActiveTab("paintings")} className={`py-1.5 rounded-lg font-black text-[10px] sm:text-[11px] flex items-center justify-center gap-1 transition-colors ${activeTab === "paintings" ? "bg-[#3D2B1F] text-[#FDFBF7]" : "text-[#3D2B1F]"}`}><Brush className="w-3 h-3" /> Backgrounds</button>
                <button type="button" onClick={() => setActiveTab("accents")} className={`py-1.5 rounded-lg font-black text-[10px] sm:text-[11px] flex items-center justify-center gap-1 transition-colors ${activeTab === "accents" ? "bg-[#3D2B1F] text-[#FDFBF7]" : "text-[#3D2B1F]"}`}><Shapes className="w-3 h-3" /> Elements</button>
              </div>

              {/* STICKER CHOOSER CARD */}
              <div 
                ref={scrollContainerRef}
                onWheel={handleStickerDeckWheelScroll}
                className="max-h-[180px] lg:max-h-[220px] overflow-x-auto lg:overflow-y-auto pr-0.5 custom-scrollbar min-h-[120px]"
              >
                <div className="flex flex-row lg:grid lg:grid-cols-2 gap-2 pb-2 lg:pb-0">
                  {STICKER_ASSETS[activeTab].map((asset) => {
                    const keepSmall = asset.id === "a1" || asset.id === "p3"; 
                    const imageSizeClass = keepSmall 
                      ? "w-8 h-8 sm:w-10 sm:h-10 object-contain" 
                      : "w-12 h-12 sm:w-14 sm:h-14 object-contain scale-105 sm:scale-110";

                    return (
                      <button
                        type="button"
                        key={asset.id}
                        onClick={() => addAssetToCanvas(asset.url, asset.label, activeTab, asset.defaultScale)}
                        className="group bg-[#F4EFE6] hover:bg-[#EFF2E7] border-2 border-[#3D2B1F] p-2 rounded-xl transition-all flex flex-col items-center justify-center gap-1 text-center min-w-[85px] sm:min-w-[95px] lg:min-w-0 shrink-0"
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center overflow-hidden">
                          <img 
                            src={asset.url} 
                            alt={asset.label} 
                            className={`${imageSizeClass} group-hover:scale-105 transition-all duration-200`} 
                            draggable={false}
                          />
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-black text-[#3D2B1F] truncate w-full px-0.5">{asset.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t-2 border-dashed border-[#EAE6DF] space-y-2">
              <input type="file" ref={fileInputRef} onChange={handleArtworkUpload} accept="image/*" className="hidden" />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#F4EFE6] hover:bg-[#EAE6DF] border-2 border-[#3D2B1F] text-[#3D2B1F] font-black text-[10px] sm:text-[11px] rounded-xl shadow-[2px_2px_0px_#3D2B1F] transition-all active:translate-y-0.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Custom Artwork</span>
              </button>

              {canvasItems.length > 0 && (
                <button
                  type="button"
                  onClick={exportStickerCanvas}
                  disabled={isExporting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#556B2F] hover:bg-[#475a27] border-2 border-[#3D2B1F] text-[#EFF2E7] font-black text-[10px] sm:text-[11px] rounded-xl shadow-[2px_2px_0px_#3D2B1F] transition-all disabled:opacity-50 active:translate-y-0.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? "Compiling PNG..." : "Export Sticker PNG"}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* LAYERS DECK & UTILITY HISTORY LOG */}
        <div className="col-span-1 md:col-span-1 lg:col-span-3 flex flex-col gap-4 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none mx-auto h-full">
          
          {/* Active Canvas Layer Management Panel */}
          <div className="bg-[#FDFBF7] border-4 border-[#3D2B1F] rounded-[1.25rem] sm:rounded-[1.5rem] shadow-sm p-3.5 flex flex-col flex-1 min-h-[150px]">
            <span className="font-black text-[10px] sm:text-[11px] text-[#3D2B1F] flex items-center gap-1.5 mb-2">
              <Layers className="w-3.5 h-3.5 text-[#556B2F]" /> Canvas Layers
            </span>
            
            {canvasItems.length === 0 ? (
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[#EAE6DF] rounded-xl bg-[#F4EFE6] text-[10px] font-black text-[#3D2B1F] opacity-50 p-4">
                No active objects
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[140px] pr-0.5 custom-scrollbar">
                {[...canvasItems].reverse().map((item, index) => {
                  const actualIdx = canvasItems.length - 1 - index;
                  return (
                    <div 
                      key={item.id}
                      onClick={() => selectAndBringToFront(item.id)}
                      className={`flex items-center justify-between p-1.5 rounded-xl border-2 text-[10px] font-bold cursor-pointer transition-all ${
                        selectedItemId === item.id 
                          ? 'bg-[#F5E6E8] border-[#A84A5B] text-[#A84A5B]' 
                          : 'bg-[#F4EFE6] border-[#3D2B1F] text-[#3D2B1F] hover:bg-[#EFF2E7]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <img src={item.url} className="w-5 h-5 object-contain rounded bg-[#FDFBF7] border border-[#3D2B1F]" alt="" />
                        <span className="truncate max-w-[80px] sm:max-w-[100px]">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-0.5" onClick={e => e.stopPropagation()}>
                        <button 
                          disabled={actualIdx === canvasItems.length - 1} 
                          onClick={() => adjustLayerDepth(item.id, 'up')}
                          className="p-0.5 hover:bg-[#FDFBF7] rounded border border-transparent hover:border-[#3D2B1F] text-[#3D2B1F] disabled:opacity-20"
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button 
                          disabled={actualIdx === 0} 
                          onClick={() => adjustLayerDepth(item.id, 'down')}
                          className="p-0.5 hover:bg-[#FDFBF7] rounded border border-transparent hover:border-[#3D2B1F] text-[#3D2B1F] disabled:opacity-20"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Studio Export History Log */}
          <div className="bg-[#FDFBF7] border-4 border-[#3D2B1F] rounded-[1.25rem] sm:rounded-[1.5rem] shadow-sm p-3.5 flex flex-col min-h-[140px] h-fit">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-black text-[10px] sm:text-[11px] text-[#3D2B1F] flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-[#A84A5B]" /> Studio History
              </span>
              {stickerHistory.length > 0 && (
                <button 
                  onClick={clearAllHistory}
                  className="text-[8px] font-black uppercase text-[#A84A5B] hover:bg-[#F5E6E8] px-2 py-0.5 rounded-lg border border-[#A84A5B] transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {stickerHistory.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 p-3 border-2 border-dashed border-[#EAE6DF] rounded-xl bg-[#F4EFE6]">
                <p className="text-[10px] font-black text-[#3D2B1F]">History Log Clear</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2 overflow-y-auto max-h-[140px] pr-1 custom-scrollbar">
                {stickerHistory.map((srcUrl, idx) => (
                  <div 
                    key={idx} 
                    className="relative aspect-square border-2 border-[#3D2B1F] rounded-xl p-1 bg-[#FDFBF7] group overflow-hidden transition-all hover:shadow-sm flex items-center justify-center"
                  >
                    <img src={srcUrl} alt="Exported asset frame" className="w-full h-full object-contain pointer-events-none" />
                    
                    <div className="absolute inset-0 bg-[#3D2B1F]/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-all duration-150 p-1.5 z-10">
                      <a 
                        href={srcUrl} 
                        download={`art-sticker-${idx}.png`} 
                        className="w-full bg-[#556B2F] text-[#EFF2E7] rounded text-[8px] font-black uppercase text-center py-1 transition-colors hover:bg-[#475a27]"
                      >
                        Save
                      </a>
                      <button 
                        type="button"
                        onClick={() => deleteHistoryItem(idx)}
                        className="w-full bg-[#A84A5B] text-[#FAECF0] rounded text-[8px] font-black uppercase text-center py-1 transition-colors hover:bg-[#8e3f4d] flex items-center justify-center gap-0.5"
                      >
                        <X className="w-2 h-2" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}