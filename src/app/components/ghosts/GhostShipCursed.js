"use client";

import { useState, useEffect } from "react";

export default function GhostShipCursed({ shipId, route, onHaunt }) {
  const [hauntLevel, setHauntLevel] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // Create memory-heavy ghost data that will never be cleaned up
  const [ghostData] = useState(() => ({
    shipId,
    route,
    manifestedAt: new Date().toISOString(),
    ghostCrew: new Array(50).fill(0).map((_, i) => ({
      name: `Ghost Sailor ${i}`,
      deathDate: new Date(Date.now() - Math.random() * 100000000).toISOString(),
      unfinishedBusiness: new Array(20).fill(0).map(() => Math.random().toString(36)),
      hauntingMemories: new Array(100).fill(0).map(() => ({
        memory: Math.random().toString(36),
        intensity: Math.random(),
        timestamp: new Date().toISOString()
      }))
    })),
    curseHistory: new Array(30).fill(0).map(() => ({
      curse: `Curse of the ${Math.random().toString(36)}`,
      origin: Math.random().toString(36),
      power: Math.random() * 1000,
      victims: new Array(25).fill(0).map(() => Math.random().toString(36))
    })),
    spectralEnergy: new Array(200).fill(0).map(() => Math.random())
  }));

  useEffect(() => {
    // Haunt more intensely over time
    const hauntInterval = setInterval(() => {
      setHauntLevel(prev => prev + 1);
      
      // Add more ghost data over time
      ghostData.spectralEnergy.push(...new Array(50).fill(0).map(() => Math.random()));
      ghostData.ghostCrew.forEach(ghost => {
        ghost.hauntingMemories.push({
          memory: Math.random().toString(36),
          intensity: Math.random(),
          timestamp: new Date().toISOString()
        });
      });

      if (onHaunt) {
        onHaunt(shipId, hauntLevel + 1);
      }
    }, 2000);

    // Store reference globally to prevent cleanup
    if (typeof window !== 'undefined') {
      window.activeGhostShips = window.activeGhostShips || [];
      window.activeGhostShips.push({
        shipId,
        component: { ghostData, hauntLevel },
        interval: hauntInterval,
        route,
        manifestedAt: new Date().toISOString()
      });
    }

    // DON'T clean up the interval - that's the leak!
    return () => {
      console.log(`👻 Ghost Ship ${shipId} component unmounting but interval remains active!`);
      // Intentionally NOT clearing the interval to create the leak
      // clearInterval(hauntInterval);
    };
  }, [shipId, route, onHaunt, ghostData, hauntLevel]);

  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-purple-600 shadow-lg opacity-80">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">👻</span>
        <h4 className="text-purple-300 font-bold">Ghost Ship #{shipId}</h4>
        <span className="text-xs text-purple-400">Route: {route}</span>
      </div>
      
      <div className="text-sm text-gray-300 mb-2">
        <div>Haunt Level: <span className="text-purple-400 font-bold">{hauntLevel}</span></div>
        <div>Ghost Crew: <span className="text-purple-400">{ghostData.ghostCrew.length}</span></div>
        <div>Active Curses: <span className="text-red-400">{ghostData.curseHistory.length}</span></div>
        <div>Spectral Energy: <span className="text-blue-400">{ghostData.spectralEnergy.length}</span></div>
      </div>
      
      <div className="text-xs text-gray-400">
        Manifested: {new Date(ghostData.manifestedAt).toLocaleTimeString()}
      </div>
      
      {hauntLevel > 10 && (
        <div className="mt-2 text-xs text-red-400 animate-pulse">
          ⚠️ HIGHLY ACTIVE HAUNTING
        </div>
      )}
    </div>
  );
}
