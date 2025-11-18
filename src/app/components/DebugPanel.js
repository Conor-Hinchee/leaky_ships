"use client";

import { useState, useEffect } from "react";

export default function DebugPanel({ flagValues }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedFlag, setCopiedFlag] = useState(null);
  const [localFlags, setLocalFlags] = useState(flagValues || {});
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Initialize flags from localStorage overrides and server values
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const overrides = JSON.parse(localStorage.getItem('flagOverrides') || '{}');
      const mergedFlags = { ...flagValues, ...overrides };
      setLocalFlags(mergedFlags);
    }
  }, [flagValues]);

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

  const toggleFlag = (flagKey) => {
    const newValue = !localFlags[flagKey];
    
    // Update local state immediately
    setLocalFlags(prev => ({ ...prev, [flagKey]: newValue }));
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      const currentOverrides = JSON.parse(localStorage.getItem('flagOverrides') || '{}');
      currentOverrides[flagKey] = newValue;
      localStorage.setItem('flagOverrides', JSON.stringify(currentOverrides));
    }
    
    // Notify parent component of flag change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('flagChanged', { 
        detail: { flagKey, value: newValue } 
      }));
    }
    
    console.log(`🎛️ Flag ${flagKey} toggled to ${newValue}`);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg hover:bg-slate-700 transition-colors"
      >
        🔧 Debug
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl w-96 max-h-[80vh] flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">
              🚨 Memory Leak Scenarios
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {flagInstructions.map((instruction, index) => (
              <div key={instruction.flag} className="border border-slate-200 dark:border-slate-600 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{instruction.emoji}</span>
                    <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                      #{index + 1}: {instruction.scenario}
                    </h4>
                  </div>
                  <button
                    onClick={() => toggleFlag(instruction.flag)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      localFlags[instruction.flag] 
                        ? 'bg-green-600 dark:bg-green-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    title={`Toggle ${instruction.scenario}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                        localFlags[instruction.flag] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  {instruction.description}
                </p>
                
                <div className={`text-xs px-2 py-1 rounded-full inline-flex items-center mb-2 ${
                  localFlags[instruction.flag]
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    localFlags[instruction.flag] ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                  {localFlags[instruction.flag] ? 'ACTIVE - Component Rendering' : 'INACTIVE - Component Hidden'}
                </div>
                
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
          
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/20 text-xs">
            <div className="flex items-center justify-between">
              <p className="text-blue-800 dark:text-blue-200">
                🎛️ Toggle switches control components instantly - settings saved locally
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem('flagOverrides');
                  setLocalFlags(flagValues);
                  window.location.reload();
                }}
                className="text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-2 py-1 rounded transition-colors"
                title="Reset all flags to default values"
              >
                🔄 Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
