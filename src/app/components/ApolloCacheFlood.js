"use client";

import { useState, useEffect, useRef } from "react";

export default function ApolloCacheFlood() {
  const [isFlooding, setIsFlooding] = useState(false);
  const [totalQueries, setTotalQueries] = useState(0);
  const [cacheEntries, setCacheEntries] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [currentOperation, setCurrentOperation] = useState("Monitoring fleet communications...");
  const [activeSubscriptions, setActiveSubscriptions] = useState(0);
  const [reduxStoreSize, setReduxStoreSize] = useState(0);
  
  const queryCounter = useRef(0);
  const cacheFloodInterval = useRef(null);
  const subscriptionInterval = useRef(null);

  // Initialize our MASSIVE global cache systems
  if (typeof window !== 'undefined') {
    // Simulate Apollo GraphQL Cache
    window.__apolloCache = window.__apolloCache || {
      ROOT_QUERY: {},
      shipFleets: {},
      weatherReports: {},
      navigationData: {},
      crewManifests: {},
      cargoInventories: {},
      communicationLogs: {},
      maintenanceRecords: {},
      portSchedules: {},
      supplyChains: {},
      emergencyProtocols: {},
      environmentalData: {},
      performanceMetrics: {},
      historicalData: {}
    };
    
    // Simulate Redux Store
    window.__reduxStore = window.__reduxStore || {
      ships: {},
      users: {},
      navigation: {},
      weather: {},
      communications: {},
      inventory: {},
      maintenance: {},
      analytics: {},
      realTimeData: {},
      subscriptions: {},
      cache: {},
      middleware: {},
      reducers: {}
    };
    
    // Active subscriptions that never get cleaned up
    window.__activeSubscriptions = window.__activeSubscriptions || [];
    window.__queryCache = window.__queryCache || [];
    window.__mutationCache = window.__mutationCache || [];
  }

  // Fake GraphQL operations with MASSIVE payloads
  const generateShipFleetData = (fleetId) => {
    return {
      id: `FLEET-${fleetId}`,
      name: `Naval Fleet ${fleetId}`,
      commander: `Admiral ${Math.random().toString(36)}`,
      establishedDate: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
      homePort: `Port ${Math.floor(Math.random() * 1000)}`,
      currentMission: `Mission ${Math.random().toString(36)}`,
      ships: new Array(50).fill(0).map((_, i) => ({
        id: `SHIP-${fleetId}-${i}`,
        name: `HMS ${Math.random().toString(36).toUpperCase()}`,
        class: ['Destroyer', 'Cruiser', 'Battleship', 'Carrier', 'Submarine'][Math.floor(Math.random() * 5)],
        captain: `Captain ${Math.random().toString(36)}`,
        crew: new Array(200).fill(0).map((_, j) => ({
          id: `CREW-${fleetId}-${i}-${j}`,
          name: `Sailor ${Math.random().toString(36)}`,
          rank: ['Seaman', 'Petty Officer', 'Chief', 'Lieutenant', 'Commander'][Math.floor(Math.random() * 5)],
          department: ['Navigation', 'Engineering', 'Communications', 'Weapons', 'Medical'][Math.floor(Math.random() * 5)],
          experience: Math.floor(Math.random() * 20),
          certifications: new Array(10).fill(0).map(() => Math.random().toString(36)),
          personalHistory: new Array(50).fill(0).map(() => ({
            event: Math.random().toString(36),
            date: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
            location: Math.random().toString(36)
          }))
        })),
        equipment: new Array(100).fill(0).map((_, k) => ({
          id: `EQUIP-${fleetId}-${i}-${k}`,
          type: Math.random().toString(36),
          status: ['Operational', 'Maintenance', 'Repair', 'Upgrade'][Math.floor(Math.random() * 4)],
          manufacturer: Math.random().toString(36),
          installDate: new Date(Date.now() - Math.random() * 63072000000).toISOString(),
          maintenanceHistory: new Array(25).fill(0).map(() => ({
            date: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
            type: Math.random().toString(36),
            technician: Math.random().toString(36),
            cost: Math.random() * 10000,
            notes: new Array(20).fill(0).map(() => Math.random().toString(36)).join(' ')
          }))
        })),
        missionHistory: new Array(100).fill(0).map(() => ({
          missionId: Math.random().toString(36),
          startDate: new Date(Date.now() - Math.random() * 63072000000).toISOString(),
          endDate: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
          objective: new Array(30).fill(0).map(() => Math.random().toString(36)).join(' '),
          outcome: Math.random().toString(36),
          casualties: Math.floor(Math.random() * 10),
          awards: new Array(5).fill(0).map(() => Math.random().toString(36)),
          expenses: Math.random() * 1000000,
          routeData: new Array(1000).fill(0).map(() => ({
            timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            coordinates: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 180],
            speed: Math.random() * 30,
            heading: Math.random() * 360,
            weather: {
              temperature: Math.random() * 40,
              windSpeed: Math.random() * 50,
              waveHeight: Math.random() * 15,
              visibility: Math.random() * 20
            }
          }))
        }))
      })),
      communicationLogs: new Array(1000).fill(0).map(() => ({
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        from: Math.random().toString(36),
        to: Math.random().toString(36),
        type: ['Voice', 'Data', 'Emergency', 'Routine'][Math.floor(Math.random() * 4)],
        content: new Array(100).fill(0).map(() => Math.random().toString(36)).join(' '),
        priority: Math.floor(Math.random() * 5),
        encrypted: Math.random() > 0.5,
        attachments: new Array(10).fill(0).map(() => ({
          filename: Math.random().toString(36),
          size: Math.random() * 1000000,
          type: Math.random().toString(36),
          data: new Array(1000).fill(0).map(() => Math.random())
        }))
      }))
    };
  };

  const generateWeatherData = () => {
    return {
      id: `WEATHER-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      regions: new Array(100).fill(0).map((_, i) => ({
        regionId: `REGION-${i}`,
        coordinates: {
          northeast: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 180],
          southwest: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 180]
        },
        currentConditions: {
          temperature: Math.random() * 50 - 10,
          humidity: Math.random() * 100,
          pressure: 980 + Math.random() * 50,
          windSpeed: Math.random() * 100,
          windDirection: Math.random() * 360,
          cloudCover: Math.random() * 100,
          precipitation: Math.random() * 50,
          visibility: Math.random() * 50,
          uvIndex: Math.random() * 12,
          dewPoint: Math.random() * 30
        },
        forecast: new Array(168).fill(0).map((_, hour) => ({
          hour: hour,
          temperature: Math.random() * 50 - 10,
          humidity: Math.random() * 100,
          pressure: 980 + Math.random() * 50,
          windSpeed: Math.random() * 100,
          windDirection: Math.random() * 360,
          precipitation: Math.random() * 50,
          cloudCover: Math.random() * 100,
          conditions: ['Clear', 'Cloudy', 'Rain', 'Storm', 'Fog'][Math.floor(Math.random() * 5)]
        })),
        alerts: new Array(20).fill(0).map(() => ({
          id: Math.random().toString(36),
          type: ['Storm', 'Hurricane', 'Tsunami', 'High Winds', 'Fog'][Math.floor(Math.random() * 5)],
          severity: Math.floor(Math.random() * 5) + 1,
          description: new Array(50).fill(0).map(() => Math.random().toString(36)).join(' '),
          startTime: new Date(Date.now() + Math.random() * 86400000).toISOString(),
          endTime: new Date(Date.now() + Math.random() * 172800000).toISOString(),
          affectedAreas: new Array(10).fill(0).map(() => Math.random().toString(36))
        }))
      }))
    };
  };

  const floodApolloCache = () => {
    if (typeof window === 'undefined') return;
    
    const operations = [
      'GET_SHIP_FLEETS',
      'GET_WEATHER_DATA', 
      'GET_NAVIGATION_ROUTES',
      'GET_CREW_MANIFESTS',
      'GET_CARGO_INVENTORIES',
      'GET_COMMUNICATION_LOGS',
      'GET_MAINTENANCE_RECORDS',
      'GET_PORT_SCHEDULES',
      'GET_SUPPLY_CHAINS',
      'GET_EMERGENCY_PROTOCOLS',
      'GET_ENVIRONMENTAL_DATA',
      'GET_PERFORMANCE_METRICS',
      'GET_HISTORICAL_RECORDS'
    ];
    
    const currentOp = operations[Math.floor(Math.random() * operations.length)];
    setCurrentOperation(`🌊 Executing ${currentOp}...`);
    
    // Generate MASSIVE cache entries
    const queryId = `${currentOp}_${++queryCounter.current}_${Date.now()}`;
    
    let cacheData;
    if (currentOp.includes('FLEET')) {
      cacheData = generateShipFleetData(queryCounter.current);
    } else if (currentOp.includes('WEATHER')) {
      cacheData = generateWeatherData();
    } else {
      // Generate other massive data structures
      cacheData = {
        id: queryId,
        timestamp: new Date().toISOString(),
        operation: currentOp,
        data: new Array(1000).fill(0).map(() => ({
          id: Math.random().toString(36),
          metadata: new Array(100).fill(0).map(() => ({
            key: Math.random().toString(36),
            value: new Array(50).fill(0).map(() => Math.random()),
            timestamp: new Date().toISOString(),
            source: Math.random().toString(36),
            validation: new Array(25).fill(0).map(() => Math.random().toString(36))
          })),
          payload: new Array(500).fill(0).map(() => Math.random()),
          relationships: new Array(50).fill(0).map(() => ({
            id: Math.random().toString(36),
            type: Math.random().toString(36),
            data: new Array(100).fill(0).map(() => Math.random())
          }))
        }))
      };
    }
    
    // Store in Apollo cache (NEVER EVICT!)
    window.__apolloCache.ROOT_QUERY[queryId] = cacheData;
    
    // Also store in specific cache sections
    if (currentOp.includes('FLEET')) {
      window.__apolloCache.shipFleets[queryId] = cacheData;
    } else if (currentOp.includes('WEATHER')) {
      window.__apolloCache.weatherReports[queryId] = cacheData;
    } else {
      window.__apolloCache[currentOp.toLowerCase().replace(/_/g, '')] = window.__apolloCache[currentOp.toLowerCase().replace(/_/g, '')] || {};
      window.__apolloCache[currentOp.toLowerCase().replace(/_/g, '')][queryId] = cacheData;
    }
    
    // Store in query cache
    window.__queryCache.push({
      id: queryId,
      query: currentOp,
      variables: { fleetId: queryCounter.current, timestamp: Date.now() },
      result: cacheData,
      timestamp: new Date().toISOString(),
      cacheKey: `${currentOp}:${JSON.stringify({ fleetId: queryCounter.current })}`,
      metadata: {
        executionTime: Math.random() * 1000,
        cacheHit: false,
        networkLatency: Math.random() * 500,
        dataSize: JSON.stringify(cacheData).length
      }
    });
    
    // Flood Redux store too!
    const storeKey = `${currentOp}_${Date.now()}_${Math.random()}`;
    window.__reduxStore.cache[storeKey] = {
      action: {
        type: `CACHE_${currentOp}`,
        payload: cacheData,
        meta: {
          timestamp: Date.now(),
          source: 'apollo-cache-flood',
          cachePolicy: 'cache-and-network',
          fetchPolicy: 'no-cache'
        }
      },
      state: cacheData,
      timestamp: new Date().toISOString(),
      stateHistory: new Array(100).fill(0).map(() => ({
        action: Math.random().toString(36),
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        state: new Array(200).fill(0).map(() => Math.random())
      }))
    };
    
    // Add to active subscriptions (NEVER CLEAN UP!)
    window.__activeSubscriptions.push({
      id: `SUB_${Date.now()}_${Math.random()}`,
      query: currentOp,
      variables: { live: true, realTime: true },
      observer: {
        next: () => {}, // Keep references alive!
        error: () => {},
        complete: () => {}
      },
      unsubscribe: () => {}, // Fake unsubscribe that does nothing
      data: cacheData,
      timestamp: new Date().toISOString()
    });
    
    // Update counters
    setTotalQueries(prev => prev + 1);
    setCacheEntries(Object.keys(window.__apolloCache.ROOT_QUERY).length);
    setReduxStoreSize(Object.keys(window.__reduxStore.cache).length);
    setActiveSubscriptions(window.__activeSubscriptions.length);
    
    // Calculate estimated memory usage
    const totalCacheSize = JSON.stringify(window.__apolloCache).length + 
                          JSON.stringify(window.__reduxStore).length +
                          JSON.stringify(window.__activeSubscriptions).length;
    setMemoryUsage(Math.round(totalCacheSize / (1024 * 1024) * 100) / 100);
    
    console.log(`💾 CACHE FLOOD: ${currentOp} -> ${Object.keys(window.__apolloCache.ROOT_QUERY).length} entries, ~${Math.round(totalCacheSize / 1024)}KB`);
  };

  const startCacheFlood = () => {
    console.log("💾 LEAK SCENARIO #8 ACTIVATED: Apollo/Redux Cache Flood");
    console.log("⚓ Ship's Data Warehouse is now flooding with endless queries!");
    
    setIsFlooding(true);
    
    // Aggressive cache flooding
    cacheFloodInterval.current = setInterval(() => {
      // Execute multiple queries per interval
      for (let i = 0; i < 5; i++) {
        setTimeout(() => floodApolloCache(), i * 100);
      }
    }, 1000);
    
    // Subscription flooding
    subscriptionInterval.current = setInterval(() => {
      // Create "live" subscriptions that never end
      const subscriptionOps = [
        'SHIP_POSITIONS_SUBSCRIPTION',
        'WEATHER_UPDATES_SUBSCRIPTION', 
        'COMMUNICATION_FEED_SUBSCRIPTION',
        'EMERGENCY_ALERTS_SUBSCRIPTION'
      ];
      
      subscriptionOps.forEach(op => {
        window.__activeSubscriptions.push({
          id: `LIVE_SUB_${Date.now()}_${Math.random()}`,
          query: op,
          variables: { live: true, realTime: true },
          data: {
            subscription: op,
            timestamp: new Date().toISOString(),
            liveData: new Array(1000).fill(0).map(() => Math.random()),
            metadata: new Array(100).fill(0).map(() => ({
              key: Math.random().toString(36),
              value: new Array(50).fill(0).map(() => Math.random())
            }))
          }
        });
      });
      
      setActiveSubscriptions(window.__activeSubscriptions.length);
    }, 2000);
  };

  const stopCacheFlood = () => {
    console.log("💾 Stopping new cache queries... but all cache data remains forever!");
    setIsFlooding(false);
    
    if (cacheFloodInterval.current) {
      clearInterval(cacheFloodInterval.current);
      cacheFloodInterval.current = null;
    }
    
    if (subscriptionInterval.current) {
      clearInterval(subscriptionInterval.current);
      subscriptionInterval.current = null;
    }
    
    console.log("⚠️ WARNING: Apollo cache, Redux store, and subscriptions never get cleaned up!");
    console.log(`📊 Final Stats: ${Object.keys(window.__apolloCache?.ROOT_QUERY || {}).length} cache entries, ${window.__activeSubscriptions?.length || 0} active subscriptions`);
  };

  // Update counters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCacheEntries(Object.keys(window.__apolloCache?.ROOT_QUERY || {}).length);
      setReduxStoreSize(Object.keys(window.__reduxStore?.cache || {}).length);
      setActiveSubscriptions(window.__activeSubscriptions?.length || 0);
      
      if (window.__apolloCache && window.__reduxStore) {
        const totalSize = JSON.stringify(window.__apolloCache).length + JSON.stringify(window.__reduxStore).length;
        setMemoryUsage(Math.round(totalSize / (1024 * 1024) * 100) / 100);
      }
    }
  }, []);

  // Component cleanup that DOESN'T clean up the caches
  useEffect(() => {
    return () => {
      if (cacheFloodInterval.current) {
        clearInterval(cacheFloodInterval.current);
      }
      if (subscriptionInterval.current) {
        clearInterval(subscriptionInterval.current);
      }
      
      console.log("💾 ApolloCacheFlood unmounting but all caches persist forever!");
      console.log(`📊 Cache persistence: Apollo=${Object.keys(window.__apolloCache?.ROOT_QUERY || {}).length} entries, Redux=${Object.keys(window.__reduxStore?.cache || {}).length} entries`);
    };
  }, []);

  return (
    <div className="p-6 bg-slate-900 rounded-lg border border-blue-600 shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">💾</span>
        <h3 className="text-lg font-bold text-blue-300">
          Ship&apos;s Data Warehouse - Apollo/Redux Cache Flood
        </h3>
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          isFlooding ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {isFlooding ? '🌊 FLOODING' : '💤 DORMANT'}
        </span>
      </div>
      
      <p className="text-sm text-blue-200 mb-4 font-medium bg-slate-800 p-3 rounded-lg border border-blue-700">
        🌊 <strong className="text-blue-300">The Scenario:</strong> Our ship&apos;s data warehouse 
        continuously executes GraphQL queries and mutations, flooding Apollo cache and Redux store 
        with MASSIVE ship fleet data. Cache entries are NEVER evicted - they just accumulate forever!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-900 p-3 rounded border-l-4 border-blue-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔍</span>
            <div>
              <p className="text-xs text-blue-300 font-semibold">Total Queries</p>
              <p className="font-bold text-blue-200 text-lg">{totalQueries.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-900 p-3 rounded border-l-4 border-purple-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">💾</span>
            <div>
              <p className="text-xs text-purple-300 font-semibold">Apollo Cache Entries</p>
              <p className="font-bold text-purple-200 text-lg">{cacheEntries.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-900 p-3 rounded border-l-4 border-green-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🗄️</span>
            <div>
              <p className="text-xs text-green-300 font-semibold">Redux Store Size</p>
              <p className="font-bold text-green-200 text-lg">{reduxStoreSize.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-900 p-3 rounded border-l-4 border-orange-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📡</span>
            <div>
              <p className="text-xs text-orange-300 font-semibold">Active Subscriptions</p>
              <p className="font-bold text-orange-200 text-lg">{activeSubscriptions.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-900 p-3 rounded border-l-4 border-red-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚖️</span>
            <div>
              <p className="text-xs text-red-300 font-semibold">Memory Usage</p>
              <p className="font-bold text-red-200 text-lg">{memoryUsage}MB</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-900 p-3 rounded border-l-4 border-yellow-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚙️</span>
            <div>
              <p className="text-xs text-yellow-300 font-semibold">Current Operation</p>
              <p className="font-bold text-yellow-200 text-xs">{currentOperation.slice(0, 20)}...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <button 
          onClick={startCacheFlood}
          disabled={isFlooding}
          className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-lg border-3 border-blue-700 shadow-xl hover:bg-blue-700 hover:border-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        >
          <span className="text-2xl mr-3">🌊</span>
          <span>Start Cache Flood</span>
        </button>
        
        <button 
          onClick={stopCacheFlood}
          disabled={!isFlooding}
          className="px-8 py-4 bg-red-600 text-white text-lg font-bold rounded-lg border-3 border-red-700 shadow-xl hover:bg-red-700 hover:border-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600"
        >
          <span className="text-2xl mr-3">⏹️</span>
          <span>Stop Flood</span>
        </button>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg border border-blue-600 shadow-sm">
        <p className="text-sm text-blue-200 font-medium">
          <strong className="text-blue-300">🔬 Technical Details:</strong> Simulates Apollo GraphQL + Redux with massive cache flooding:
          <br />• <strong className="text-blue-300">Apollo Cache:</strong> Stores huge ship fleet data with 50 ships × 200 crew × detailed histories
          <br />• <strong className="text-blue-300">GraphQL Queries:</strong> GET_SHIP_FLEETS, GET_WEATHER_DATA, GET_NAVIGATION_ROUTES, etc.
          <br />• <strong className="text-blue-300">Redux Store:</strong> Parallel caching with state history and middleware data
          <br />• <strong className="text-blue-300">Live Subscriptions:</strong> Real-time data feeds that never unsubscribe
          <br />• <strong className="text-blue-300">Weather Data:</strong> 100 regions × 168-hour forecasts × detailed metrics
          <br /><br />
          <strong className="text-blue-300">💡 The Leak:</strong> Each query creates ~500KB-2MB cache entries with ship crews, 
          equipment histories, mission data, weather forecasts, and communication logs. Apollo cache normalization 
          creates duplicate references, and Redux middleware keeps action history forever!
          <br /><br />
          <strong className="text-blue-300">🚨 Warning:</strong> Executes 5 queries per second - will quickly consume hundreds of MB!
        </p>
      </div>
    </div>
  );
}
