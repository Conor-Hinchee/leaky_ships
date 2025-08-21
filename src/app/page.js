import Image from "next/image";
import { testFlag, leakyIntervals, detachedDOMNodes, retainedClosures } from "../../flags";
import ShipGrid from "./components/ShipGrid";
import LeakyIntervals from "./components/LeakyIntervals";
import DetachedDOMNodes from "./components/DetachedDOMNodes";
import RetainedClosures from "./components/RetainedClosures";
import DebugPanel from "./components/DebugPanel";

export default async function Home() {
  // Evaluate test flag on the server
  const isTestFlagOn = await testFlag();
  const isEnabledLeakyIntervals = await leakyIntervals();
  const isEnabledDetachedDOMNodes = await detachedDOMNodes();
  const isEnabledRetainedClosures = await retainedClosures();
  
  // Log to console if flag is on
  if (isTestFlagOn) {
    console.log('hello from flags');
  }

  if (isEnabledLeakyIntervals) {
    console.log('🚨 LEAK SCENARIO #1 FLAG ENABLED - Memory leaks incoming!');
  }

  if (isEnabledDetachedDOMNodes) {
    console.log('🏝️ LEAK SCENARIO #2 FLAG ENABLED - Detached DOM nodes incoming!');
  }

  if (isEnabledRetainedClosures) {
    console.log('🍾 LEAK SCENARIO #3 FLAG ENABLED - Retained closures incoming!');
  }

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

      {/* Leak Scenario #1 - Uncleared Intervals & Timeouts */}
      {isEnabledLeakyIntervals && (
        <div className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <LeakyIntervals />
          </div>
        </div>
      )}

      {/* Leak Scenario #2 - Detached DOM Nodes */}
      {isEnabledDetachedDOMNodes && (
        <div className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <DetachedDOMNodes />
          </div>
        </div>
      )}

      {/* Leak Scenario #3 - Retained Closures */}
      {isEnabledRetainedClosures && (
        <div className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <RetainedClosures />
          </div>
        </div>
      )}

      {/* Ship Grid Component */}
      <ShipGrid />
      
      {/* Debug Panel for toggling leak scenarios */}
      <DebugPanel 
        flagValues={{
          testFlag: isTestFlagOn,
          leakyIntervals: isEnabledLeakyIntervals,
          detachedDOMNodes: isEnabledDetachedDOMNodes,
          retainedClosures: isEnabledRetainedClosures
        }}
      />
    </div>
  );
}
