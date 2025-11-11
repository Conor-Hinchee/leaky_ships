"use client";

import { useState, useEffect, useRef, lazy, Suspense } from "react";

// Dynamically import ghost ship components - these will create memory leaks!
const GhostShipCursed = lazy(() => import("./ghosts/GhostShipCursed"));
const GhostShipAncient = lazy(() => import("./ghosts/GhostShipAncient"));
const GhostShipPhantom = lazy(() => import("./ghosts/GhostShipPhantom"));

export default function ZombieComponents() {
  const [isFleetActive, setIsFleetActive] = useState(false);
  const [activeShips, setActiveShips] = useState([]);
  const [totalMaterializations, setTotalMaterializations] = useState(0);
  const [currentRoute, setCurrentRoute] = useState("Haunted Harbor");
  const [hauntingActivity, setHauntingActivity] = useState(0);
  const intervalRef = useRef(null);
  const shipIdCounter = useRef(0);

  // Global zombie component registry - these will NEVER be cleaned up!
  if (typeof window !== 'undefined') {
    window.zombieComponentRegistry = window.zombieComponentRegistry || [];
    window.ghostShipMaterializations = window.ghostShipMaterializations || [];
    window.componentGraveyard = window.componentGraveyard || [];
    window.reactFiberLeaks = window.reactFiberLeaks || [];
  }

  // Navigation routes for our ghost fleet
  const ghostRoutes = [
    "Haunted Harbor", "Spectral Straits", "Phantom Port", "Cursed Cove",
    "Ancient Anchorage", "Mystic Marina", "Ethereal Estuary", "Ghostly Gulf",
    "Supernatural Shores", "Wraith Waters", "Banshee Bay", "Poltergeist Port"
  ];

  const ghostShipTypes = [
    { component: GhostShipCursed, type: "Cursed", icon: "👻" },
    { component: GhostShipAncient, type: "Ancient", icon: "🏺" },
    { component: GhostShipPhantom, type: "Phantom", icon: "👤" }
  ];

  const materializeGhostShip = () => {
    const shipType = ghostShipTypes[Math.floor(Math.random() * ghostShipTypes.length)];
    const route = ghostRoutes[Math.floor(Math.random() * ghostRoutes.length)];
    const shipId = ++shipIdCounter.current;
    
    const newShip = {
      id: `ghost-ship-${shipId}`,
      shipId,
      type: shipType.type,
      component: shipType.component,
      icon: shipType.icon,
      route,
      materializedAt: new Date().toISOString(),
      hauntLevel: 0,
      // Heavy component data that will leak
      componentData: {
        props: { shipId, route },
        state: new Array(50).fill(0).map(() => ({
          stateKey: Math.random().toString(36),
          stateValue: new Array(20).fill(0).map(() => Math.random()),
          timestamp: new Date().toISOString()
        })),
        effectCleanupFunctions: new Array(25).fill(0).map(() => ({
          effectId: Math.random().toString(36),
          cleanupData: new Array(30).fill(0).map(() => Math.random().toString(36))
        })),
        eventListeners: new Array(15).fill(0).map(() => ({
          event: Math.random().toString(36),
          handler: Math.random().toString(36),
          target: Math.random().toString(36)
        }))
      }
    };

    // Add to active ships (these accumulate and never get properly removed)
    setActiveShips(prev => [...prev, newShip]);
    setTotalMaterializations(prev => prev + 1);

    // Store in global registries (THE LEAK!)
    window.zombieComponentRegistry.push(newShip);
    window.ghostShipMaterializations.push({
      shipId,
      materializedAt: new Date().toISOString(),
      componentRef: newShip,
      route,
      type: shipType.type
    });
    window.reactFiberLeaks.push({
      componentId: newShip.id,
      fiberData: new Array(100).fill(0).map(() => ({
        nodeType: Math.random().toString(36),
        props: new Array(10).fill(0).map(() => Math.random()),
        state: new Array(15).fill(0).map(() => Math.random()),
        effects: new Array(20).fill(0).map(() => Math.random().toString(36))
      }))
    });

    console.log(`👻 Ghost Ship #${shipId} (${shipType.type}) materialized at ${route}!`);
    console.log(`⚰️ Total zombie components: ${window.zombieComponentRegistry.length}`);
  };

  const startGhostFleet = () => {
    console.log("👻 LEAK SCENARIO #7 ACTIVATED: Zombie Components");
    console.log("⚰️ Ghost Ship Fleet is materializing...");
    
    setIsFleetActive(true);
    setCurrentRoute(ghostRoutes[Math.floor(Math.random() * ghostRoutes.length)]);
    
    // Immediately materialize first ghost ship
    materializeGhostShip();
    
    // Set up interval to continuously materialize more ships
    intervalRef.current = setInterval(() => {
      materializeGhostShip();
      
      // Change route occasionally to simulate navigation
      if (Math.random() < 0.3) {
        setCurrentRoute(ghostRoutes[Math.floor(Math.random() * ghostRoutes.length)]);
      }
      
      // Log ghost fleet status
      if (window.zombieComponentRegistry.length % 5 === 0) {
        console.log(`⚰️ Ghost Fleet Status:
          👻 Active Ships: ${activeShips.length}
          🧟 Zombie Components: ${window.zombieComponentRegistry.length}
          📈 Total Materializations: ${window.ghostShipMaterializations.length}
          🚨 React Fiber Leaks: ${window.reactFiberLeaks.length}`);
      }
    }, 4000); // Materialize new ghost ship every 4 seconds
  };

  const stopGhostFleet = () => {
    console.log("⚰️ Stopping ghost ship materializations... but spirits remain!");
    setIsFleetActive(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    console.log("⚠️ WARNING: Ghost ships and zombie components persist in memory!");
  };

  const handleGhostHaunting = (shipId, hauntLevel) => {
    setHauntingActivity(prev => prev + hauntLevel);
    
    // Update the ship's haunt level in our state (but not removing from arrays)
    setActiveShips(prev => prev.map(ship => 
      ship.shipId === shipId ? { ...ship, hauntLevel } : ship
    ));
  };

  // Component cleanup that DOESN'T clean up properly
  useEffect(() => {
    return () => {
      // We clean up the interval but NOT the zombie components - that's the leak!
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Add the entire component to the graveyard
      if (typeof window !== 'undefined') {
        window.componentGraveyard.push({
          componentName: 'ZombieComponents',
          unmountedAt: new Date().toISOString(),
          activeShipsAtUnmount: activeShips.length,
          totalMaterializationsAtUnmount: totalMaterializations,
          zombieRegistrySize: window.zombieComponentRegistry?.length || 0
        });
      }
      
      console.log("⚰️ ZombieComponents unmounting but all ghost ships remain as zombies!");
    };
  }, [activeShips.length, totalMaterializations]);

  // Update counts when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTotalMaterializations(window.ghostShipMaterializations?.length || 0);
      setHauntingActivity(window.zombieComponentRegistry?.reduce((sum, ship) => sum + (ship.hauntLevel || 0), 0) || 0);
    }
  }, []);

  return (
    <div className="p-6 bg-black rounded-lg border border-purple-600 shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">⚰️</span>
        <h3 className="text-lg font-bold text-purple-300">
          Ghost Ship Fleet - Zombie Component Registry
        </h3>
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          isFleetActive ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {isFleetActive ? '👻 MATERIALIZING' : '💀 DORMANT'}
        </span>
      </div>
      
      <p className="text-sm text-purple-200 mb-4 font-medium bg-gray-900 p-3 rounded-lg border border-purple-700">
        🌊 <strong className="text-purple-300">The Scenario:</strong> Our ghost ship fleet continuously 
        materializes new spectral vessels using React.lazy dynamic imports. Each ship is a separate 
        component that gets mounted but never properly unmounted - they become zombie components 
        that persist in memory forever!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-purple-900 p-3 rounded border-l-4 border-purple-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">👻</span>
            <div>
              <p className="text-xs text-purple-300 font-semibold">Active Ships</p>
              <p className="font-bold text-purple-200 text-lg">{activeShips.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-3 rounded border-l-4 border-gray-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧟</span>
            <div>
              <p className="text-xs text-gray-300 font-semibold">Zombie Components</p>
              <p className="font-bold text-gray-200 text-lg">{totalMaterializations}</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-900 p-3 rounded border-l-4 border-indigo-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📈</span>
            <div>
              <p className="text-xs text-indigo-300 font-semibold">Haunting Activity</p>
              <p className="font-bold text-indigo-200 text-lg">{hauntingActivity}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-900 p-3 rounded border-l-4 border-blue-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧭</span>
            <div>
              <p className="text-xs text-blue-300 font-semibold">Current Route</p>
              <p className="font-bold text-blue-200 text-sm">{currentRoute}</p>
            </div>
          </div>
        </div>
      </div>

      {activeShips.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-purple-300 mb-3">👻 Currently Materialized Ghost Ships:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
            {activeShips.slice(-9).map((ship) => (
              <Suspense key={ship.id} fallback={
                <div className="bg-gray-800 p-4 rounded border border-gray-600 animate-pulse">
                  <div className="text-gray-400">Materializing ghost ship...</div>
                </div>
              }>
                <ship.component 
                  shipId={ship.shipId}
                  route={ship.route}
                  onHaunt={handleGhostHaunting}
                />
              </Suspense>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-4">
        <button 
          onClick={startGhostFleet}
          disabled={isFleetActive}
          className="px-8 py-4 bg-purple-600 text-white text-lg font-bold rounded-lg border-3 border-purple-700 shadow-xl hover:bg-purple-700 hover:border-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-600"
        >
          <span className="text-2xl mr-3">👻</span>
          <span className="text-white">Materialize Ghost Fleet</span>
        </button>
        
        <button 
          onClick={stopGhostFleet}
          disabled={!isFleetActive}
          className="px-8 py-4 bg-gray-600 text-white text-lg font-bold rounded-lg border-3 border-gray-700 shadow-xl hover:bg-gray-700 hover:border-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-600"
        >
          <span className="text-2xl mr-3">⚰️</span>
          <span className="text-white">Stop Materializations</span>
        </button>
      </div>

      <div className="bg-gray-900 p-4 rounded-lg border border-purple-700 shadow-sm">
        <p className="text-sm text-purple-200 font-medium">
          <strong className="text-purple-300">🔬 Technical Details:</strong> Uses React.lazy to dynamically import ghost ship components:
          <br />• <strong className="text-purple-300">Dynamic Imports:</strong> Each ship type loads via lazy loading
          <br />• <strong className="text-purple-300">Component Accumulation:</strong> Ships mount but never properly unmount
          <br />• <strong className="text-purple-300">React Fiber Leaks:</strong> Component trees persist in memory
          <br />• <strong className="text-purple-300">Global Registry:</strong> References prevent garbage collection
          <br /><br />
          <strong className="text-purple-300">💡 The Leak:</strong> Every 4 seconds, we materialize a new ghost ship component 
          with heavy data. Components accumulate in arrays and never get cleaned up, creating zombie components!
          <br /><br />
          <strong className="text-purple-300">👻 Ghost Types:</strong> Cursed Ships, Ancient Vessels, and Phantom Ships - each with unique haunting patterns!
        </p>
      </div>
    </div>
  );
}
