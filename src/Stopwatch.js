import { useState, useEffect } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  // Formatting time (hh:mm:ss:ms)
  const formattedTime = () => {
    const hours = Math.floor(time / 3600000)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600000) / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="container">
      <h1 className="title">⏱️Stopwatch</h1>
      <h2 className="timer">{formattedTime()}</h2>

      <div className="buttons">
        <button className="btn start" onClick={handleStartStop}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="btn stop" onClick={() => setIsRunning(false)}>
          Stop
        </button>
        <button className="btn reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
