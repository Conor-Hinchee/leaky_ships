import { flag } from 'flags/next';

export const testFlag = flag({
  key: 'test-flag',
  decide() {
    return false;
  },
});

export const leakyIntervals = flag({
  key: 'leaky-intervals',
  decide() {
    // Leak Scenario #1: Uncleared Intervals & Timeouts
    return false;
  },
});

export const detachedDOMNodes = flag({
  key: 'detached-dom-nodes',
  decide() {
    // Leak Scenario #2: Detached DOM Nodes
    return false;
  },
});

export const retainedClosures = flag({
  key: 'retained-closures',
  decide() {
    // Leak Scenario #3: Retained Closures
    return false;
  },
});

export const growingCollections = flag({
  key: 'growing-collections',
  decide() {
    // Leak Scenario #4: Growing Arrays/Maps/Sets
    return false;
  },
});

export const leakingEventListeners = flag({
  key: 'leaking-event-listeners',
  decide() {
    // Leak Scenario #5: Leaking Event Listeners
    return false;
  },
});

export const memoryHeavyImages = flag({
  key: 'memory-heavy-images',
  decide() {
    // Leak Scenario #6: Memory-Heavy Images or Data URLs
    return false;
  },
});

export const zombieComponents = flag({
  key: 'zombie-components',
  decide() {
    // Leak Scenario #7: Zombie Components
    return false;
  },
});

export const apolloCacheFlood = flag({
  key: 'apollo-cache-flood',
  decide() {
    // Leak Scenario #8: Apollo/Redux Cache Flood
    return false;
  },
});

export const webSocketSubscriptions = flag({
  key: 'websocket-subscriptions',
  decide() {
    // Leak Scenario #9: WebSocket Subscriptions
    return true;
  },
});

export const globalAccumulation = flag({
  key: 'global-accumulation',
  decide() {
    // Leak Scenario #10: Global Accumulation
    return false;
  },
});


