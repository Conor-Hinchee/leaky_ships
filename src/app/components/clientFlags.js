// Client-side safe flag values
// These should match the flags.ts configuration but work in the browser

export const clientFlags = {
  testFlag: {
    key: 'test-flag',
    value: true, // Matches flags.ts
    description: 'A basic test flag for testing the feature flag system'
  },
  leakyIntervals: {
    key: 'leaky-intervals', 
    value: true, // Matches flags.ts
    description: 'Creates memory leaks with uncleared setInterval/setTimeout'
  },
  detachedDOMNodes: {
    key: 'detached-dom-nodes',
    value: true, // Matches flags.ts  
    description: 'Creates memory leaks by creating DOM nodes that become detached'
  }
};

// Helper function to get flag value
export const getFlagValue = (flagName) => {
  return clientFlags[flagName]?.value || false;
};

// Helper function to get flag key
export const getFlagKey = (flagName) => {
  return clientFlags[flagName]?.key || flagName;
};
