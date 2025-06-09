import React, { createContext, useContext, useState } from 'react';

export interface TimelineEntry {
  type: string;
  value: string | number;
  unit: string;
  timestamp: string;
  prescribedBy?: string;
  staffCategory?: string;
  keyedInBy?: string;
}

const TimelineContext = createContext<{
  timeline: TimelineEntry[];
  addEntry: (entry: TimelineEntry) => void;
}>({
  timeline: [],
  addEntry: () => {},
});

export const useTimeline = () => useContext(TimelineContext);

export const TimelineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);

  const addEntry = (entry: TimelineEntry) => {
    setTimeline((prev) => [...prev, entry]);
  };

  return (
    <TimelineContext.Provider value={{ timeline, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}; 