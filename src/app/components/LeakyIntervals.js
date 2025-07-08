"use client";

import { useState, useEffect, useRef } from "react";

export default function LeakyIntervals() {
  const [leakyMessages, setLeakyMessages] = useState([]);
  const [shipPositions, setShipPositions] = useState({});
  const [sonarPings, setSonarPings] = useState(0);
  const intervalRefs = useRef([]);
  const timeoutRefs = useRef([]);

  useEffect(() => {
    console.log("🚨 LEAK SCENARIO #1 ACTIVATED: Uncleared Intervals & Timeouts");

    // 1. Leaky Interval: Ship position updates that never get cleared
    const shipMovementInterval = setInterval(() => {
      const shipId = Math.floor(Math.random() * 1000);
      const newPosition = {
        x: Math.random() * 360, // longitude-ish
        y: Math.random() * 180, // latitude-ish
        course: Math.random() * 360,
        speed: Math.random() * 30,
        timestamp: Date.now()
      };
      
      setShipPositions(prev => ({
        ...prev,
        [shipId]: newPosition
      }));

    }, 2000); // Every 2 seconds

    // 2. Leaky Interval: Sonar pings with closure capturing large data
    const sonarInterval = setInterval(() => {
      const largeDataCapture = {
        oceanData: new Array(1000).fill(0).map(() => ({
          depth: Math.random() * 4000,
          temperature: Math.random() * 30,
          salinity: Math.random() * 40,
          current: Math.random() * 10,
          marine_life: new Array(50).fill(0).map(() => `🐠 Fish ${Math.random()}`)
        })),
        timestamp: Date.now(),
        // Intentionally capturing a snapshot instead of live state to avoid dependency
        capturedPositionsCount: Object.keys(shipPositions).length
      };

      setSonarPings(prev => {
        const newCount = prev + 1;
        
        // Leaky timeout that captures the large data in closure
        const leakyTimeout = setTimeout(() => {
          console.log(`🔊 Sonar ping #${newCount} processed`, {
            dataSize: largeDataCapture.oceanData.length,
            memoryFootprint: JSON.stringify(largeDataCapture).length + " bytes"
          });
          
          // This closure captures largeDataCapture and never gets cleared!
          setLeakyMessages(prevMessages => [
            ...prevMessages,
            {
              id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // More unique ID
              message: `🌊 Deep sea scan #${newCount} - Found ${largeDataCapture.oceanData.length} data points`,
              data: largeDataCapture, // Keeping reference to large data!
              timestamp: new Date().toLocaleTimeString()
            }
          ]);
        }, 3000);

        // Store timeout reference but NEVER clear it (LEAK!)
        timeoutRefs.current.push(leakyTimeout);
        
        return newCount;
      });
    }, 4000); // Every 4 seconds

    // 3. Multiple rapid intervals that accumulate
    for (let i = 0; i < 5; i++) {
      const rapidInterval = setInterval(() => {
        const leakData = {
          intervalId: i,
          randomData: new Array(100).fill(0).map(() => Math.random()),
          timestamp: Date.now(),
          shipStatus: `🚢 Ship ${i} reporting status...`
        };
        
        // Each interval creates its own closure with captured data
        setTimeout(() => {
          console.log(`⚓ Interval ${i} leak:`, leakData.shipStatus);
        }, 1000 + (i * 200));
        
      }, 1500 + (i * 300));
      
      // Store interval reference but NEVER clear it (LEAK!)
      intervalRefs.current.push(rapidInterval);
    }

    // Store main intervals but NEVER clear them (LEAK!)
    intervalRefs.current.push(shipMovementInterval, sonarInterval);

    // Intentionally NOT returning cleanup function!
    // return () => {
    //   intervalRefs.current.forEach(clearInterval);
    //   timeoutRefs.current.forEach(clearTimeout);
    //   intervalRefs.current = [];
    //   timeoutRefs.current = [];
    // };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - runs once on mount - INTENTIONAL FOR MEMORY LEAK

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">🚨</span>
        <h3 className="text-xl font-bold text-red-800 dark:text-red-200">
          LEAK SCENARIO #1: Uncleared Intervals & Timeouts
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white/50 dark:bg-slate-800/50 rounded p-4">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            🗺️ Active Ship Positions: {Object.keys(shipPositions).length}
          </h4>
          <div className="text-sm text-slate-600 dark:text-slate-300 max-h-32 overflow-y-auto">
            {Object.entries(shipPositions).slice(-5).map(([shipId, pos]) => (
              <div key={shipId} className="mb-1">
                🚢 Ship {shipId}: {pos.x.toFixed(1)}°, {pos.y.toFixed(1)}° @ {pos.speed.toFixed(1)} knots
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/50 dark:bg-slate-800/50 rounded p-4">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            🔊 Sonar Pings: {sonarPings}
          </h4>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Active Intervals: {intervalRefs.current.length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Pending Timeouts: {timeoutRefs.current.length}
          </div>
        </div>
      </div>

      <div className="bg-white/50 dark:bg-slate-800/50 rounded p-4">
        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
          📻 Recent Leak Messages ({leakyMessages.length} total):
        </h4>
        <div className="max-h-40 overflow-y-auto text-sm">
          {leakyMessages.slice(-5).map((msg) => (
            <div key={msg.id} className="mb-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="text-slate-700 dark:text-slate-300">{msg.message}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{msg.timestamp}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded border border-red-300 dark:border-red-700">
        <div className="text-sm text-red-700 dark:text-red-300">
          <strong>Memory Leak Pattern:</strong> This component creates intervals and timeouts that are never cleared, and closures that capture large data. These references accumulate in memory and cannot be garbage collected, leading to a memory leak.
        </div>
      </div>
    </div>
  );
}
