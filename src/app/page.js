"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function Home() {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  // Array of ship-related items to display (memoized to prevent re-creation)
  const shipItems = useMemo(() => [
    { emoji: "⛵", name: "Sailboat", status: "Sailing smoothly" },
    { emoji: "🚢", name: "Cruise Ship", status: "Minor leak detected" },
    { emoji: "🛥️", name: "Speedboat", status: "Going fast, no leaks" },
    { emoji: "🚤", name: "Motor Boat", status: "Engine running hot" },
    { emoji: "⛴️", name: "Ferry", status: "Passengers aboard" },
    { emoji: "🛳️", name: "Passenger Ship", status: "Smooth sailing" },
    { emoji: "🚁", name: "Coast Guard Helicopter", status: "Monitoring for leaks" },
    { emoji: "🏊", name: "Swimmer", status: "Avoiding the leaky ships" },
  ], []);

  const loadMoreShips = useCallback(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newShips = Array.from({ length: 8 }, (_, index) => {
        const shipIndex = (page * 8 + index) % shipItems.length;
        const baseShip = shipItems[shipIndex];
        const uniqueId = Date.now() + index; // Ensure truly unique IDs
        
        return {
          id: uniqueId,
          emoji: baseShip.emoji,
          name: `${baseShip.name} #${Math.floor(uniqueId / 1000)}`,
          status: baseShip.status,
          fleetNumber: page * 8 + index + 1,
        };
      });
      
      setShips(prevShips => [...prevShips, ...newShips]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    }, 500);
  }, [page, shipItems]);

  // Initial load
  useEffect(() => {
    if (ships.length === 0) {
      loadMoreShips();
    }
  }, [ships.length, loadMoreShips]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000 &&
        !loading
      ) {
        loadMoreShips();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadMoreShips]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <main className="flex flex-col items-center gap-8 text-center">
          <Image
            src="/sailboat.svg"
            alt="Sailboat"
            width={120}
            height={120}
            className="mb-4 filter drop-shadow-lg"
            priority
          />
          
          <h1 className="text-6xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            🚢 Leaky Ships
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-md">
            Welcome aboard! This ship might have a few leaks, but that&apos;s all part of the adventure.
          </p>
          
          <div className="mt-8 text-sm text-slate-500 dark:text-slate-400">
            ⚠️ Warning: Memory leaks ahead!
          </div>
          
          <div className="mt-4 text-sm text-slate-400 dark:text-slate-500 animate-bounce">
            ↓ Scroll down to see more ships ↓
          </div>
        </main>
      </div>

      {/* Infinite Scroll Content */}
      <div className="px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-8">
            Fleet Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ships.map((ship) => (
              <div
                key={ship.id}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-3 text-center">{ship.emoji}</div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                  {ship.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {ship.status}
                </p>
                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  Fleet #: {ship.fleetNumber} | Ship ID: #{ship.id}
                </div>
              </div>
            ))}
          </div>
          
          {loading && (
            <div className="flex justify-center items-center mt-8 p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-slate-600 dark:text-slate-300">
                Loading more ships...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
