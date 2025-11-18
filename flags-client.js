// Client-side flag definitions (no async_hooks dependency)
export const testFlag = () => {
  return Promise.resolve(false);
};

export const leakyIntervals = () => {
  return Promise.resolve(true);
};

export const detachedDOMNodes = () => {
  return Promise.resolve(true);
};

export const retainedClosures = () => {
  return Promise.resolve(true);
};

export const growingCollections = () => {
  return Promise.resolve(true);
};

export const leakingEventListeners = () => {
  return Promise.resolve(true);
};

export const memoryHeavyImages = () => {
  return Promise.resolve(true);
};

export const zombieComponents = () => {
  return Promise.resolve(true);
};

export const apolloCacheFlood = () => {
  return Promise.resolve(true);
};

export const webSocketSubscriptions = () => {
  return Promise.resolve(true);
};

export const globalAccumulation = () => {
  return Promise.resolve(false);
};