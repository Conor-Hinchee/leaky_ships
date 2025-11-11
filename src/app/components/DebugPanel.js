"use client";

import { useState } from "react";

export default function DebugPanel({ flagValues }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedFlag, setCopiedFlag] = useState(null);

  const flagInstructions = [
    {
      flag: "testFlag",
      scenario: "Test Flag",
      description: "A basic test flag for testing the feature flag system",
      emoji: "🧪",
      key: "test-flag"
    },
    {
      flag: "leakyIntervals",
      scenario: "Uncleared Intervals & Timeouts",
      description: "Creates memory leaks with uncleared setInterval/setTimeout",
      emoji: "⏰",
      key: "leaky-intervals"
    },
    {
      flag: "detachedDOMNodes", 
      scenario: "Detached DOM Nodes",
      description: "Creates memory leaks by creating DOM nodes that become detached",
      emoji: "🔗",
      key: "detached-dom-nodes"
    },
    {
      flag: "retainedClosures",
      scenario: "Retained Closures",
      description: "Creates memory leaks by retaining closures that capture large variables",
      emoji: "🍾",
      key: "retained-closures"
    },
    {
      flag: "growingCollections",
      scenario: "Growing Collections",
      description: "Creates memory leaks with ever-growing arrays, maps, sets and objects",
      emoji: "🚢",
      key: "growing-collections"
    },
    {
      flag: "leakingEventListeners",
      scenario: "Leaking Event Listeners",
      description: "Creates memory leaks by adding event listeners that are never removed",
      emoji: "📻",
      key: "leaking-event-listeners"
    },
    {
      flag: "memoryHeavyImages",
      scenario: "Memory-Heavy Images",
      description: "Creates memory leaks by processing large images into data URLs that accumulate",
      emoji: "📸",
      key: "memory-heavy-images"
    },
    {
      flag: "zombieComponents",
      scenario: "Zombie Components",
      description: "Creates memory leaks by mounting React components that never properly unmount",
      emoji: "👻",
      key: "zombie-components"
    },
    {
      flag: "apolloCacheFlood",
      scenario: "Apollo/Redux Cache Flood",
      description: "Creates memory leaks by flooding Apollo cache and Redux store with massive GraphQL query results",
      emoji: "💾",
      key: "apollo-cache-flood"
    },
    {
      flag: "webSocketSubscriptions",
      scenario: "WebSocket Subscriptions",
      description: "Creates memory leaks by opening WebSocket connections that never close and accumulating messages forever",
      emoji: "📡",
      key: "websocket-subscriptions"
    },
    {
      flag: "globalAccumulation",
      scenario: "Global Accumulation",
      description: "Creates memory leaks by accumulating all user interactions and data in window.__leakyStuff",
      emoji: "📝",
      key: "global-accumulation"
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg hover:bg-slate-700 transition-colors"
      >
        🔧 Debug
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-4 w-96">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3">
            🚨 Memory Leak Scenarios
          </h3>
          
          <div className="space-y-3">
            {flagInstructions.map((instruction, index) => (
              <div key={instruction.flag} className="border border-slate-200 dark:border-slate-600 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{instruction.emoji}</span>
                    <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                      #{index + 1}: {instruction.scenario}
                    </h4>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-mono ${
                    flagValues?.[instruction.flag] 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  }`}>
                    {flagValues?.[instruction.flag] ? 'ON' : 'OFF'}
                  </div>
                </div>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  {instruction.description}
                </p>
                
                <div className="bg-slate-100 dark:bg-slate-700 rounded p-2 text-xs font-mono">
                  <div className="text-slate-500 dark:text-slate-400 mb-1 mt-2 flex items-center justify-between">
                    <span>Flag Key: <code>{instruction.key}</code></span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(instruction.key);
                        setCopiedFlag(instruction.flag);
                        setTimeout(() => setCopiedFlag(null), 2000);
                      }}
                      className={`ml-2 px-2 py-1 text-xs rounded transition-colors ${
                        copiedFlag === instruction.flag 
                          ? 'bg-green-200 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                          : 'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500'
                      }`}
                      title={copiedFlag === instruction.flag ? 'Copied!' : 'Copy flag key'}
                    >
                      {copiedFlag === instruction.flag ? '✓' : '📋'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded text-xs">
            <p className="text-yellow-800 dark:text-yellow-200">
              ⚠️ Toggle flags in <code>flags.ts</code> then refresh the page
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
