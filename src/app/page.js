import Image from "next/image";
import { testFlag, leakyIntervals, detachedDOMNodes, retainedClosures, growingCollections, leakingEventListeners, memoryHeavyImages, zombieComponents, globalAccumulation, apolloCacheFlood, webSocketSubscriptions } from "../../flags";
import ShipGrid from "./components/ShipGrid";
import LeakyIntervals from "./components/LeakyIntervals";
import DetachedDOMNodes from "./components/DetachedDOMNodes";
import RetainedClosures from "./components/RetainedClosures";
import GrowingCollections from "./components/GrowingCollections";
import LeakingEventListeners from "./components/LeakingEventListeners";
import MemoryHeavyImages from "./components/MemoryHeavyImages";
import ZombieComponents from "./components/ZombieComponents";
import GlobalAccumulation from "./components/GlobalAccumulation";
import ApolloCacheFlood from "./components/ApolloCacheFlood";
import WebSocketSubscriptions from "./components/WebSocketSubscriptions";
import DebugPanel from "./components/DebugPanel";

export default async function Home() {
  // Evaluate test flag on the server
  const isTestFlagOn = await testFlag();
  const isEnabledLeakyIntervals = await leakyIntervals();
  const isEnabledDetachedDOMNodes = await detachedDOMNodes();
  const isEnabledRetainedClosures = await retainedClosures();
  const isEnabledGrowingCollections = await growingCollections();
  const isEnabledLeakingEventListeners = await leakingEventListeners();
  const isEnabledMemoryHeavyImages = await memoryHeavyImages();
  const isEnabledZombieComponents = await zombieComponents();
  const isEnabledGlobalAccumulation = await globalAccumulation();
  const isEnabledApolloCacheFlood = await apolloCacheFlood();
  const isEnabledWebSocketSubscriptions = await webSocketSubscriptions();
  
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

  if (isEnabledGrowingCollections) {
    console.log('🚢 LEAK SCENARIO #4 FLAG ENABLED - Growing collections incoming!');
  }

  if (isEnabledLeakingEventListeners) {
    console.log('📻 LEAK SCENARIO #5 FLAG ENABLED - Leaking event listeners incoming!');
  }

  if (isEnabledMemoryHeavyImages) {
    console.log('📸 LEAK SCENARIO #6 FLAG ENABLED - Memory-heavy images incoming!');
  }

  if (isEnabledZombieComponents) {
    console.log('👻 LEAK SCENARIO #7 FLAG ENABLED - Zombie components incoming!');
  }

  if (isEnabledGlobalAccumulation) {
    console.log('📝 LEAK SCENARIO #10 FLAG ENABLED - Global accumulation incoming!');
  }

  if (isEnabledApolloCacheFlood) {
    console.log('💾 LEAK SCENARIO #8 FLAG ENABLED - Apollo/Redux cache flood incoming!');
  }

  if (isEnabledWebSocketSubscriptions) {
    console.log('📡 LEAK SCENARIO #9 FLAG ENABLED - WebSocket subscriptions incoming!');
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

      {/* Leak Scenario #4 - Growing Collections */}
      {isEnabledGrowingCollections && (
        <div className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <GrowingCollections />
          </div>
        </div>
      )}

      {/* Leak Scenario #5 - Leaking Event Listeners */}
      {isEnabledLeakingEventListeners && (
        <div className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <LeakingEventListeners />
          </div>
        </div>
      )}

      {/* Leak Scenario #6 - Memory Heavy Images */}
      {isEnabledMemoryHeavyImages && (
        <div className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <MemoryHeavyImages />
          </div>
        </div>
      )}

      {/* Leak Scenario #7 - Zombie Components */}
      {isEnabledZombieComponents && (
        <div className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <ZombieComponents />
          </div>
        </div>
      )}

      {/* Leak Scenario #8 - Apollo/Redux Cache Flood */}
      {isEnabledApolloCacheFlood && (
        <div className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <ApolloCacheFlood />
          </div>
        </div>
      )}

      {/* Leak Scenario #9 - WebSocket Subscriptions */}
      {isEnabledWebSocketSubscriptions && (
        <div className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <WebSocketSubscriptions />
          </div>
        </div>
      )}

      {/* Leak Scenario #10 - Global Accumulation */}
      {isEnabledGlobalAccumulation && (
        <div className="px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <GlobalAccumulation />
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
          retainedClosures: isEnabledRetainedClosures,
          growingCollections: isEnabledGrowingCollections,
          leakingEventListeners: isEnabledLeakingEventListeners,
          memoryHeavyImages: isEnabledMemoryHeavyImages,
          zombieComponents: isEnabledZombieComponents,
          apolloCacheFlood: isEnabledApolloCacheFlood,
          webSocketSubscriptions: isEnabledWebSocketSubscriptions,
          globalAccumulation: isEnabledGlobalAccumulation
        }}
      />
    </div>
  );
}
