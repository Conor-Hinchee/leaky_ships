"use client";

import { useState, useRef } from "react";

export default function RetainedClosures() {
  const [bottleCount, setBottleCount] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const retainedClosures = useRef([]);

  // Simulate throwing a bottle (creating a closure that captures a large message)
  function throwBottle() {
    const largeMessage = {
      id: `bottle-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      message: "SOS! ".repeat(10000), // Large payload
      timestamp: new Date().toISOString(),
      coordinates: {
        lat: (Math.random() * 180 - 90).toFixed(5),
        lng: (Math.random() * 360 - 180).toFixed(5)
      }
    };

    // Closure that captures largeMessage
    function bottleClosure() {
      // This closure is never called, just retained
      return largeMessage;
    }

    retainedClosures.current.push(bottleClosure);

    setBottleCount(retainedClosures.current.length);
    setTotalBytes(prev => prev + JSON.stringify(largeMessage).length);
  }

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">🍾</span>
        <h3 className="text-xl font-bold text-red-800 dark:text-red-200">
          LEAK SCENARIO #3: Retained Closures (Message in a Bottle)
        </h3>
      </div>
      <div className="mb-4">
        <button
          onClick={throwBottle}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
        >
          Throw Bottle Into the Sea
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white/50 dark:bg-slate-800/50 rounded p-4">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            🧮 Bottles Thrown: {bottleCount}
          </h4>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Each bottle is a closure capturing a large message.
          </div>
        </div>
        <div className="bg-white/50 dark:bg-slate-800/50 rounded p-4">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            📦 Estimated Memory Retained
          </h4>
          <div className="text-2xl text-blue-700 dark:text-blue-300 font-bold">
            {(totalBytes / 1024).toFixed(1)} KB
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            (Sum of all captured messages)
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded border border-red-300 dark:border-red-700">
        <div className="text-sm text-red-700 dark:text-red-300">
          <strong>Memory Leak Pattern:</strong> Each click creates a closure that captures a large object. These closures are never released, so memory usage grows with every bottle thrown into the sea!
        </div>
      </div>
    </div>
  );
}
