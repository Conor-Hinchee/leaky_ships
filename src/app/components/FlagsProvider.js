"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const FlagContext = createContext();

export const useFlagsClient = () => {
  const context = useContext(FlagContext);
  if (!context) {
    throw new Error('useFlagsClient must be used within a FlagsProvider');
  }
  return context;
};

export const FlagsProvider = ({ children, initialFlags }) => {
  const [flags, setFlags] = useState(initialFlags || {});

  useEffect(() => {
    // Load localStorage overrides
    if (typeof window !== 'undefined') {
      const overrides = JSON.parse(localStorage.getItem('flagOverrides') || '{}');
      const mergedFlags = { ...initialFlags, ...overrides };
      setFlags(mergedFlags);
    }

    // Listen for flag changes from debug panel
    const handleFlagChange = (event) => {
      const { flagKey, value } = event.detail;
      setFlags(prev => ({ ...prev, [flagKey]: value }));
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('flagChanged', handleFlagChange);
      return () => window.removeEventListener('flagChanged', handleFlagChange);
    }
  }, [initialFlags]);

  return (
    <FlagContext.Provider value={flags}>
      {children}
    </FlagContext.Provider>
  );
};