"use client";

import { useState, useEffect } from "react";

export default function GhostShipAncient({ shipId, route, onHaunt }) {
  const [spectralPower, setSpectralPower] = useState(0);
  const [ancientSecrets, setAncientSecrets] = useState([]);

  // Create ancient maritime ghost data
  const [ancientData] = useState(() => ({
    shipId,
    route,
    sunkDate: new Date(Date.now() - Math.random() * 500000000).toISOString(),
    lostTreasure: new Array(40).fill(0).map(() => ({
      treasure: `Ancient ${Math.random().toString(36)}`,
      value: Math.random() * 100000,
      curse: Math.random().toString(36),
      guardianSpirits: new Array(15).fill(0).map(() => ({
        spirit: Math.random().toString(36),
        power: Math.random() * 500,
        domain: Math.random().toString(36)
      }))
    })),
    ancientCrew: new Array(60).fill(0).map(() => ({
      rank: `Ancient ${Math.random().toString(36)}`,
      yearsLost: Math.floor(Math.random() * 500),
      ancientKnowledge: new Array(30).fill(0).map(() => Math.random().toString(36)),
      mysticalAbilities: new Array(20).fill(0).map(() => ({
        ability: Math.random().toString(36),
        strength: Math.random() * 1000
      }))
    })),
    forgottenRituals: new Array(25).fill(0).map(() => ({
      ritual: Math.random().toString(36),
      purpose: Math.random().toString(36),
      incantations: new Array(50).fill(0).map(() => Math.random().toString(36))
    }))
  }));

  useEffect(() => {
    const ancientHauntInterval = setInterval(() => {
      setSpectralPower(prev => prev + 2);
      
      // Generate new ancient secrets
      const newSecret = {
        secret: Math.random().toString(36),
        discovered: new Date().toISOString(),
        mysticalPower: Math.random() * 2000,
        relatedArtifacts: new Array(10).fill(0).map(() => Math.random().toString(36))
      };
      
      setAncientSecrets(prev => [...prev, newSecret]);
      
      // Add more ancient data
      ancientData.lostTreasure.push({
        treasure: `Newly Manifested ${Math.random().toString(36)}`,
        value: Math.random() * 200000,
        curse: Math.random().toString(36),
        guardianSpirits: new Array(20).fill(0).map(() => ({
          spirit: Math.random().toString(36),
          power: Math.random() * 1000,
          domain: Math.random().toString(36)
        }))
      });

      if (onHaunt) {
        onHaunt(shipId, spectralPower + 2);
      }
    }, 2500);

    // Store in global ghost registry
    if (typeof window !== 'undefined') {
      window.ancientGhostFleet = window.ancientGhostFleet || [];
      window.ancientGhostFleet.push({
        shipId,
        ancientData,
        spectralPower,
        ancientSecrets,
        interval: ancientHauntInterval,
        route
      });
    }

    // DON'T clean up - let the ancient spirits persist!
    return () => {
      console.log(`🏺 Ancient Ghost Ship ${shipId} fading but spirits remain eternal!`);
      // Intentionally NOT clearing interval
    };
  }, [shipId, route, onHaunt, ancientData, spectralPower]);

  return (
    <div className="bg-amber-900 p-4 rounded-lg border border-yellow-600 shadow-lg opacity-85">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🏺</span>
        <h4 className="text-yellow-300 font-bold">Ancient Vessel #{shipId}</h4>
        <span className="text-xs text-amber-400">Route: {route}</span>
      </div>
      
      <div className="text-sm text-amber-200 mb-2">
        <div>Spectral Power: <span className="text-yellow-400 font-bold">{spectralPower}</span></div>
        <div>Lost Treasure: <span className="text-yellow-400">{ancientData.lostTreasure.length}</span></div>
        <div>Ancient Crew: <span className="text-amber-400">{ancientData.ancientCrew.length}</span></div>
        <div>Secrets Revealed: <span className="text-orange-400">{ancientSecrets.length}</span></div>
      </div>
      
      <div className="text-xs text-amber-400">
        Lost: {new Date(ancientData.sunkDate).toLocaleDateString()}
      </div>
      
      {spectralPower > 20 && (
        <div className="mt-2 text-xs text-orange-400 animate-pulse">
          ⚡ ANCIENT POWER AWAKENING
        </div>
      )}
    </div>
  );
}
