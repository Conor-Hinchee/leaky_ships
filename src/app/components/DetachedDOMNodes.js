"use client";

import { useState, useEffect, useRef } from "react";

export default function DetachedDOMNodes() {
  const [detachedNodeCount, setDetachedNodeCount] = useState(0);
  const [islandPositions, setIslandPositions] = useState({});
  const [treasureCount, setTreasureCount] = useState(0);
  const detachedNodesRefs = useRef([]);
  const intervalRefs = useRef([]);

  useEffect(() => {
    console.log('🏝️ DETACHED DOM NODES LEAK ACTIVATED - Creating islands that never disappear from memory!');
    
    // Interval that creates DOM nodes, removes them from DOM, but keeps references
    const createDetachedIslandsInterval = setInterval(() => {
      const islandId = `island-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Create a complex DOM structure for an island
      const islandContainer = document.createElement('div');
      islandContainer.className = 'hidden-island-container';
      islandContainer.setAttribute('data-island-id', islandId);
      
      // Add nested elements to make it more memory-heavy
      const islandHeader = document.createElement('h3');
      islandHeader.textContent = `🏝️ Treasure Island ${islandId}`;
      
      const treasureList = document.createElement('ul');
      for (let i = 0; i < 10; i++) {
        const treasure = document.createElement('li');
        treasure.textContent = `💎 Treasure ${i + 1}: ${Math.random().toString(36).substr(2, 12)}`;
        treasure.setAttribute('data-treasure-value', Math.floor(Math.random() * 1000));
        treasureList.appendChild(treasure);
      }
      
      const coordinates = document.createElement('div');
      const x = Math.random() * 1000;
      const y = Math.random() * 1000;
      coordinates.textContent = `Coordinates: ${x.toFixed(2)}, ${y.toFixed(2)}`;
      
      // Build the island structure
      islandContainer.appendChild(islandHeader);
      islandContainer.appendChild(coordinates);
      islandContainer.appendChild(treasureList);
      
      // Add to DOM first
      document.body.appendChild(islandContainer);
      
      // Update state
      setIslandPositions(prev => ({
        ...prev,
        [islandId]: { x, y, treasures: 10 }
      }));
      
      // Keep reference to the DOM node (MEMORY LEAK!)
      detachedNodesRefs.current.push(islandContainer);
      
      // Remove from DOM after a short delay but keep JS reference (DETACHED DOM LEAK!)
      setTimeout(() => {
        if (islandContainer.parentNode) {
          islandContainer.parentNode.removeChild(islandContainer);
        }
        // islandContainer reference still exists in detachedNodesRefs.current!
        // This creates a detached DOM node that can't be garbage collected
      }, 500);
      
      // Update counters
      setDetachedNodeCount(detachedNodesRefs.current.length);
      setTreasureCount(prev => prev + 10);
      
    }, 3000); // Create a new detached island every 3 seconds
    
    // Store interval reference
    intervalRefs.current.push(createDetachedIslandsInterval);
    
    // Additional interval for more aggressive detached node creation
    const rapidDetachedNodesInterval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        const quickNode = document.createElement('span');
        quickNode.className = 'quick-detached-node';
        quickNode.textContent = `⚓ Quick Node ${Date.now()}-${i}`;
        quickNode.setAttribute('data-timestamp', Date.now());
        
        document.body.appendChild(quickNode);
        detachedNodesRefs.current.push(quickNode);
        
        // Remove from DOM immediately but keep reference
        setTimeout(() => {
          if (quickNode.parentNode) {
            quickNode.parentNode.removeChild(quickNode);
          }
        }, 50);
      }
      
      setDetachedNodeCount(detachedNodesRefs.current.length);
    }, 1000); // Every second, create 5 quick detached nodes
    
    intervalRefs.current.push(rapidDetachedNodesInterval);
    
    // INTENTIONALLY NO CLEANUP - This is a memory leak demonstration!
    // In a real app, you would return a cleanup function:
    // return () => {
    //   intervalRefs.current.forEach(clearInterval);
    //   detachedNodesRefs.current = [];
    // };
    
  }, []); // Empty dependency array - runs once on mount - INTENTIONAL FOR MEMORY LEAK

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl">🏝️</div>
        <div>
          <h2 className="text-xl font-bold text-red-700 dark:text-red-300">
            Detached DOM Nodes Memory Leak
          </h2>
          <p className="text-sm text-red-600 dark:text-red-400">
            Creating islands that disappear from view but never leave memory
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-200 dark:border-red-700">
          <div className="text-lg font-semibold text-red-700 dark:text-red-300">
            Detached DOM Nodes
          </div>
          <div className="text-2xl font-bold text-red-800 dark:text-red-200">
            {detachedNodeCount}
          </div>
          <div className="text-xs text-red-500 dark:text-red-400">
            Nodes removed from DOM but kept in memory
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-200 dark:border-red-700">
          <div className="text-lg font-semibold text-red-700 dark:text-red-300">
            Treasure Islands Created
          </div>
          <div className="text-2xl font-bold text-red-800 dark:text-red-200">
            {Object.keys(islandPositions).length}
          </div>
          <div className="text-xs text-red-500 dark:text-red-400">
            Complex DOM structures leaked
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-200 dark:border-red-700">
          <div className="text-lg font-semibold text-red-700 dark:text-red-300">
            Total Treasures Lost
          </div>
          <div className="text-2xl font-bold text-red-800 dark:text-red-200">
            💎 {treasureCount}
          </div>
          <div className="text-xs text-red-500 dark:text-red-400">
            Nested elements in detached nodes
          </div>
        </div>
      </div>
      
      <div className="text-sm text-red-600 dark:text-red-400 space-y-1">
        <div>❌ <strong>Detached DOM Leak:</strong> DOM nodes removed from page but references kept in JS arrays</div>
        <div>❌ <strong>Complex Structures:</strong> Each island contains multiple nested elements</div>
        <div>❌ <strong>Rapid Creation:</strong> New detached nodes created every second</div>
        <div>❌ <strong>No Cleanup:</strong> References accumulate indefinitely</div>
      </div>
      
      <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded border border-red-300 dark:border-red-700">
        <div className="text-sm text-red-700 dark:text-red-300">
          <strong>Memory Leak Pattern:</strong> This component creates DOM elements, adds them to the page, 
          then removes them from the DOM tree but keeps JavaScript references to them. 
          These &quot;detached&quot; DOM nodes can&apos;t be garbage collected and accumulate in memory.
        </div>
      </div>
    </div>
  );
}
