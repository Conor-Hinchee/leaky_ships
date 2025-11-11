"use client";

import { useState, useEffect, useRef } from "react";

export default function MemoryHeavyImages() {
  const [isArchiving, setIsArchiving] = useState(false);
  const [archivedCount, setArchivedCount] = useState(0);
  const [thumbnailCount, setThumbnailCount] = useState(0);
  const [dataUrlCount, setDataUrlCount] = useState(0);
  const [totalMemoryMB, setTotalMemoryMB] = useState(0);
  const [recentPhotos, setRecentPhotos] = useState([]);
  const intervalRef = useRef(null);
  const canvasRef = useRef(null);

  // Global arrays to store our leaked images - these will NEVER be cleaned up!
  if (typeof window !== 'undefined') {
    window.shipPhotographyArchive = window.shipPhotographyArchive || [];
    window.shipThumbnailCache = window.shipThumbnailCache || [];
    window.shipDataUrls = window.shipDataUrls || [];
    window.shipImageVariations = window.shipImageVariations || [];
    // Add more global references to prevent cleanup
    window.memoryAnchors = window.memoryAnchors || [];
    window.imageProcessingHistory = window.imageProcessingHistory || [];
    window.heavyMetadataStore = window.heavyMetadataStore || [];
  }

  // Photo categories for our maritime archive
  const photoCategories = [
    "🚢 Fleet Documentation",
    "⚓ Harbor Surveillance", 
    "🌊 Storm Tracking",
    "🏝️ Island Mapping",
    "🐋 Marine Life Study",
    "🌅 Dawn Patrol Records",
    "⛈️ Weather Documentation",
    "🚤 Vessel Inspections",
    "🧭 Navigation References",
    "🏖️ Coastal Surveys"
  ];

  const processImageVariations = async (imageSrc, category) => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Create multiple size variations to multiply memory usage
        const variations = [
          { name: 'Thumbnail', scale: 0.3 },
          { name: 'Medium', scale: 0.8 },
          { name: 'Original', scale: 1.0 },
          { name: 'Large', scale: 1.5 },
          { name: 'XLarge', scale: 2.0 }
        ];

        const processedVariations = [];
        
        variations.forEach((variation, index) => {
          // Set canvas size based on variation
          canvas.width = img.width * variation.scale;
          canvas.height = img.height * variation.scale;
          
          // Clear and draw image
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Convert to data URL with good quality (this is VERY memory intensive)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          
          // Create reasonable metadata to make it heavier but not insane
          const heavyMetadata = {
            // Create moderate arrays of fake data
            pixelAnalysis: new Array(100).fill(0).map(() => ({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              rgb: [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)],
              analysis: new Array(10).fill(0).map(() => Math.random().toString(36).repeat(5))
            })),
            colorData: new Array(50).fill(0).map(() => ({
              value: Math.floor(Math.random() * 256),
              count: Math.floor(Math.random() * 1000),
              distribution: new Array(20).fill(0).map(() => Math.random())
            })),
            processingInfo: new Array(25).fill(0).map(() => ({
              step: Math.random().toString(36).repeat(10),
              data: new Array(30).fill(0).map(() => Math.random())
            }))
          };
          
          // Create the photo record with reasonable but still heavy data
          const photoRecord = {
            id: `SHIP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            category,
            variation: variation.name,
            dataUrl, // Just JPEG version
            originalSize: `${img.width}x${img.height}`,
            processedSize: `${canvas.width}x${canvas.height}`,
            scale: variation.scale,
            timestamp: new Date().toISOString(),
            fileSize: Math.round(dataUrl.length * 0.75),
            heavyMetadata,
            // Just one backup copy instead of three
            backupMetadata: JSON.parse(JSON.stringify(heavyMetadata)),
            // Smaller processing history
            processingHistory: new Array(20).fill(0).map(() => ({
              step: Math.random().toString(36),
              timestamp: new Date().toISOString(),
              parameters: new Array(10).fill(0).map(() => Math.random()),
              result: new Array(15).fill(0).map(() => Math.random().toString(36))
            })),
            // Original metadata (keeping for compatibility)
            metadata: {
              location: {
                coordinates: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 180],
                port: `Port ${Math.floor(Math.random() * 100) + 1}`,
                weather: `${Math.floor(Math.random() * 30)}°C, ${Math.floor(Math.random() * 50)}% humidity`
              },
              equipment: {
                camera: `Maritime Cam ${Math.floor(Math.random() * 1000)}`,
                lens: `${Math.floor(Math.random() * 200) + 50}mm f/${(Math.random() * 4 + 1).toFixed(1)}`,
                settings: {
                  iso: Math.floor(Math.random() * 6400) + 100,
                  shutter: `1/${Math.floor(Math.random() * 8000) + 100}`,
                  aperture: `f/${(Math.random() * 8 + 1.4).toFixed(1)}`
                }
              },
              processing: {
                filters: new Array(10).fill(0).map(() => `Filter ${Math.random().toString(36)}`),
                adjustments: new Array(20).fill(0).map(() => ({
                  property: Math.random().toString(36),
                  value: Math.random() * 100,
                  timestamp: new Date().toISOString()
                })),
                history: new Array(15).fill(0).map(() => `Action: ${Math.random().toString(36)}`)
              }
            }
          };

          processedVariations.push(photoRecord);
          
          // Store in main global arrays (THE LEAK!)
          window.shipPhotographyArchive.push(photoRecord);
          window.memoryAnchors.push({
            ref: photoRecord,
            dataUrl,
            metadata: photoRecord.heavyMetadata
          });
          
          if (variation.name.includes('Thumb')) {
            window.shipThumbnailCache.push(photoRecord);
          }
          
          window.shipDataUrls.push({
            id: photoRecord.id,
            dataUrl,
            size: dataUrl.length
          });
        });

        resolve(processedVariations);
      };
      
      img.onerror = () => resolve([]);
      img.src = imageSrc;
    });
  };

  const startArchiving = async () => {
    console.log("📸 LEAK SCENARIO #6 ACTIVATED: Memory-Heavy Images");
    console.log("🚢 Ship's Photography Archive system initializing...");
    
    setIsArchiving(true);
    
    const archivePhotos = async () => {
      const category = photoCategories[Math.floor(Math.random() * photoCategories.length)];
      
      try {
        // Process the big ship image with multiple variations
        const variations = await processImageVariations('/big-ship.jpg', category);
        
        if (variations.length > 0) {
          // Update counts
          setArchivedCount(window.shipPhotographyArchive.length);
          setThumbnailCount(window.shipThumbnailCache.length);
          setDataUrlCount(window.shipDataUrls.length);
          
          // Calculate approximate memory usage
          const totalDataUrlSize = window.shipDataUrls.reduce((sum, item) => sum + item.size, 0);
          const memoryMB = Math.round((totalDataUrlSize / (1024 * 1024)) * 100) / 100;
          setTotalMemoryMB(memoryMB);
          
          // Show recent photos (limit to prevent UI lag)
          const recentItems = window.shipPhotographyArchive.slice(-6);
          setRecentPhotos(recentItems);
          
          console.log(`📸 Archive Status:
            📚 Total Photos: ${window.shipPhotographyArchive.length}
            🖼️ Thumbnails: ${window.shipThumbnailCache.length}
            💾 Data URLs: ${window.shipDataUrls.length}
            🚨 Estimated Memory: ${memoryMB}MB`);
        }
      } catch (error) {
        console.error('Error processing image:', error);
      }
    };
    
    // Process immediately
    await archivePhotos();
    
    // Set up interval to continuously add more images
    intervalRef.current = setInterval(archivePhotos, 3000); // Every 3 seconds - more reasonable
  };

  const stopArchiving = () => {
    console.log("📸 Stopping photography archive... but images remain in memory!");
    setIsArchiving(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    console.log("⚠️ WARNING: All processed images and data URLs are still in memory!");
  };

  // Update counts when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setArchivedCount(window.shipPhotographyArchive?.length || 0);
      setThumbnailCount(window.shipThumbnailCache?.length || 0);
      setDataUrlCount(window.shipDataUrls?.length || 0);
      
      if (window.shipDataUrls) {
        const totalSize = window.shipDataUrls.reduce((sum, item) => sum + (item.size || 0), 0);
        setTotalMemoryMB(Math.round((totalSize / (1024 * 1024)) * 100) / 100);
      }
    }

    return () => {
      // Clean up interval but NOT the global data - that's the leak!
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg border border-slate-300 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📸</span>
        <h3 className="text-lg font-bold text-slate-800">
          Ship&apos;s Photography Archive System
        </h3>
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          isArchiving ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {isArchiving ? '📸 ARCHIVING' : '💤 OFFLINE'}
        </span>
      </div>
      
      <p className="text-sm text-slate-900 mb-4 font-medium bg-slate-100 p-3 rounded-lg border">
        🌊 <strong className="text-slate-900">The Scenario:</strong> Our ship&apos;s photography department 
        continuously processes the same high-resolution images into multiple formats and sizes for 
        &quot;archival purposes.&quot; But the processed images, thumbnails, and data URLs are never cleaned up - 
        they just keep accumulating in memory!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📚</span>
            <div>
              <p className="text-xs text-purple-800 font-semibold">Archived Photos</p>
              <p className="font-bold text-purple-900 text-lg">{archivedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded border-l-4 border-green-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🖼️</span>
            <div>
              <p className="text-xs text-green-800 font-semibold">Thumbnail Cache</p>
              <p className="font-bold text-green-900 text-lg">{thumbnailCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">💾</span>
            <div>
              <p className="text-xs text-blue-800 font-semibold">Data URLs</p>
              <p className="font-bold text-blue-900 text-lg">{dataUrlCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-3 rounded border-l-4 border-red-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚨</span>
            <div>
              <p className="text-xs text-red-800 font-semibold">Memory Used</p>
              <p className="font-bold text-red-900 text-lg">{totalMemoryMB}MB</p>
            </div>
          </div>
        </div>
      </div>

      {recentPhotos.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">📸 Recent Archive Entries:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {recentPhotos.map((photo, index) => (
              <div key={index} className="bg-slate-50 p-2 rounded border text-xs">
                <div className="text-xs text-slate-600 mb-1">{photo.category}</div>
                <div className="text-xs text-slate-800 font-semibold">{photo.variation}</div>
                <div className="text-xs text-slate-500">{photo.processedSize}</div>
                <div className="text-xs text-slate-500">{(photo.fileSize / 1024).toFixed(0)}KB</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-4">
        <button 
          onClick={startArchiving}
          disabled={isArchiving}
          className="px-8 py-4 bg-blue-200 text-blue-900 text-lg font-bold rounded-lg border-3 border-blue-800 shadow-xl hover:bg-blue-300 hover:border-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-200"
        >
          <span className="text-2xl mr-3">📸</span>
          <span className="text-blue-900">Start Photo Archive</span>
        </button>
        
        <button 
          onClick={stopArchiving}
          disabled={!isArchiving}
          className="px-8 py-4 bg-red-200 text-red-900 text-lg font-bold rounded-lg border-3 border-red-800 shadow-xl hover:bg-red-300 hover:border-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-200"
        >
          <span className="text-2xl mr-3">⏹️</span>
          <span className="text-red-900">Stop Archive System</span>
        </button>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-300 shadow-sm">
        <p className="text-sm text-slate-900 font-medium">
          <strong className="text-slate-900">🔬 Technical Details:</strong> This processes your 1.2MB ship image into:
          <br />• <strong className="text-slate-900">6 size variations</strong> per cycle (Original, Large, XLarge, Thumbnail, MediumThumb, Preview)
          <br />• <strong className="text-slate-900">Data URL conversion</strong> for each variation (~33% larger due to base64)
          <br />• <strong className="text-slate-900">Heavy metadata</strong> with location, equipment, and processing history
          <br />• <strong className="text-slate-900">Multiple global arrays</strong> that store everything permanently
          <br /><br />
          <strong className="text-slate-900">💡 The Leak:</strong> Every 3 seconds, we process 5 variations of your 1.2MB image 
          into data URLs with moderate metadata, storing ~15-25MB per cycle. These accumulate forever in global arrays!
          <br /><br />
          <strong className="text-slate-900">🚨 Warning:</strong> This will consume memory steadily - great for heap analysis without crashing!
        </p>
      </div>
    </div>
  );
}
