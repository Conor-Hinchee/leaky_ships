🧪 Test Scenarios for Sing✅ 6. Memory-Heavy Images or Data URLs - IMPLEMENTED
• Dynamically load large images or data URLs in memory.
• Don't let the garbage collector release them (e.g., assign to global or component state).
• Feature flag: `memoryHeavyImages` in flags.tsHeap Snapshot Analysis

✅ 1. Uncleared Intervals & Timeouts - IMPLEMENTED
• Create a setInterval or setTimeout that keeps referencing DOM nodes or closures.
• Never call clearInterval or clearTimeout.
• Feature flag: `leakyIntervals` in flags.ts

✅ 2. Detached DOM Nodes - IMPLEMENTED
• Dynamically add DOM nodes to the page.
• Remove them from the DOM (removeChild) but keep references to them in JS (e.g., push to a global array).
• Feature flag: `detachedDOMNodes` in flags.ts

🟠 3. Retained Closures - IMPLEMENTED
• Create closures in event handlers or React hooks that capture large variables.
• Do not unbind or allow unmounting.

✅ 4. Growing Arrays/Maps/Sets - IMPLEMENTED
• Push to a global array/map over time without clearing it.
• Bonus: simulate user activity like opening modals or chat messages.
• Feature flag: `growingCollections` in flags.ts

✅ 5. Leaking Event Listeners - IMPLEMENTED
• Add event listeners to window or document but never remove them.
• Attach them inside a React component that rerenders often.
• Feature flag: `leakingEventListeners` in flags.ts

🟠 6. Memory-Heavy Images or Data URLs - IMPLEMENTED
• Dynamically load large images or data URLs in memory.
• Don’t let the garbage collector release them (e.g., assign to global or component state).

✅ 7. Zombie Components - IMPLEMENTED
• Use React.lazy or dynamic imports and keep mounting new components without unmounting the old ones.
• Simulate navigation between pages that leak fibers.
• Feature flag: `zombieComponents` in flags.ts

🟠 8. Apollo/Redux Cache Flood - IMPLEMENTED
• In a fake GraphQL/Apollo setup, keep querying and pushing to the cache.
• Never evict old cache entries.

✅ 9. WebSocket Subscriptions - IMPLEMENTED
• Open a WebSocket connection in a component and never close it on unmount.
• Retain received messages in an accumulating buffer.
• Feature flag: `webSocketSubscriptions` in flags.ts

🟠 10. Global Accumulation - IMPLEMENTED
• Push user input, animations, or state changes into a global object (window.\_\_leakyStuff = []).
• Never trim or recycle it.
