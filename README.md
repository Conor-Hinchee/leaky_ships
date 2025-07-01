# 🚢 Leaky Ships

Welcome to 🚢 Leaky Ships. Here is what we have to offer:

- Beautiful ships and sailboats showcase
- Interactive fleet gallery with infinite scroll
- Ship status monitoring (because we hate leaky ships!)
- Responsive nautical design
- Maritime-themed user interface
- Celebration of seaworthy vessels

## ⛵ Why We Love Ships

Ships and sailboats represent **freedom**, **adventure**, and the **human spirit**! From the graceful lines of a racing yacht to the sturdy hull of a cargo vessel, each ship tells a story of craftsmanship and purpose.

**But leaky ships?** Ugh, they're the absolute worst! There's nothing more frustrating than a beautiful vessel that can't stay afloat

## 🚨 Memory Leak Scenarios

This application implements various memory leak scenarios behind feature flags for educational purposes. Each scenario can be individually enabled/disabled.

### Leak Scenario #1: Uncleared Intervals & Timeouts ⏰

**What it does:**

- Creates multiple `setInterval` and `setTimeout` calls that are never cleared
- Generates detached DOM nodes that remain in memory
- Uses closures that capture large data objects
- Accumulates references in arrays that never get cleaned up

**How to activate:**

1. Open `flags.ts`
2. Change `leakyIntervals` return value from `false` to `true`
3. Restart the development server (`npm run dev`)
4. The leak scenario will appear on the homepage with live metrics

**What you'll see:**

- A red warning panel showing active memory leaks
- Real-time counters for ship positions, sonar pings, and DOM nodes
- Growing memory usage that never gets cleaned up
- Console logs showing the leak activity

**Memory leak patterns demonstrated:**

- ❌ Uncleared intervals referencing DOM nodes
- ❌ Uncleared timeouts with closure captures
- ❌ Detached DOM nodes kept in memory
- ❌ Growing arrays with accumulated data
- ❌ Multiple rapid intervals creating closures

**For heap analysis:**

- Take a heap snapshot before activating the flag
- Activate the flag and let it run for 2-3 minutes
- Take another heap snapshot
- Compare to see the memory growth patterns

## ⚠️ Important Notice

This application is intentionally designed to develop memory leaks and performance issues. I am building this project to as an example of how my Heap Analysis tool can help identify and fix memory leaks in JavaScript applications. You can find that project [here](https://github.com/moarwaffles/heap-analysis-tool).

- a Next.js web application celebrating our absolute love for sailboats and ships of all kinds!

Built with [Next.js](https://nextjs.org) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS with nautical themes
- **Language**: JavaScript/React
- **Package Manager**: npm/yarn/pnpm/bun
- **Theme**: Maritime and sailing-inspired design
- **Vibes**: Nautical, adventurous, and a bit salty!
