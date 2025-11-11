"use client";

import { useState, useEffect, useRef } from "react";

export default function WebSocketSubscriptions() {
  const [isConnected, setIsConnected] = useState(false);
  const [totalConnections, setTotalConnections] = useState(0);
  const [messagesReceived, setMessagesReceived] = useState(0);
  const [bufferSize, setBufferSize] = useState(0);
  const [currentActivity, setCurrentActivity] = useState("Monitoring ship communications...");
  const [activeChannels, setActiveChannels] = useState(0);
  const [dataTransmitted, setDataTransmitted] = useState(0);
  
  const connectionCounter = useRef(0);
  const messageCounter = useRef(0);
  const connectInterval = useRef(null);
  const simulationInterval = useRef(null);

  // Initialize our MASSIVE global WebSocket systems
  if (typeof window !== 'undefined') {
    // Global WebSocket connections that NEVER close
    window.__shipWebSockets = window.__shipWebSockets || [];
    
    // Message buffers that accumulate FOREVER
    window.__communicationBuffer = window.__communicationBuffer || {
      fleetCommands: [],
      weatherUpdates: [],
      navigationAlerts: [],
      emergencySignals: [],
      cargoManifests: [],
      crewMessages: [],
      maintenanceReports: [],
      portCommunications: [],
      supplierUpdates: [],
      diplomaticCables: [],
      intelligenceReports: [],
      logisticsData: [],
      operationalStatus: []
    };
    
    // Connection metadata that grows forever
    window.__connectionRegistry = window.__connectionRegistry || [];
    window.__messageArchive = window.__messageArchive || [];
  }

  // Nautical communication channels
  const communicationChannels = [
    { name: "Fleet Command Central", priority: "CRITICAL", frequency: "165.2MHz" },
    { name: "Navigation Control Tower", priority: "HIGH", frequency: "156.8MHz" },
    { name: "Weather Service Maritime", priority: "MEDIUM", frequency: "162.55MHz" },
    { name: "Emergency Rescue Coordination", priority: "CRITICAL", frequency: "121.5MHz" },
    { name: "Port Authority Operations", priority: "HIGH", frequency: "157.1MHz" },
    { name: "Coast Guard Patrol", priority: "HIGH", frequency: "157.175MHz" },
    { name: "Cargo Operations Control", priority: "MEDIUM", frequency: "154.57MHz" },
    { name: "Ship-to-Ship Communications", priority: "LOW", frequency: "156.3MHz" },
    { name: "Crew Welfare Messages", priority: "LOW", frequency: "128.2MHz" },
    { name: "Maintenance Engineering", priority: "MEDIUM", frequency: "149.1MHz" },
    { name: "Intelligence Briefings", priority: "CLASSIFIED", frequency: "142.375MHz" },
    { name: "Diplomatic Communications", priority: "SENSITIVE", frequency: "138.25MHz" }
  ];

  // Generate massive realistic maritime messages
  const generateFleetMessage = (channel) => {
    const messageTypes = {
      "Fleet Command Central": [
        "OPERATIONAL ORDER: All vessels report current position and status immediately",
        "TACTICAL UPDATE: Change formation to delta pattern, maintain 2000m separation",
        "MISSION BRIEFING: Proceed to coordinates 41°24'N 70°35'W for rendezvous",
        "ALERT STATUS: Elevation to DEFCON 3, all crews to battle stations",
        "LOGISTICS REPORT: Fuel consumption analysis and resupply schedule attached"
      ],
      "Navigation Control Tower": [
        "NAVIGATION WARNING: Shallow waters reported in sector 7-Alpha",
        "ROUTE ADJUSTMENT: Recommend course correction 15° starboard due to currents",
        "HAZARD ALERT: Floating debris field detected at coordinates 42°N 71°W",
        "TRAFFIC CONTROL: Hold position while merchant vessel clears shipping lane",
        "DEPTH SOUNDING: Updated bathymetric data for approach to Port Boston"
      ],
      "Weather Service Maritime": [
        "STORM WARNING: Category 2 hurricane approaching from southeast, winds 95 knots",
        "FORECAST UPDATE: Fog bank moving in, visibility reducing to less than 500m",
        "SEVERE WEATHER: Lightning activity reported, all electronics secure for EMP",
        "SEA STATE: Wave heights 4-6 meters, recommend reducing speed to 12 knots",
        "PRESSURE SYSTEM: Rapid barometric drop indicates severe weather incoming"
      ],
      "Emergency Rescue Coordination": [
        "MAYDAY RESPONSE: Vessel in distress at 40°45'N 69°58'W, all units respond",
        "SEARCH AND RESCUE: Missing crew member last seen 0300 hours, coordinate search",
        "MEDICAL EMERGENCY: Urgent helicopter evacuation required for injured sailor",
        "COLLISION ALERT: Two vessels on collision course, immediate evasive action required",
        "FIRE EMERGENCY: Engine room fire on HMS Challenger, assistance requested"
      ],
      "Port Authority Operations": [
        "DOCKING CLEARANCE: Berth 7 available for HMS Victory, tugboat escort assigned",
        "CARGO MANIFEST: Container ship arriving with 2,400 TEU, crane crews standby",
        "CUSTOMS INSPECTION: Random security check required before departure",
        "PILOT SERVICES: Harbor pilot boarding at buoy 12 for channel navigation",
        "QUARANTINE NOTICE: Health inspection required before crew shore leave"
      ]
    };
    
    const messages = messageTypes[channel.name] || [
      `GENERAL COMMUNICATION: ${channel.name} operational status nominal`,
      `ROUTINE UPDATE: All systems functioning within normal parameters`,
      `MAINTENANCE SCHEDULE: Routine inspection completed successfully`,
      `CREW REPORT: All personnel accounted for and in good health`,
      `SUPPLY STATUS: Inventory levels adequate for current operations`
    ];
    
    const baseMessage = messages[Math.floor(Math.random() * messages.length)];
    
    return {
      id: `MSG-${++messageCounter.current}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      channel: channel.name,
      frequency: channel.frequency,
      priority: channel.priority,
      classification: channel.priority === "CLASSIFIED" ? "TOP SECRET" : 
                     channel.priority === "SENSITIVE" ? "CONFIDENTIAL" : "UNCLASSIFIED",
      message: baseMessage,
      sender: {
        callSign: `VESSEL-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`,
        name: `HMS ${Math.random().toString(36).toUpperCase().substring(2, 8)}`,
        position: {
          latitude: (Math.random() - 0.5) * 180,
          longitude: (Math.random() - 0.5) * 360,
          altitude: Math.random() * 100,
          speed: Math.random() * 30,
          heading: Math.random() * 360
        },
        crew: Math.floor(Math.random() * 500) + 50,
        mission: `OPERATION ${Math.random().toString(36).toUpperCase()}`
      },
      recipient: {
        callSign: "FLEET-COMMAND-ALPHA",
        acknowledgmentRequired: channel.priority !== "LOW",
        securityClearance: channel.priority === "CLASSIFIED" ? "TOP SECRET" : "PUBLIC"
      },
      metadata: {
        messageSize: Math.floor(Math.random() * 50000) + 1000,
        encryptionLevel: channel.priority === "CLASSIFIED" ? "AES-256" : "NONE",
        compressionRatio: Math.random(),
        transmissionTime: Math.random() * 5000,
        signalStrength: Math.random() * 100,
        errorRate: Math.random() * 0.01,
        retransmissions: Math.floor(Math.random() * 3),
        routingHops: Math.floor(Math.random() * 8) + 1
      },
      attachments: new Array(Math.floor(Math.random() * 5)).fill(0).map(() => ({
        filename: `${Math.random().toString(36)}.${['pdf', 'doc', 'xls', 'jpg', 'zip'][Math.floor(Math.random() * 5)]}`,
        size: Math.floor(Math.random() * 10000000),
        type: ['document', 'image', 'data', 'chart', 'report'][Math.floor(Math.random() * 5)],
        checksum: Math.random().toString(36),
        encrypted: channel.priority !== "LOW"
      })),
      technicalData: {
        signalAnalysis: new Array(100).fill(0).map(() => Math.random()),
        spectrumData: new Array(256).fill(0).map(() => Math.random()),
        modulationData: new Array(50).fill(0).map(() => Math.random()),
        noiseFloor: Math.random() * -80,
        snrRatio: Math.random() * 40,
        doppler: Math.random() * 100 - 50,
        propagationDelay: Math.random() * 1000
      },
      historicalContext: new Array(25).fill(0).map(() => ({
        relatedMessage: Math.random().toString(36),
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        correlation: Math.random(),
        importance: Math.random()
      }))
    };
  };

  // Create fake WebSocket that accumulates messages FOREVER
  const createLeakyWebSocket = (channel) => {
    // Simulate WebSocket connection
    const fakeWebSocket = {
      id: `WS-${++connectionCounter.current}-${Date.now()}`,
      url: `wss://fleet-communications.navy.mil/channels/${channel.name.replace(/\s+/g, '-').toLowerCase()}`,
      channel: channel,
      readyState: 1, // OPEN
      protocol: "fleet-comm-v2",
      created: new Date().toISOString(),
      lastMessage: null,
      messageCount: 0,
      totalDataReceived: 0,
      
      // Fake methods that don't actually close
      close: () => {
        console.log(`🚫 FAKE CLOSE: WebSocket ${fakeWebSocket.id} close() called but connection remains open!`);
        // Don't actually close - this is the leak!
      },
      
      terminate: () => {
        console.log(`🚫 FAKE TERMINATE: WebSocket ${fakeWebSocket.id} terminate() called but connection persists!`);
        // Don't actually terminate - keep the leak going!
      },
      
      // Simulate message reception
      simulateMessage: () => {
        const message = generateFleetMessage(channel);
        fakeWebSocket.lastMessage = message;
        fakeWebSocket.messageCount++;
        fakeWebSocket.totalDataReceived += JSON.stringify(message).length;
        
        // Store in ALL the global buffers (MASSIVE LEAK!)
        window.__communicationBuffer.fleetCommands.push(message);
        
        // Store in specific channel buffers
        const channelKey = channel.name.toLowerCase().replace(/\s+/g, '');
        if (!window.__communicationBuffer[channelKey]) {
          window.__communicationBuffer[channelKey] = [];
        }
        window.__communicationBuffer[channelKey].push(message);
        
        // Store in message archive with MASSIVE metadata
        window.__messageArchive.push({
          ...message,
          websocketId: fakeWebSocket.id,
          connectionMetadata: {
            uptime: Date.now() - new Date(fakeWebSocket.created).getTime(),
            messagesReceived: fakeWebSocket.messageCount,
            averageMessageSize: fakeWebSocket.totalDataReceived / fakeWebSocket.messageCount,
            connectionQuality: Math.random(),
            latency: Math.random() * 500,
            jitter: Math.random() * 100,
            packetLoss: Math.random() * 0.05,
            bandwidth: Math.random() * 1000000
          },
          processingMetadata: {
            parseTime: Math.random() * 10,
            validationTime: Math.random() * 5,
            storageTime: Math.random() * 15,
            indexingTime: Math.random() * 8,
            compressionRatio: Math.random(),
            memoryUsage: Math.random() * 1000000
          },
          redundantCopies: new Array(5).fill(0).map(() => ({ ...message, copyId: Math.random() }))
        });
        
        return message;
      }
    };
    
    // Store in global registry (NEVER CLEAN UP!)
    window.__shipWebSockets.push(fakeWebSocket);
    window.__connectionRegistry.push({
      websocket: fakeWebSocket,
      created: new Date().toISOString(),
      channel: channel,
      status: 'ACTIVE',
      metadata: {
        userAgent: navigator.userAgent,
        connectionId: fakeWebSocket.id,
        protocolVersion: "fleet-comm-v2",
        securityLevel: channel.priority,
        encryptionEnabled: channel.priority !== "LOW",
        compressionEnabled: true,
        heartbeatInterval: 30000,
        timeoutInterval: 120000,
        maxReconnectAttempts: 999999 // Never give up!
      }
    });
    
    return fakeWebSocket;
  };

  const startWebSocketLeaks = () => {
    console.log("📡 LEAK SCENARIO #9 ACTIVATED: WebSocket Subscriptions");
    console.log("⚓ Ship's Communication Array is now opening endless connections!");
    
    setIsConnected(true);
    setCurrentActivity("🔌 Establishing communication links...");
    
    // Create WebSocket connections for all channels
    communicationChannels.forEach((channel, index) => {
      setTimeout(() => {
        const ws = createLeakyWebSocket(channel);
        console.log(`📡 OPENED: ${channel.name} connection (${ws.id})`);
        
        // Start message simulation for this WebSocket
        const messageInterval = setInterval(() => {
          if (isConnected) {
            const message = ws.simulateMessage();
            setMessagesReceived(prev => prev + 1);
            
            // Update activity display
            if (Math.random() < 0.3) {
              setCurrentActivity(`📻 ${channel.name}: ${message.message.substring(0, 50)}...`);
            }
          }
        }, Math.random() * 2000 + 500); // Random intervals
        
        // Store interval reference (but never clear it!)
        window.__shipWebSockets[window.__shipWebSockets.length - 1].messageInterval = messageInterval;
      }, index * 200); // Stagger connection creation
    });
    
    // Additional connection flood
    connectInterval.current = setInterval(() => {
      // Create additional "backup" connections that also never close
      const randomChannel = communicationChannels[Math.floor(Math.random() * communicationChannels.length)];
      const backupWs = createLeakyWebSocket({
        ...randomChannel,
        name: `${randomChannel.name} (Backup ${Math.floor(Math.random() * 999)})`
      });
      
      console.log(`📡 BACKUP CONNECTION: ${backupWs.channel.name} (${backupWs.id})`);
      
      // Start messages for backup connection too
      const backupInterval = setInterval(() => {
        backupWs.simulateMessage();
        setMessagesReceived(prev => prev + 1);
      }, Math.random() * 3000 + 1000);
      
      backupWs.messageInterval = backupInterval;
      
      setTotalConnections(window.__shipWebSockets.length);
      setActiveChannels(new Set(window.__shipWebSockets.map(ws => ws.channel.name)).size);
    }, 5000); // New backup connection every 5 seconds!
    
    // Update UI stats
    simulationInterval.current = setInterval(() => {
      if (window.__communicationBuffer && window.__messageArchive) {
        const totalMessages = Object.values(window.__communicationBuffer).reduce((sum, buffer) => 
          sum + (Array.isArray(buffer) ? buffer.length : 0), 0);
        
        setBufferSize(totalMessages);
        setTotalConnections(window.__shipWebSockets?.length || 0);
        setActiveChannels(new Set(window.__shipWebSockets?.map(ws => ws.channel.name) || []).size);
        
        // Calculate data transmitted
        const dataSize = JSON.stringify(window.__communicationBuffer).length + 
                        JSON.stringify(window.__messageArchive).length;
        setDataTransmitted(Math.round(dataSize / (1024 * 1024) * 100) / 100);
      }
    }, 1000);
  };

  const stopWebSocketLeaks = () => {
    console.log("📡 Attempting to stop WebSocket connections... but they remain open!");
    setIsConnected(false);
    
    if (connectInterval.current) {
      clearInterval(connectInterval.current);
      connectInterval.current = null;
    }
    
    if (simulationInterval.current) {
      clearInterval(simulationInterval.current);
      simulationInterval.current = null;
    }
    
    // "Attempt" to close all WebSockets (but they don't actually close!)
    window.__shipWebSockets?.forEach(ws => {
      console.log(`🚫 ATTEMPTING TO CLOSE: ${ws.id} - but connection persists!`);
      ws.close(); // This is our fake close that doesn't work!
    });
    
    console.log("⚠️ WARNING: All WebSocket connections remain open and continue accumulating messages!");
    console.log(`📊 Final Stats: ${window.__shipWebSockets?.length || 0} connections, ${window.__messageArchive?.length || 0} messages archived`);
    
    setCurrentActivity("💤 Monitoring dormant... but connections remain active!");
  };

  // Update counters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTotalConnections(window.__shipWebSockets?.length || 0);
      setActiveChannels(new Set(window.__shipWebSockets?.map(ws => ws.channel.name) || []).size);
      
      if (window.__communicationBuffer && window.__messageArchive) {
        const totalMessages = Object.values(window.__communicationBuffer).reduce((sum, buffer) => 
          sum + (Array.isArray(buffer) ? buffer.length : 0), 0);
        setBufferSize(totalMessages);
        setMessagesReceived(window.__messageArchive.length || 0);
        
        const dataSize = JSON.stringify(window.__communicationBuffer).length + 
                        JSON.stringify(window.__messageArchive).length;
        setDataTransmitted(Math.round(dataSize / (1024 * 1024) * 100) / 100);
      }
    }
  }, []);

  // Component cleanup that DOESN'T clean up the WebSockets
  useEffect(() => {
    return () => {
      if (connectInterval.current) {
        clearInterval(connectInterval.current);
      }
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
      
      console.log("📡 WebSocketSubscriptions unmounting but all connections persist forever!");
      console.log(`📊 Persistent connections: ${window.__shipWebSockets?.length || 0} WebSockets, ${window.__messageArchive?.length || 0} messages`);
    };
  }, []);

  return (
    <div className="p-6 bg-slate-900 rounded-lg border border-cyan-600 shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📡</span>
        <h3 className="text-lg font-bold text-cyan-300">
          Ship&apos;s Communication Array - WebSocket Subscriptions
        </h3>
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          isConnected ? 'bg-cyan-100 text-cyan-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {isConnected ? '📡 TRANSMITTING' : '💤 DORMANT'}
        </span>
      </div>
      
      <p className="text-sm text-cyan-200 mb-4 font-medium bg-slate-800 p-3 rounded-lg border border-cyan-700">
        🌊 <strong className="text-cyan-300">The Scenario:</strong> Our ship&apos;s communication array 
        opens WebSocket connections to fleet command, weather services, navigation control, and emergency 
        channels. Connections are NEVER closed and messages accumulate in buffers forever!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-cyan-900 p-3 rounded border-l-4 border-cyan-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔌</span>
            <div>
              <p className="text-xs text-cyan-300 font-semibold">Active Connections</p>
              <p className="font-bold text-cyan-200 text-lg">{totalConnections.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-900 p-3 rounded border-l-4 border-blue-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📻</span>
            <div>
              <p className="text-xs text-blue-300 font-semibold">Messages Received</p>
              <p className="font-bold text-blue-200 text-lg">{messagesReceived.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-900 p-3 rounded border-l-4 border-purple-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">💾</span>
            <div>
              <p className="text-xs text-purple-300 font-semibold">Buffer Size</p>
              <p className="font-bold text-purple-200 text-lg">{bufferSize.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-900 p-3 rounded border-l-4 border-green-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <div>
              <p className="text-xs text-green-300 font-semibold">Active Channels</p>
              <p className="font-bold text-green-200 text-lg">{activeChannels.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-900 p-3 rounded border-l-4 border-orange-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <div>
              <p className="text-xs text-orange-300 font-semibold">Data Transmitted</p>
              <p className="font-bold text-orange-200 text-lg">{dataTransmitted}MB</p>
            </div>
          </div>
        </div>

        <div className="bg-red-900 p-3 rounded border-l-4 border-red-500 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <div>
              <p className="text-xs text-red-300 font-semibold">Current Activity</p>
              <p className="font-bold text-red-200 text-xs">{currentActivity.slice(0, 20)}...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Communication channels display */}
      <div className="mb-4 bg-slate-800 p-4 rounded-lg border border-cyan-600">
        <h4 className="text-cyan-300 font-semibold mb-3">📡 Fleet Communication Channels</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {communicationChannels.slice(0, 8).map((channel, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-slate-700 rounded border border-cyan-700">
              <span className="text-cyan-200">{channel.name}</span>
              <div className="flex gap-2">
                <span className={`px-1 rounded text-xs ${
                  channel.priority === 'CRITICAL' ? 'bg-red-800 text-red-200' :
                  channel.priority === 'HIGH' ? 'bg-orange-800 text-orange-200' :
                  channel.priority === 'CLASSIFIED' ? 'bg-purple-800 text-purple-200' :
                  'bg-gray-800 text-gray-200'
                }`}>
                  {channel.priority}
                </span>
                <span className="text-cyan-400 font-mono">{channel.frequency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <button 
          onClick={startWebSocketLeaks}
          disabled={isConnected}
          className="px-8 py-4 bg-cyan-600 text-white text-lg font-bold rounded-lg border-3 border-cyan-700 shadow-xl hover:bg-cyan-700 hover:border-cyan-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-cyan-600"
        >
          <span className="text-2xl mr-3">📡</span>
          <span>Open Communication Links</span>
        </button>
        
        <button 
          onClick={stopWebSocketLeaks}
          disabled={!isConnected}
          className="px-8 py-4 bg-red-600 text-white text-lg font-bold rounded-lg border-3 border-red-700 shadow-xl hover:bg-red-700 hover:border-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600"
        >
          <span className="text-2xl mr-3">📴</span>
          <span>Close Connections</span>
        </button>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg border border-cyan-600 shadow-sm">
        <p className="text-sm text-cyan-200 font-medium">
          <strong className="text-cyan-300">🔬 Technical Details:</strong> Creates persistent WebSocket connections that never close:
          <br />• <strong className="text-cyan-300">Fleet Channels:</strong> Command, Navigation, Weather, Emergency, Port Authority, Coast Guard
          <br />• <strong className="text-cyan-300">Message Types:</strong> Operational orders, navigation warnings, weather alerts, emergency responses
          <br />• <strong className="text-cyan-300">Message Data:</strong> Each message ~50-200KB with sender position, crew data, technical metadata
          <br />• <strong className="text-cyan-300">Backup Connections:</strong> Creates additional WebSocket connections every 5 seconds
          <br />• <strong className="text-cyan-300">Buffer Accumulation:</strong> All messages stored in multiple global buffers with full metadata
          <br /><br />
          <strong className="text-cyan-300">💡 The Leak:</strong> WebSocket close() and terminate() methods are fake - connections persist forever! 
          Each message includes massive technical data, signal analysis, historical context, and redundant copies. 
          Backup connections are created continuously with independent message intervals.
          <br /><br />
          <strong className="text-cyan-300">🚨 Warning:</strong> Creates ~50-100 messages per second across all channels - massive memory growth!
        </p>
      </div>
    </div>
  );
}
