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
    return true;
  },
});
