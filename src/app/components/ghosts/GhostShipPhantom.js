"use client";

import { useState, useEffect } from "react";

export default function GhostShipPhantom({ shipId, route, onHaunt }) {
  const [phantomEnergy, setPhantomEnergy] = useState(0);
  const [manifestations, setManifestations] = useState(0);

  // Create phantom ship data with heavy memory footprint
  const [phantomData] = useState(() => ({
    shipId,
    route,
    phantomCaptain: {
      name: `Captain ${Math.random().toString(36)}`,
      lastWords: new Array(100).fill(0).map(() => Math.random().toString(36)),
      unfinishedVoyages: new Array(35).fill(0).map(() => ({
        destination: Math.random().toString(36),
        cargo: new Array(25).fill(0).map(() => Math.random().toString(36)),
        purpose: Math.random().toString(36),
        mysteriousEvents: new Array(15).fill(0).map(() => ({
          event: Math.random().toString(36),
          witnesses: new Array(10).fill(0).map(() => Math.random().toString(36))
        }))
      }))
    },
    phantomCargo: new Array(80).fill(0).map(() => ({
      item: `Phantom ${Math.random().toString(36)}`,
      origin: Math.random().toString(36),
      destination: Math.random().toString(36),
      ghostlyProperties: new Array(30).fill(0).map(() => ({
        property: Math.random().toString(36),
        manifestation: Math.random().toString(36),
        intensity: Math.random() * 1000
      }))
    })),
    ectoplasmicTrails: new Array(150).fill(0).map(() => Math.random())
  }));

  useEffect(() => {
    const phantomInterval = setInterval(() => {
      setPhantomEnergy(prev => prev + 3);
      setManifestations(prev => prev + 1);
      
      // Add more phantom manifestations
      phantomData.ectoplasmicTrails.push(...new Array(30).fill(0).map(() => Math.random()));
      phantomData.phantomCargo.forEach(cargo => {
        cargo.ghostlyProperties.push({
          property: Math.random().toString(36),
          manifestation: Math.random().toString(36),
          intensity: Math.random() * 1500
        });
      });

      if (onHaunt) {
        onHaunt(shipId, phantomEnergy + 3);
      }
    }, 1800);

    // Add to phantom registry
    if (typeof window !== 'undefined') {
      window.phantomFleet = window.phantomFleet || [];
      window.phantomFleet.push({
        shipId,
        phantomData,
        energy: phantomEnergy,
        manifestations,
        interval: phantomInterval,
        route
      });
    }

    // Let phantom persist in memory
    return () => {
      console.log(`👤 Phantom Ship ${shipId} vanishing but essence lingers in memory!`);
      // Intentionally NOT clearing interval
    };
  }, [shipId, route, onHaunt, phantomData, phantomEnergy]);

  return (
    <div className="bg-indigo-900 p-4 rounded-lg border border-blue-500 shadow-lg opacity-75">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">👤</span>
        <h4 className="text-blue-300 font-bold">Phantom Ship #{shipId}</h4>
        <span className="text-xs text-indigo-400">Route: {route}</span>
      </div>
      
      <div className="text-sm text-blue-200 mb-2">
        <div>Phantom Energy: <span className="text-blue-400 font-bold">{phantomEnergy}</span></div>
        <div>Manifestations: <span className="text-cyan-400">{manifestations}</span></div>
        <div>Phantom Cargo: <span className="text-blue-400">{phantomData.phantomCargo.length}</span></div>
        <div>Ectoplasmic Trails: <span className="text-purple-400">{phantomData.ectoplasmicTrails.length}</span></div>
      </div>
      
      <div className="text-xs text-indigo-400">
        Captain: {phantomData.phantomCaptain.name}
      </div>
      
      {phantomEnergy > 30 && (
        <div className="mt-2 text-xs text-cyan-400 animate-pulse">
          👻 FULL MANIFESTATION ACHIEVED
        </div>
      )}
    </div>
  );
}
