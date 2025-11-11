"use client";

import { useState, useEffect, useRef } from "react";

// Global leaky collections - these will persist across component unmounts!
if (typeof window !== 'undefined') {
  // Ship's Cargo Manifest (Growing Array)
  window.shipCargoManifest = window.shipCargoManifest || [];
  
  // Navigation Log Entries (Growing Map) 
  window.shipNavigationLog = window.shipNavigationLog || new Map();
  
  // Crew Registry (Growing Set)
  window.shipCrewRegistry = window.shipCrewRegistry || new Set();
  
  // Treasure Hoard (Growing Object)
  window.treasureHoard = window.treasureHoard || {};
}

export default function GrowingCollections() {
  const [cargoCount, setCargoCount] = useState(0);
  const [logEntries, setLogEntries] = useState(0);
  const [crewCount, setCrewCount] = useState(0);
  const [treasureCount, setTreasureCount] = useState(0);
  const [isActivelyLeaking, setIsActivelyLeaking] = useState(false);
  const intervalRef = useRef(null);

  // Cargo types for our manifest
  const cargoTypes = [
    "🏺 Ancient Pottery", "⚱️ Mysterious Urns", "💎 Precious Gems", 
    "🗿 Stone Idols", "📜 Old Maps", "⚔️ Antique Swords",
    "🪙 Gold Coins", "🏖️ Sand Samples", "🐚 Rare Shells",
    "🦀 Exotic Crabs", "🐟 Preserved Fish", "⚓ Ship Parts"
  ];

  const crewRoles = [
    "🧑‍✈️ Captain", "👨‍🔧 Engineer", "👩‍🍳 Cook", "🧑‍⚕️ Medic",
    "👨‍🎨 Navigator", "👩‍🔬 Marine Biologist", "🧑‍🏫 Quartermaster", 
    "👨‍💼 First Mate", "👩‍🎤 Lookout", "🧑‍🎸 Shanty Singer"
  ];

  const treasureTypes = [
    "Golden Doubloons", "Silver Pieces of Eight", "Ruby Necklaces",
    "Emerald Rings", "Diamond Tiaras", "Sapphire Brooches",
    "Pearl Strands", "Amber Artifacts", "Ivory Carvings", "Jade Figurines"
  ];

  const startLeaking = () => {
    console.log("🚨 LEAK SCENARIO #4 ACTIVATED: Growing Arrays/Maps/Sets");
    console.log("⚓ Ship is now taking on memory water! Collections growing...");
    
    setIsActivelyLeaking(true);
    
    intervalRef.current = setInterval(() => {
      // 1. Growing Array - Ship's Cargo Manifest
      const newCargo = {
        item: cargoTypes[Math.floor(Math.random() * cargoTypes.length)],
        quantity: Math.floor(Math.random() * 100) + 1,
        value: Math.floor(Math.random() * 10000) + 100,
        origin: `Port ${Math.floor(Math.random() * 50) + 1}`,
        timestamp: new Date().toISOString(),
        // Add some bulk data to make it memory-heavy
        metadata: {
          inspectionReport: new Array(20).fill(0).map((_, i) => `Inspection note ${i}: ${Math.random().toString(36)}`),
          certificates: new Array(10).fill(0).map((_, i) => ({ 
            id: `CERT-${Math.random().toString(36).substr(2, 9)}`,
            data: new Array(50).fill(Math.random().toString(36))
          }))
        }
      };
      window.shipCargoManifest.push(newCargo);
      setCargoCount(window.shipCargoManifest.length);

      // 2. Growing Map - Navigation Log Entries
      const logId = `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const logEntry = {
        coordinates: {
          lat: (Math.random() - 0.5) * 180,
          lng: (Math.random() - 0.5) * 360
        },
        weather: {
          windSpeed: Math.random() * 40,
          waveHeight: Math.random() * 15,
          visibility: Math.random() * 10,
          temperature: Math.random() * 30 + 10
        },
        observations: new Array(15).fill(0).map(() => `Observation: ${Math.random().toString(36)}`),
        timestamp: new Date().toISOString(),
        // Heavy data to simulate real navigation logs
        radarData: new Array(100).fill(0).map(() => ({
          bearing: Math.random() * 360,
          distance: Math.random() * 50,
          signature: new Array(20).fill(0).map(() => Math.random())
        }))
      };
      window.shipNavigationLog.set(logId, logEntry);
      setLogEntries(window.shipNavigationLog.size);

      // 3. Growing Set - Crew Registry
      const crewMember = {
        id: `CREW-${Math.random().toString(36).substr(2, 9)}`,
        name: `Sailor ${Math.floor(Math.random() * 1000)}`,
        role: crewRoles[Math.floor(Math.random() * crewRoles.length)],
        joinDate: new Date().toISOString(),
        // Personal data that makes the object heavier
        personalFile: {
          experience: new Array(30).fill(0).map(() => `Experience entry: ${Math.random().toString(36)}`),
          certifications: new Array(10).fill(0).map(() => ({ 
            name: `Cert ${Math.random().toString(36)}`,
            data: new Array(25).fill(Math.random().toString(36))
          })),
          medicalHistory: new Array(20).fill(0).map(() => `Medical record: ${Math.random().toString(36)}`)
        }
      };
      // Using JSON.stringify to create a unique string key for the Set
      window.shipCrewRegistry.add(JSON.stringify(crewMember));
      setCrewCount(window.shipCrewRegistry.size);

      // 4. Growing Object - Treasure Hoard
      const treasureId = `TREASURE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      window.treasureHoard[treasureId] = {
        type: treasureTypes[Math.floor(Math.random() * treasureTypes.length)],
        value: Math.floor(Math.random() * 50000) + 1000,
        discoveryLocation: `Chest at ${Math.random() * 360}°, ${Math.random() * 180}°`,
        discoveryDate: new Date().toISOString(),
        // Heavy authentication and provenance data
        provenance: new Array(25).fill(0).map((_, i) => ({
          previousOwner: `Owner ${i}: ${Math.random().toString(36)}`,
          transferDate: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
          documentation: new Array(15).fill(0).map(() => Math.random().toString(36))
        })),
        appraisal: {
          images: new Array(10).fill(0).map(() => `data:image/fake;base64,${new Array(1000).fill('A').join('')}`),
          reports: new Array(5).fill(0).map(() => new Array(100).fill(Math.random().toString(36)))
        }
      };
      setTreasureCount(Object.keys(window.treasureHoard).length);

      // Log the current memory load every 10 items
      if (window.shipCargoManifest.length % 10 === 0) {
        console.log(`⚓ Memory Status Report:
          📦 Cargo Items: ${window.shipCargoManifest.length}
          📋 Log Entries: ${window.shipNavigationLog.size}  
          👥 Crew Members: ${window.shipCrewRegistry.size}
          💰 Treasure Items: ${Object.keys(window.treasureHoard).length}
          🚨 Total Memory Load: Growing steadily!`);
      }
    }, 1000); // Add new items every second
  };

  const stopLeaking = () => {
    console.log("🛑 Stopping the leak... but data remains in memory!");
    setIsActivelyLeaking(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const checkMemoryStatus = () => {
    console.log("🔍 Current Memory Status:");
    console.log("📦 Cargo Manifest:", window.shipCargoManifest?.length || 0, "items");
    console.log("📋 Navigation Log:", window.shipNavigationLog?.size || 0, "entries");
    console.log("👥 Crew Registry:", window.shipCrewRegistry?.size || 0, "members");  
    console.log("💰 Treasure Hoard:", Object.keys(window.treasureHoard || {}).length, "treasures");
  };

  // Update counts when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCargoCount(window.shipCargoManifest?.length || 0);
      setLogEntries(window.shipNavigationLog?.size || 0);
      setCrewCount(window.shipCrewRegistry?.size || 0);
      setTreasureCount(Object.keys(window.treasureHoard || {}).length);
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
        <span className="text-2xl">🚢</span>
        <h3 className="text-lg font-bold text-slate-800">
          Growing Collections Leak - The Overloaded Ship
        </h3>
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          isActivelyLeaking ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {isActivelyLeaking ? '🚨 ACTIVELY LEAKING' : '⏸️ PAUSED'}
        </span>
      </div>
      
      <p className="text-sm text-slate-900 mb-4 font-medium bg-slate-100 p-3 rounded-lg border">
        🌊 <strong className="text-slate-900">The Scenario:</strong> Our ship is on an endless voyage, continuously collecting cargo, 
        logging navigation entries, hiring crew, and discovering treasure. But the ship never reaches port 
        to unload - everything just keeps accumulating in memory!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-amber-50 p-3 rounded border-l-4 border-amber-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📦</span>
            <div>
              <p className="text-xs text-amber-800 font-semibold">Cargo Manifest</p>
              <p className="font-bold text-amber-900 text-lg">{cargoCount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded border-l-4 border-green-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📋</span>
            <div>
              <p className="text-xs text-green-800 font-semibold">Navigation Log</p>
              <p className="font-bold text-green-900 text-lg">{logEntries.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">👥</span>
            <div>
              <p className="text-xs text-purple-800 font-semibold">Crew Registry</p>
              <p className="font-bold text-purple-900 text-lg">{crewCount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">💰</span>
            <div>
              <p className="text-xs text-yellow-800 font-semibold">Treasure Hoard</p>
              <p className="font-bold text-yellow-900 text-lg">{treasureCount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <button 
          onClick={startLeaking}
          disabled={isActivelyLeaking}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg border-2 border-red-700 shadow-lg hover:bg-red-700 hover:border-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600"
        >
          ⚓ Set Sail & Load Cargo
        </button>
        
        <button 
          onClick={stopLeaking}
          disabled={!isActivelyLeaking}
          className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg border-2 border-orange-700 shadow-lg hover:bg-orange-700 hover:border-orange-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-600"
        >
          🛑 Drop Anchor
        </button>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-300 shadow-sm">
        <p className="text-sm text-slate-900 font-medium">
          <strong className="text-slate-900">🔬 Technical Details:</strong> This creates four growing global collections:
          <br />• <strong className="text-slate-900">Array:</strong> Ship cargo manifest with heavy metadata
          <br />• <strong className="text-slate-900">Map:</strong> Navigation log with radar data  
          <br />• <strong className="text-slate-900">Set:</strong> Crew registry with personal files
          <br />• <strong className="text-slate-900">Object:</strong> Treasure hoard with provenance data
          <br /><br />
          <strong className="text-slate-900">💡 The Leak:</strong> These collections grow infinitely and persist globally, 
          never getting garbage collected even when components unmount!
        </p>
      </div>
    </div>
  );
}
