🧪 Test Scenarios for Single Heap Snapshot Analysis

✅ 1. Uncleared Intervals & Timeouts - IMPLEMENTED
• Create a setInterval or setTimeout that keeps referencing DOM nodes or closures.
• Never call clearInterval or clearTimeout.
• Feature flag: `leakyIntervals` in flags.ts

✅ 2. Detached DOM Nodes - IMPLEMENTED
• Dynamically add DOM nodes to the page.
• Remove them from the DOM (removeChild) but keep references to them in JS (e.g., push to a global array).
• Feature flag: `detachedDOMNodes` in flags.ts

🟠 3. Retained Closures
• Create closures in event handlers or React hooks that capture large variables.
• Do not unbind or allow unmounting.

🟠 4. Growing Arrays/Maps/Sets
• Push to a global array/map over time without clearing it.
• Bonus: simulate user activity like opening modals or chat messages.

🟠 5. Leaking Event Listeners
• Add event listeners to window or document but never remove them.
• Attach them inside a React component that rerenders often.

🟠 6. Memory-Heavy Images or Data URLs
• Dynamically load large images or data URLs in memory.
• Don’t let the garbage collector release them (e.g., assign to global or component state).

🟠 7. Zombie Components
• Use React.lazy or dynamic imports and keep mounting new components without unmounting the old ones.
• Simulate navigation between pages that leak fibers.

🟠 8. Apollo/Redux Cache Flood
• In a fake GraphQL/Apollo setup, keep querying and pushing to the cache.
• Never evict old cache entries.

🟠 9. WebSocket Subscriptions
• Open a WebSocket connection in a component and never close it on unmount.
• Retain received messages in an accumulating buffer.

🟠 10. Global Accumulation
• Push user input, animations, or state changes into a global object (window.\_\_leakyStuff = []).
• Never trim or recycle it.
