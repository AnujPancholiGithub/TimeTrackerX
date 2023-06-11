import React, { useEffect, useState } from "react";
import "./tester.css";

const Widget = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [widgetPosition, setWidgetPosition] = useState({ x: 50, y: 50 });
  const [screenTime, setScreenTime] = useState(0);
  const [lastInputTime, setLastInputTime] = useState(Date.now());
  const [isIdle, setIsIdle] = useState(false); // New state for idle indicator

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isIdle) {
        // Update screen time only if not idle
        setScreenTime((prevScreenTime) => prevScreenTime + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isIdle]);

  useEffect(() => {
    const idleThreshold = 60 * 1000; // 1 minute of inactivity

    const handleIdleState = () => {
      setIsIdle(true); // Set idle state
    };

    const handleActiveState = () => {
      setIsIdle(false); // Set active state
    };

    const handleUserActivity = () => {
      setLastInputTime(Date.now());
    };

    const checkIdleState = () => {
      const idleTime = Date.now() - lastInputTime;

      if (idleTime >= idleThreshold && !isIdle) {
        handleIdleState();
      } else if (idleTime < idleThreshold && isIdle) {
        handleActiveState();
      }
    };

    const activityEvents = [
      "mousedown",
      "mousemove",
      "keydown",
      "keyup",
      "wheel",
      "touchstart",
      "touchend",
    ];

    const addActivityListeners = () => {
      activityEvents.forEach((event) => {
        document.addEventListener(event, handleUserActivity);
      });
      window.addEventListener("touchstart", handleUserActivity, {
        passive: true,
      });
      window.addEventListener("touchend", handleUserActivity, {
        passive: true,
      });
    };

    const removeActivityListeners = () => {
      activityEvents.forEach((event) => {
        document.removeEventListener(event, handleUserActivity);
      });
    };

    const checkIdleTimer = setInterval(checkIdleState, 1000);

    addActivityListeners();

    return () => {
      clearInterval(checkIdleTimer);
      removeActivityListeners();
    };
  }, [lastInputTime, isIdle]);

  function formatScreenTime(seconds) {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const formattedTime = (seconds % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${formattedTime}`;
  }

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setDragOffset({
      x: event.clientX - widgetPosition.x,
      y: event.clientY - widgetPosition.y,
    });
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    setWidgetPosition({
      x: event.clientX - dragOffset.x,
      y: event.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`widget ${isIdle ? "idle" : ""}`} // Add "idle" class when idle
      style={{ top: widgetPosition.y, left: widgetPosition.x }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="content">
        <p>Total Screen Time: {formatScreenTime(screenTime)}</p>
      </div>
    </div>
  );
};

export default Widget;
