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
    return true;
  },
});

export const detachedDOMNodes = flag({
  key: 'detached-dom-nodes',
  decide() {
    // Leak Scenario #2: Detached DOM Nodes
    return false;
  },
});
