"use client";

import { useState, useEffect, useRef } from "react";

export default function LeakingEventListeners() {
  const [isListening, setIsListening] = useState(false);
  const [signalCount, setSignalCount] = useState(0);
  const [distressCount, setDistressCount] = useState(0);
  const [weatherCount, setWeatherCount] = useState(0);
  const [navigationCount, setNavigationCount] = useState(0);
  const [lastSignal, setLastSignal] = useState("");
  const rerenderCounter = useRef(0);
  const listenerIdCounter = useRef(0);

  // Global arrays to track our leaking listeners - these never get cleaned up!
  if (typeof window !== 'undefined') {
    window.shipRadioListeners = window.shipRadioListeners || [];
    window.signalLog = window.signalLog || [];
  }

  // Signal types for our maritime communication system
  const signalTypes = {
    distress: [
      "🆘 Mayday! Ship taking on water!",
      "⚠️ Engine failure in rough seas!",
      "🌊 Massive wave incoming!",
      "🔥 Fire in the galley!",
      "⛈️ Storm approaching fast!",
    ],
    weather: [
      "🌤️ Clear skies ahead, fair winds",
      "🌧️ Heavy rain detected on radar",
      "❄️ Ice warning in northern waters",
      "🌪️ Waterspout spotted to starboard",
      "🌫️ Dense fog reducing visibility",
    ],
    navigation: [
      "🧭 Bearing 045° to safe harbor",
      "⚓ Anchorage available at port",
      "🗺️ New shipping lane opened",
      "🚢 Vessel crossing starboard bow",
      "🏝️ Uncharted island discovered",
    ],
    general: [
      "📻 Testing radio communications",
      "🐋 Whale pod sighted off port bow",
      "🏴‍☠️ Suspicious vessel on horizon",
      "🎣 Fishing fleet reports good catch",
      "🌅 Beautiful sunrise over calm seas",
    ]
  };

  const createLeakingListener = (signalType, eventType = 'click') => {
    const listenerId = `${signalType}-listener-${++listenerIdCounter.current}`;
    
    const handler = (event) => {
      // This handler captures the current component state and rerenderCounter
      // creating a closure that prevents garbage collection
      const currentRender = rerenderCounter.current;
      const timestamp = new Date().toISOString();
      
      // Pick a random signal of this type
      const signals = signalTypes[signalType] || signalTypes.general;
      const signal = signals[Math.floor(Math.random() * signals.length)];
      
      // Log the signal globally (more memory usage)
      window.signalLog.push({
        id: listenerId,
        signal,
        timestamp,
        renderCount: currentRender,
        eventType,
        coordinates: {
          x: event.clientX || Math.random() * 1000,
          y: event.clientY || Math.random() * 1000
        },
        // Add some heavy data to make the leak more obvious
        metadata: {
          userAgent: navigator.userAgent,
          screenInfo: {
            width: window.screen.width,
            height: window.screen.height,
            colorDepth: window.screen.colorDepth
          },
          historyData: new Array(50).fill(0).map(() => ({
            entry: Math.random().toString(36),
            timestamp: new Date().toISOString()
          }))
        }
      });
      
      // Update the UI
      setLastSignal(signal);
      setSignalCount(prev => prev + 1);
      
      if (signalType === 'distress') setDistressCount(prev => prev + 1);
      else if (signalType === 'weather') setWeatherCount(prev => prev + 1);
      else if (signalType === 'navigation') setNavigationCount(prev => prev + 1);
      
      console.log(`📻 [${listenerId}] Received: ${signal}`);
    };
    
    // Add listeners to window and document - these will NEVER be removed!
    window.addEventListener(eventType, handler);
    document.addEventListener(eventType, handler);
    
    // Track the listeners globally but don't store removal functions
    window.shipRadioListeners.push({
      id: listenerId,
      type: signalType,
      eventType,
      created: new Date().toISOString(),
      renderCount: rerenderCounter.current,
      // We intentionally DON'T store the handler reference for removal!
    });
    
    console.log(`📡 Installed new radio listener: ${listenerId} (Total: ${window.shipRadioListeners.length})`);
  };

  const startListening = () => {
    console.log("📻 LEAK SCENARIO #5 ACTIVATED: Leaking Event Listeners");
    console.log("🚢 Ship's communication system coming online...");
    
    setIsListening(true);
    
    // Create multiple types of listeners that will leak
    createLeakingListener('distress', 'click');
    createLeakingListener('weather', 'mousemove');
    createLeakingListener('navigation', 'scroll');
    createLeakingListener('general', 'keydown');
    
    // Set up an interval to add more listeners over time
    const intervalId = setInterval(() => {
      if (Math.random() < 0.3) createLeakingListener('distress', 'click');
      if (Math.random() < 0.3) createLeakingListener('weather', 'mousemove');
      if (Math.random() < 0.3) createLeakingListener('navigation', 'scroll');
      if (Math.random() < 0.2) createLeakingListener('general', 'keydown');
      
      console.log(`📡 Radio Status: ${window.shipRadioListeners.length} active listeners, ${window.signalLog.length} signals logged`);
    }, 3000);
    
    // Store interval for cleanup (though listeners won't be cleaned up)
    window.radioInterval = intervalId;
  };

  const stopListening = () => {
    console.log("📻 Stopping radio... but listeners remain active!");
    setIsListening(false);
    
    // Clear the interval but NOT the event listeners - that's the leak!
    if (window.radioInterval) {
      clearInterval(window.radioInterval);
      window.radioInterval = null;
    }
    
    console.log("⚠️ WARNING: Event listeners are still attached and leaking memory!");
  };

  const checkRadioStatus = () => {
    console.log("📡 Radio Communication Status:");
    console.log(`📻 Active Listeners: ${window.shipRadioListeners?.length || 0}`);
    console.log(`📋 Signals Logged: ${window.signalLog?.length || 0}`);
    console.log("⚠️ Note: Listeners are attached to window/document and will never be removed!");
  };

  // Force rerenders to make the closure problem worse
  useEffect(() => {
    rerenderCounter.current++;
    console.log(`🔄 Component rerender #${rerenderCounter.current}`);
  });

  // Cleanup function that DOESN'T clean up the leaked listeners
  useEffect(() => {
    return () => {
      console.log("🚢 Component unmounting but radio listeners remain active (LEAK!)");
      // We intentionally don't remove the event listeners here!
    };
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg border border-slate-300 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📻</span>
        <h3 className="text-lg font-bold text-slate-800">
          Ship&apos;s Radio Communication System
        </h3>
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          isListening ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {isListening ? '📡 RECEIVING' : '📻 OFFLINE'}
        </span>
      </div>
      
      <p className="text-sm text-slate-900 mb-4 font-medium bg-slate-100 p-3 rounded-lg border">
        🌊 <strong className="text-slate-900">The Scenario:</strong> Our ship&apos;s communication system 
        keeps adding new radio listeners for distress calls, weather updates, and navigation signals. 
        But when we turn off the radio, the listeners stay active in the background - they never get removed!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-red-50 p-3 rounded border-l-4 border-red-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🆘</span>
            <div>
              <p className="text-xs text-red-800 font-semibold">Distress Signals</p>
              <p className="font-bold text-red-900 text-lg">{distressCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌤️</span>
            <div>
              <p className="text-xs text-blue-800 font-semibold">Weather Reports</p>
              <p className="font-bold text-blue-900 text-lg">{weatherCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded border-l-4 border-green-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧭</span>
            <div>
              <p className="text-xs text-green-800 font-semibold">Navigation Updates</p>
              <p className="font-bold text-green-900 text-lg">{navigationCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-purple-50 border-l-4 border-purple-600 rounded shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg">📡</span>
          <div>
            <p className="text-xs text-purple-800 font-semibold">Total Signals Received</p>
            <p className="font-bold text-purple-900 text-lg">{signalCount}</p>
          </div>
        </div>
      </div>

      {lastSignal && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Latest Signal:</strong> {lastSignal}
          </p>
        </div>
      )}

            <div className="flex flex-wrap gap-3 mb-4">
        <button 
          onClick={startListening}
          disabled={isListening}
          className="px-8 py-4 bg-green-200 text-green-900 text-lg font-bold rounded-lg border-3 border-green-800 shadow-xl hover:bg-green-300 hover:border-green-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-200"
        >
          <span className="text-2xl mr-3">📡</span>
          <span className="text-green-900">Power Up Radio System</span>
        </button>
        
        <button 
          onClick={stopListening}
          disabled={!isListening}
          className="px-8 py-4 bg-red-200 text-red-900 text-lg font-bold rounded-lg border-3 border-red-800 shadow-xl hover:bg-red-300 hover:border-red-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-200"
        >
          <span className="text-2xl mr-3">📻</span>
          <span className="text-red-900">Turn Off Radio</span>
        </button>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-300 shadow-sm">
        <p className="text-sm text-slate-900 font-medium">
          <strong className="text-slate-900">🔬 Technical Details:</strong> This creates event listeners on window and document for:
          <br />• <strong className="text-slate-900">Click events:</strong> Distress signal detection
          <br />• <strong className="text-slate-900">Mouse events:</strong> Weather monitoring
          <br />• <strong className="text-slate-900">Scroll events:</strong> Navigation updates  
          <br />• <strong className="text-slate-900">Keyboard events:</strong> General communications
          <br /><br />
          <strong className="text-slate-900">💡 The Leak:</strong> Event listeners are never removed, even when the component unmounts. 
          Each listener creates closures that retain component state, preventing garbage collection!
          <br /><br />
          <strong className="text-slate-900">🎯 Interaction:</strong> Click, move mouse, scroll, or press keys to trigger signals and see the leak in action.
        </p>
      </div>
    </div>
  );
}
