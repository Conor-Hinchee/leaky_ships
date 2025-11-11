"use client";

import { useState, useEffect, useRef } from "react";

export default function GlobalAccumulation() {
  const [isLogging, setIsLogging] = useState(false);
  const [totalLogs, setTotalLogs] = useState(0);
  const [userInteractions, setUserInteractions] = useState(0);
  const [animationFrames, setAnimationFrames] = useState(0);
  const [formEntries, setFormEntries] = useState(0);
  const [systemEvents, setSystemEvents] = useState(0);
  const [currentActivity, setCurrentActivity] = useState("Monitoring crew activity...");
  
  // Form state that will accumulate globally
  const [shipLog, setShipLog] = useState({
    captainName: "",
    currentLocation: "",
    weatherReport: "",
    crewNotes: ""
  });
  
  const animationRef = useRef(null);
  const activityCounter = useRef(0);
  const lastActivityTime = useRef(Date.now());

  // Initialize our MASSIVE global accumulation object
  if (typeof window !== 'undefined') {
    window.__leakyStuff = window.__leakyStuff || {
      shipLogbook: [],
      userInteractions: [],
      mouseMovements: [],
      keyboardActivity: [],
      formInputs: [],
      animationStates: [],
      systemEvents: [],
      activityTimeline: [],
      navigationHistory: [],
      performanceMetrics: [],
      memorySnapshots: [],
      deviceInformation: [],
      sessionData: []
    };
  }

  // Nautical activities for our endless logging
  const nauticalActivities = [
    "🌊 Monitoring wave patterns and sea conditions",
    "⚓ Checking anchor chain for proper deployment", 
    "🧭 Calibrating navigation instruments and compass",
    "🌤️ Recording weather observations and barometer readings",
    "🐟 Cataloging marine life sightings and fish activity",
    "🚢 Inspecting ship hull for damage and wear",
    "⛵ Adjusting sail trim and rigging configuration",
    "📡 Maintaining radio communication equipment",
    "🗺️ Updating charts with new navigational hazards",
    "👥 Conducting crew roll call and duty assignments",
    "⚡ Monitoring electrical systems and power consumption",
    "🔧 Performing routine engine maintenance checks",
    "📦 Inventorying cargo and supply levels",
    "🎣 Deploying fishing nets and checking catch",
    "🌅 Recording sunrise/sunset times for navigation"
  ];

  const logToGlobalAccumulator = (category, data) => {
    if (typeof window === 'undefined') return;
    
    const timestamp = new Date().toISOString();
    const activityId = ++activityCounter.current;
    
    // Create HEAVY log entry with massive metadata
    const logEntry = {
      id: `LOG-${activityId}-${Math.random().toString(36).substr(2, 9)}`,
      category,
      timestamp,
      data,
      sessionId: `SESSION-${Date.now()}`,
      // Add MASSIVE metadata to each log entry
      metadata: {
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        colorDepth: window.screen.colorDepth,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        onlineStatus: navigator.onLine,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        memory: performance.memory ? {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        } : null,
        // Massive activity context
        activityContext: {
          previousActivities: new Array(50).fill(0).map(() => ({
            activity: nauticalActivities[Math.floor(Math.random() * nauticalActivities.length)],
            timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            duration: Math.random() * 3600000,
            participants: new Array(5).fill(0).map(() => `Crew Member ${Math.floor(Math.random() * 100)}`),
            equipment: new Array(10).fill(0).map(() => `Equipment ${Math.random().toString(36)}`),
            results: new Array(20).fill(0).map(() => Math.random().toString(36))
          })),
          environmentalData: {
            windSpeed: Math.random() * 50,
            windDirection: Math.random() * 360,
            waveHeight: Math.random() * 15,
            barometricPressure: 1000 + Math.random() * 50,
            temperature: Math.random() * 40,
            humidity: Math.random() * 100,
            visibility: Math.random() * 20,
            seaState: Math.floor(Math.random() * 10),
            cloudCover: Math.random() * 100,
            precipitationRate: Math.random() * 50
          },
          navigationData: {
            coordinates: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 180],
            speed: Math.random() * 25,
            heading: Math.random() * 360,
            drift: Math.random() * 5,
            depth: Math.random() * 1000,
            nearestPort: `Port ${Math.floor(Math.random() * 100)}`,
            distanceToPort: Math.random() * 500,
            etaToDestination: new Date(Date.now() + Math.random() * 864000000).toISOString()
          }
        },
        // Performance timing data
        performanceMetrics: {
          loadTime: performance.now(),
          domContentLoaded: Math.random() * 5000,
          firstPaint: Math.random() * 3000,
          largestContentfulPaint: Math.random() * 6000,
          cumulativeLayoutShift: Math.random(),
          firstInputDelay: Math.random() * 100,
          memoryUsage: new Array(100).fill(0).map(() => Math.random() * 1000000)
        }
      },
      // Even MORE heavy data
      redundantData: {
        backup1: JSON.stringify(data),
        backup2: JSON.stringify(data),
        backup3: JSON.stringify(data),
        checksums: new Array(25).fill(0).map(() => Math.random().toString(36)),
        archives: new Array(30).fill(0).map(() => ({
          archiveId: Math.random().toString(36),
          compressedData: new Array(100).fill(0).map(() => Math.random()),
          compressionRatio: Math.random(),
          integrity: Math.random().toString(36)
        }))
      }
    };
    
    // Store in ALL the global arrays!
    window.__leakyStuff.shipLogbook.push(logEntry);
    
    // Category-specific storage (MORE LEAKS!)
    switch(category) {
      case 'user-interaction':
        window.__leakyStuff.userInteractions.push(logEntry);
        break;
      case 'mouse-movement':
        window.__leakyStuff.mouseMovements.push(logEntry);
        break;
      case 'keyboard-activity':
        window.__leakyStuff.keyboardActivity.push(logEntry);
        break;
      case 'form-input':
        window.__leakyStuff.formInputs.push(logEntry);
        break;
      case 'animation-frame':
        window.__leakyStuff.animationStates.push(logEntry);
        break;
      case 'system-event':
        window.__leakyStuff.systemEvents.push(logEntry);
        break;
    }
    
    // Always add to activity timeline
    window.__leakyStuff.activityTimeline.push(logEntry);
    
    // Update counters
    setTotalLogs(window.__leakyStuff.shipLogbook.length);
    setUserInteractions(window.__leakyStuff.userInteractions.length);
    setAnimationFrames(window.__leakyStuff.animationStates.length);
    setFormEntries(window.__leakyStuff.formInputs.length);
    setSystemEvents(window.__leakyStuff.systemEvents.length);
  };

  const startLogging = () => {
    console.log("📝 LEAK SCENARIO #10 ACTIVATED: Global Accumulation");
    console.log("⚓ Ship's Endless Logbook is now recording EVERYTHING!");
    
    setIsLogging(true);
    setCurrentActivity(nauticalActivities[Math.floor(Math.random() * nauticalActivities.length)]);
    
    // Mouse movement tracking
    const handleMouseMove = (e) => {
      logToGlobalAccumulator('mouse-movement', {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
        target: e.target.tagName,
        buttons: e.buttons,
        movement: { deltaX: e.movementX, deltaY: e.movementY }
      });
    };
    
    // Click tracking
    const handleClick = (e) => {
      logToGlobalAccumulator('user-interaction', {
        type: 'click',
        x: e.clientX,
        y: e.clientY,
        target: e.target.tagName,
        className: e.target.className,
        id: e.target.id,
        timestamp: Date.now()
      });
    };
    
    // Keyboard tracking
    const handleKeyPress = (e) => {
      logToGlobalAccumulator('keyboard-activity', {
        key: e.key,
        code: e.code,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        timestamp: Date.now(),
        inputType: e.inputType
      });
    };
    
    // Scroll tracking
    const handleScroll = (e) => {
      logToGlobalAccumulator('user-interaction', {
        type: 'scroll',
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        timestamp: Date.now(),
        target: e.target.tagName
      });
    };
    
    // Resize tracking
    const handleResize = () => {
      logToGlobalAccumulator('system-event', {
        type: 'resize',
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
        timestamp: Date.now()
      });
    };
    
    // Focus/blur tracking
    const handleFocus = (e) => {
      logToGlobalAccumulator('user-interaction', {
        type: 'focus',
        target: e.target.tagName,
        timestamp: Date.now()
      });
    };
    
    // Add ALL the event listeners (and never remove them!)
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyPress);
    document.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    document.addEventListener('focus', handleFocus, true);
    document.addEventListener('blur', handleFocus, true);
    
    // Animation frame logging (MASSIVE LEAK!)
    const logAnimationFrame = () => {
      if (isLogging) {
        logToGlobalAccumulator('animation-frame', {
          timestamp: Date.now(),
          performance: performance.now(),
          frameCount: animationFrames + 1,
          randomState: new Array(50).fill(0).map(() => Math.random()),
          activitySnapshot: {
            currentActivity: currentActivity,
            totalLogs: totalLogs,
            memoryEstimate: window.__leakyStuff?.shipLogbook?.length * 1000 || 0
          }
        });
        
        // Change activity occasionally
        if (Math.random() < 0.1) {
          setCurrentActivity(nauticalActivities[Math.floor(Math.random() * nauticalActivities.length)]);
        }
        
        animationRef.current = requestAnimationFrame(logAnimationFrame);
      }
    };
    animationRef.current = requestAnimationFrame(logAnimationFrame);
    
    // Periodic system state logging
    const systemStateInterval = setInterval(() => {
      if (isLogging) {
        logToGlobalAccumulator('system-event', {
          type: 'periodic-state',
          timestamp: Date.now(),
          globalAccumulatorSize: Object.keys(window.__leakyStuff || {}).reduce((sum, key) => 
            sum + (window.__leakyStuff[key]?.length || 0), 0),
          memoryEstimate: performance.memory ? {
            used: performance.memory.usedJSHeapSize,
            total: performance.memory.totalJSHeapSize
          } : null,
          activeTimers: setTimeout(() => {}, 0), // Get timer ID to estimate active timers
          documentStats: {
            elementCount: document.querySelectorAll('*').length,
            scriptCount: document.scripts.length,
            linkCount: document.links.length,
            imageCount: document.images.length
          }
        });
      }
    }, 3000);
    
    // Store intervals globally so they never get cleaned up properly
    window.__leakyStuff.activeIntervals = window.__leakyStuff.activeIntervals || [];
    window.__leakyStuff.activeIntervals.push(systemStateInterval);
  };

  const stopLogging = () => {
    console.log("📝 Stopping new log entries... but all data remains in global accumulator!");
    setIsLogging(false);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Log the final state
    logToGlobalAccumulator('system-event', {
      type: 'logging-stopped',
      timestamp: Date.now(),
      finalCounts: {
        totalLogs: window.__leakyStuff?.shipLogbook?.length || 0,
        userInteractions: window.__leakyStuff?.userInteractions?.length || 0,
        mouseMovements: window.__leakyStuff?.mouseMovements?.length || 0,
        keyboardActivity: window.__leakyStuff?.keyboardActivity?.length || 0,
        formInputs: window.__leakyStuff?.formInputs?.length || 0,
        animationFrames: window.__leakyStuff?.animationStates?.length || 0,
        systemEvents: window.__leakyStuff?.systemEvents?.length || 0
      }
    });
    
    console.log("⚠️ WARNING: All accumulated data remains in window.__leakyStuff forever!");
  };

  const handleFormChange = (field, value) => {
    setShipLog(prev => ({...prev, [field]: value}));
    
    // Log EVERY form change globally
    logToGlobalAccumulator('form-input', {
      field,
      value,
      timestamp: Date.now(),
      formState: {...shipLog, [field]: value},
      changeHistory: window.__leakyStuff?.formInputs?.slice(-10) || []
    });
  };

  // Update counts on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.__leakyStuff) {
      setTotalLogs(window.__leakyStuff.shipLogbook?.length || 0);
      setUserInteractions(window.__leakyStuff.userInteractions?.length || 0);
      setAnimationFrames(window.__leakyStuff.animationStates?.length || 0);
      setFormEntries(window.__leakyStuff.formInputs?.length || 0);
      setSystemEvents(window.__leakyStuff.systemEvents?.length || 0);
    }
  }, []);

  // Component cleanup that DOESN'T clean up the global data
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Add component unmount to global accumulator
      if (typeof window !== 'undefined' && window.__leakyStuff) {
        window.__leakyStuff.systemEvents.push({
          type: 'component-unmount',
          component: 'GlobalAccumulation',
          timestamp: new Date().toISOString(),
          accumulatedDataSize: Object.keys(window.__leakyStuff).reduce((sum, key) => 
            sum + (window.__leakyStuff[key]?.length || 0), 0)
        });
      }
      
      console.log("📝 GlobalAccumulation unmounting but window.__leakyStuff persists forever!");
    };
  }, []);

  return (
    <div className="p-6 bg-slate-900 rounded-lg border border-amber-600 shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📝</span>
        <h3 className="text-lg font-bold text-amber-300">
          Ship&apos;s Endless Logbook - Global Data Accumulator
        </h3>
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          isLogging ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {isLogging ? '📝 LOGGING EVERYTHING' : '💤 DORMANT'}
        </span>
      </div>
      
      <p className="text-sm text-amber-200 mb-4 font-medium bg-slate-800 p-3 rounded-lg border border-amber-700">
        🌊 <strong className="text-amber-300">The Scenario:</strong> Our ship&apos;s logbook records EVERY 
        single user interaction, mouse movement, keyboard press, animation frame, and system event. 
        All data gets stored in <code className="text-amber-400">window.__leakyStuff</code> and is 
        NEVER cleaned up - it just accumulates forever!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-amber-900 p-3 rounded border-l-4 border-amber-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📚</span>
            <div>
              <p className="text-xs text-amber-300 font-semibold">Total Log Entries</p>
              <p className="font-bold text-amber-200 text-lg">{totalLogs.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-900 p-3 rounded border-l-4 border-blue-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🖱️</span>
            <div>
              <p className="text-xs text-blue-300 font-semibold">User Interactions</p>
              <p className="font-bold text-blue-200 text-lg">{userInteractions.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-900 p-3 rounded border-l-4 border-green-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎬</span>
            <div>
              <p className="text-xs text-green-300 font-semibold">Animation Frames</p>
              <p className="font-bold text-green-200 text-lg">{animationFrames.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-900 p-3 rounded border-l-4 border-purple-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📝</span>
            <div>
              <p className="text-xs text-purple-300 font-semibold">Form Entries</p>
              <p className="font-bold text-purple-200 text-lg">{formEntries.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-900 p-3 rounded border-l-4 border-red-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚙️</span>
            <div>
              <p className="text-xs text-red-300 font-semibold">System Events</p>
              <p className="font-bold text-red-200 text-lg">{systemEvents.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-900 p-3 rounded border-l-4 border-orange-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <div>
              <p className="text-xs text-orange-300 font-semibold">Current Activity</p>
              <p className="font-bold text-orange-200 text-xs">{currentActivity.slice(0, 20)}...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive form that logs to global accumulator */}
      <div className="mb-4 bg-slate-800 p-4 rounded-lg border border-amber-600">
        <h4 className="text-amber-300 font-semibold mb-3">📋 Ship&apos;s Log Entry Form (Every keystroke is logged!)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Captain's Name"
            value={shipLog.captainName}
            onChange={(e) => handleFormChange('captainName', e.target.value)}
            className="bg-slate-700 text-amber-200 p-2 rounded border border-amber-600"
          />
          <input
            type="text"
            placeholder="Current Location"
            value={shipLog.currentLocation}
            onChange={(e) => handleFormChange('currentLocation', e.target.value)}
            className="bg-slate-700 text-amber-200 p-2 rounded border border-amber-600"
          />
          <input
            type="text"
            placeholder="Weather Report"
            value={shipLog.weatherReport}
            onChange={(e) => handleFormChange('weatherReport', e.target.value)}
            className="bg-slate-700 text-amber-200 p-2 rounded border border-amber-600"
          />
          <textarea
            placeholder="Crew Notes & Observations"
            value={shipLog.crewNotes}
            onChange={(e) => handleFormChange('crewNotes', e.target.value)}
            className="bg-slate-700 text-amber-200 p-2 rounded border border-amber-600"
            rows={2}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <button 
          onClick={startLogging}
          disabled={isLogging}
          className="px-8 py-4 bg-amber-600 text-slate-900 text-lg font-bold rounded-lg border-3 border-amber-700 shadow-xl hover:bg-amber-700 hover:border-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-600"
        >
          <span className="text-2xl mr-3">📝</span>
          <span className="text-slate-900">Start Global Logging</span>
        </button>
        
        <button 
          onClick={stopLogging}
          disabled={!isLogging}
          className="px-8 py-4 bg-red-600 text-white text-lg font-bold rounded-lg border-3 border-red-700 shadow-xl hover:bg-red-700 hover:border-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600"
        >
          <span className="text-2xl mr-3">⏹️</span>
          <span className="text-white">Stop Logging</span>
        </button>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg border border-amber-600 shadow-sm">
        <p className="text-sm text-amber-200 font-medium">
          <strong className="text-amber-300">🔬 Technical Details:</strong> Records ALL user activity to <code className="text-amber-400">window.__leakyStuff</code>:
          <br />• <strong className="text-amber-300">Mouse Movements:</strong> Every pixel of mouse movement with metadata
          <br />• <strong className="text-amber-300">User Interactions:</strong> Clicks, scrolls, focus events with full context
          <br />• <strong className="text-amber-300">Keyboard Activity:</strong> Every key press and release with timing
          <br />• <strong className="text-amber-300">Animation Frames:</strong> Per-frame state snapshots with performance data
          <br />• <strong className="text-amber-300">Form Inputs:</strong> Every character typed with change history
          <br />• <strong className="text-amber-300">System Events:</strong> Resize, memory usage, DOM statistics
          <br /><br />
          <strong className="text-amber-300">💡 The Leak:</strong> Each log entry includes MASSIVE metadata with navigation data, 
          environmental readings, performance metrics, and redundant backups. Everything accumulates in global arrays forever!
          <br /><br />
          <strong className="text-amber-300">🚨 Warning:</strong> This will create thousands of log entries per minute - the ultimate memory leak!
        </p>
      </div>
    </div>
  );
}
