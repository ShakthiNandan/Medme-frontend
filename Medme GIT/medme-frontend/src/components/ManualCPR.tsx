// src/components/ManualCPR.tsx
import React, { useState, useEffect, useRef } from 'react';
import './ManualCPR.css';

interface TimelineEvent {
  time: string;
  event: string;
}

type CPRStatus = 'NOT_STARTED' | 'ACTIVE' | 'HOLD' | 'ENDED';

const ManualCPR: React.FC = () => {
  const [cprStatus, setCprStatus] = useState<CPRStatus>('NOT_STARTED');
  const [timeCounter, setTimeCounter] = useState<number>(30);  // 30s compressions
  const [breakCounter, setBreakCounter] = useState<number>(5); // 5s break
  const [isInBreak, setIsInBreak] = useState<boolean>(false);

  const [cycleCount, setCycleCount] = useState<number>(0);
  const [lapCount, setLapCount] = useState<number>(0);

  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

  // For Pronounce Dead confirmation
  const [showDeadModal, setShowDeadModal] = useState(false);

  // For Pulse Check pop-up after 5 laps
  const [showPulseCheck, setShowPulseCheck] = useState(false);
  const [pulseCheckCounter, setPulseCheckCounter] = useState<number>(10);
  const [isPulseChecking, setIsPulseChecking] = useState<boolean>(false);

  // We use a ref to store the interval ID so we can clear it when we hold/end
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Utility: Log an event with current time
  const addEvent = (event: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTimeline((prev) => [...prev, { time: timeStr, event }]);
  };

  // Start the main CPR timer
  const startCPR = () => {
    setCprStatus('ACTIVE');
    addEvent('CPR Started');
    startTimer();
  };

  // Hold/Resume logic
  const handleHoldResume = () => {
    if (cprStatus === 'ACTIVE') {
      // HOLD
      setCprStatus('HOLD');
      addEvent('Hold CPR');
      stopTimer();
    } else if (cprStatus === 'HOLD') {
      // RESUME
      setCprStatus('ACTIVE');
      addEvent('CPR Resumed');
      // Per requirements: "After resuming from hold, start timer from default"
      // If you need to *resume from where it left off*, remove the next two lines:
      setTimeCounter(30);
      setBreakCounter(5);
      setIsInBreak(false);
      startTimer();
    }
  };

  // ROSC
  const handleROSC = () => {
    if (cprStatus !== 'ENDED') {
      setCprStatus('ENDED');
      addEvent('ROSC');
      stopTimer();
      // This fully resets CPR
    }
  };

  // Pronounce Dead
  const handlePronounceDead = () => {
    setShowDeadModal(true);
  };
  const confirmDead = () => {
    setShowDeadModal(false);
    if (cprStatus !== 'ENDED') {
      setCprStatus('ENDED');
      addEvent('Patient Pronounced Dead');
      stopTimer();
    }
  };
  const cancelDead = () => {
    setShowDeadModal(false);
  };

  // Refresh => resets everything
  const handleRefresh = () => {
    stopTimer();
    setCprStatus('NOT_STARTED');
    setTimeCounter(30);
    setBreakCounter(5);
    setIsInBreak(false);
    setCycleCount(0);
    setLapCount(0);
    setTimeline([]);
    setShowDeadModal(false);
    setShowPulseCheck(false);
    setPulseCheckCounter(10);
    setIsPulseChecking(false);
  };

  // Start the 1-second interval
  const startTimer = () => {
    if (intervalRef.current) return; // already running
    intervalRef.current = setInterval(tick, 1000);
  };

  // Stop the interval
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // The main tick logic
  const tick = () => {
    // Only run if CPR is ACTIVE
    if (cprStatus !== 'ACTIVE') return;

    if (!isInBreak) {
      // Decrement the 30s counter
      setTimeCounter((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // TimeCounter reached 0 => switch to break
          setIsInBreak(true);
          return 30; // reset to default for next round
        }
      });
    } else {
      // We are in the 5s break
      setBreakCounter((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Break ended => cycleCount++
          const newCycle = cycleCount + 1;
          setCycleCount(newCycle);
          // If 5 cycles => lap++
          if (newCycle >= 5) {
            setCycleCount(0);
            setLapCount((l) => l + 1);
          }
          // Reset break => exit break => back to timeCounter
          setIsInBreak(false);
          return 5;
        }
      });
    }
  };

  // Pulse Check Logic => after 5 laps, show a 10-second pulse check pop-up
  // (This is a simplified example: you might do it after every 5 laps, etc.)
  useEffect(() => {
    if (lapCount > 0 && lapCount % 5 === 0 && !isPulseChecking && cprStatus === 'ACTIVE') {
      // Show the pulse check pop-up
      setShowPulseCheck(true);
      setIsPulseChecking(true);
    }
  }, [lapCount, cprStatus, isPulseChecking]);

  // If we are showing the pulse check, do a 1-second countdown
  useEffect(() => {
    let pulseTimer: NodeJS.Timeout | null = null;

    if (showPulseCheck) {
      pulseTimer = setInterval(() => {
        setPulseCheckCounter((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            // Pulse check done => close pop-up
            setShowPulseCheck(false);
            setPulseCheckCounter(10);
            return 10;
          }
        });
      }, 1000);
    }

    return () => {
      if (pulseTimer) clearInterval(pulseTimer);
    };
  }, [showPulseCheck]);

  const skipPulseCheck = () => {
    setShowPulseCheck(false);
    setPulseCheckCounter(10);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      stopTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="manual-cpr-container">
      <h2 className="manual-cpr-title">Manual CPR</h2>

      <div className="cpr-main-content">
        {/* Left side: timeline */}
        <div className="cpr-timeline">
          <h4>Timeline</h4>
          <div className="timeline-events">
            {timeline.map((evt, idx) => (
              <div key={idx} className="timeline-event">
                <span className="event-time">{evt.time}</span> - <span className="event-text">{evt.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: controls */}
        <div className="cpr-controls">
          <div className="cpr-buttons">
            {/* Start/Hold/Resume */}
            {cprStatus === 'NOT_STARTED' && (
              <button className="start-button" onClick={startCPR}>
                START
              </button>
            )}
            {(cprStatus === 'ACTIVE' || cprStatus === 'HOLD') && (
              <button className="hold-button" onClick={handleHoldResume}>
                {cprStatus === 'ACTIVE' ? 'HOLD' : 'RESUME'}
              </button>
            )}
            {/* ROSC */}
            {cprStatus !== 'NOT_STARTED' && cprStatus !== 'ENDED' && (
              <button className="rosc-button" onClick={handleROSC}>
                ROSC
              </button>
            )}
            {/* Pronounce Dead */}
            {cprStatus !== 'NOT_STARTED' && cprStatus !== 'ENDED' && (
              <button className="dead-button" onClick={handlePronounceDead}>
                Pronounce Dead
              </button>
            )}
            {/* Refresh */}
            <button className="refresh-button" onClick={handleRefresh}>
              REFRESH
            </button>
          </div>

          {/* Counters */}
          <div className="cpr-counters">
            <div className="counter-row">
              <label>Time Counter</label>
              <span className="counter-value">{timeCounter}</span>
            </div>
            <div className="counter-row">
              <label>Break/Breath</label>
              <span className="counter-value">{breakCounter}</span>
            </div>
            <div className="counter-row">
              <label>Cycle</label>
              <span className="counter-value">{cycleCount}</span>
            </div>
            <div className="counter-row">
              <label>Lap</label>
              <span className="counter-value">{lapCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pronounce Dead Modal */}
      {showDeadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure?</h3>
            <div className="modal-buttons">
              <button onClick={confirmDead} className="yes-button">Yes</button>
              <button onClick={cancelDead} className="no-button">No</button>
            </div>
          </div>
        </div>
      )}

      {/* Pulse Check Pop-up after 5 laps (example) */}
      {showPulseCheck && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Pulse Check Time: {pulseCheckCounter}s</h3>
            <p>Check pulse or skip to continue CPR.</p>
            <div className="modal-buttons">
              <button className="yes-button" disabled={pulseCheckCounter <= 0}>
                Wait
              </button>
              <button className="no-button" onClick={skipPulseCheck}>
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualCPR;
