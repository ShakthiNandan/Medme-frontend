// src/components/ManualIntubated.tsx
import React, { useState, useEffect, useRef } from 'react';
import './ManualIntubated.css';

interface TimelineEvent {
  time: string;
  event: string;
}

const ManualIntubated: React.FC = () => {
  // Status can be: 'IDLE' (not started), 'ACTIVE' (running), 'HOLD' (paused), 'ENDED' (finished)
  const [status, setStatus] = useState<'IDLE' | 'ACTIVE' | 'HOLD' | 'ENDED'>('IDLE');

  // Timers and counters
  const [timeCounter, setTimeCounter] = useState(120); // 120-second active phase
  const [breakCounter, setBreakCounter] = useState(10); // 10-second break
  const [lapCounter, setLapCounter] = useState(0);

  // Whether we are in the break phase
  const [isBreakPhase, setIsBreakPhase] = useState(false);

  // Timeline for logging events
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

  // References to store interval IDs for clearing
  const activeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const breakTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Add an event to the timeline with the current time
  const addTimelineEvent = (event: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTimeline((prev) => [...prev, { time: timeStr, event }]);
  };

  // Start or resume the intubation process
  const handleStartResume = () => {
    if (status === 'IDLE' || status === 'ENDED') {
      // Fresh start
      setStatus('ACTIVE');
      setTimeCounter(120);
      setBreakCounter(10);
      setLapCounter(0);
      setIsBreakPhase(false);
      setTimeline([]);
      addTimelineEvent('CPR Started');
      startActiveTimer();
    } else if (status === 'HOLD') {
      setStatus('ACTIVE');
      addTimelineEvent('CPR Resumed');
      if (isBreakPhase) {
        startBreakTimer();
      } else {
        startActiveTimer();
      }
    }
  };

  // Active timer (120s). When finished, we increment the lap, then go to break.
  const startActiveTimer = () => {
    clearAllIntervals();
    activeTimerRef.current = setInterval(() => {
      setTimeCounter((prev) => {
        if (prev <= 1) {
          // Active phase done
          clearAllIntervals();
          setLapCounter((lap) => lap + 1); // Each 120s = 1 lap
          addTimelineEvent('Completed 120s Lap');
          setTimeCounter(120);
          setIsBreakPhase(true);
          startBreakTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Break timer (10s). When finished, we reset break and go back to active.
  const startBreakTimer = () => {
    clearAllIntervals();
    breakTimerRef.current = setInterval(() => {
      setBreakCounter((prev) => {
        if (prev <= 1) {
          // Break done
          clearAllIntervals();
          addTimelineEvent('Break Ended');
          setBreakCounter(10);
          setIsBreakPhase(false);
          startActiveTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Hold (pause) the process
  const handleHold = () => {
    if (status === 'ACTIVE') {
      setStatus('HOLD');
      addTimelineEvent('Hold CPR');
      clearAllIntervals();
    }
  };

  // Skip button to skip the remaining break time
  const handleSkipBreak = () => {
    if (isBreakPhase && status === 'ACTIVE') {
      clearAllIntervals();
      addTimelineEvent('Break Skipped');
      setBreakCounter(10);
      setIsBreakPhase(false);
      setTimeCounter(120);
      startActiveTimer();
    }
  };

  // ROSC ends the CPR
  const handleROSC = () => {
    if (status !== 'ENDED' && status !== 'IDLE') {
      setStatus('ENDED');
      addTimelineEvent('ROSC - CPR Ended');
      clearAllIntervals();
    }
  };

  // Pronounce Dead ends the CPR
  const handlePronounceDead = () => {
    if (status !== 'ENDED' && status !== 'IDLE') {
      setStatus('ENDED');
      addTimelineEvent('Patient Pronounced Dead');
      clearAllIntervals();
    }
  };

  // Refresh resets everything to default
  const handleRefresh = () => {
    clearAllIntervals();
    setStatus('IDLE');
    setTimeCounter(120);
    setBreakCounter(10);
    setLapCounter(0);
    setIsBreakPhase(false);
    setTimeline([]);
  };

  // Clear any existing intervals
  const clearAllIntervals = () => {
    if (activeTimerRef.current) clearInterval(activeTimerRef.current);
    if (breakTimerRef.current) clearInterval(breakTimerRef.current);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllIntervals();
    };
  }, []);

  // Buttons get disabled if CPR is ended or not started
  const canAct = status !== 'ENDED' && status !== 'IDLE';

  return (
    <div className="manual-intubated-container">
      <h2 className="manual-intubated-title">Manual CPR with Intubation</h2>

      <div className="intubated-controls">
        <button onClick={handleStartResume} className="start-button">
          {status === 'IDLE' || status === 'ENDED'
            ? 'Start'
            : status === 'HOLD'
            ? 'Resume'
            : 'Running'}
        </button>
        <button
          onClick={handleHold}
          className="hold-button"
          disabled={status !== 'ACTIVE'}
        >
          Hold
        </button>
        <button
          onClick={handleROSC}
          className="rosc-button"
          disabled={!canAct}
        >
          ROSC
        </button>
        <button
          onClick={handlePronounceDead}
          className="dead-button"
          disabled={!canAct}
        >
          Pronounce Dead
        </button>
        <button onClick={handleRefresh} className="refresh-button">
          Refresh
        </button>
      </div>

      {/* Counters */}
      <div className="counters-container">
        <div className="counter">Time: {timeCounter}s</div>
        <div className="counter">Break: {breakCounter}s</div>
        <div className="counter">Lap: {lapCounter}</div>
        {/* Skip button only if in break phase and active */}
        {isBreakPhase && status === 'ACTIVE' && (
          <button onClick={handleSkipBreak} className="skip-button">
            Skip
          </button>
        )}
      </div>

      {/* Timeline */}
      <div className="timeline-container">
        {timeline.map((evt, i) => (
          <div key={i} className="timeline-event">
            <span className="event-time">{evt.time}</span> -{' '}
            <span className="event-text">{evt.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManualIntubated;
