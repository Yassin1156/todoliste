import type { SetTimeWindowProps } from "../../types";
import "./setTimeWindow.css";

export function SetTimeWindow({
  isTimeWindowOpem,
  setIsTimeWindowOpen,
  addTodo,
  minutes,
  hours,
  setMinutes,
  setHours
}: SetTimeWindowProps) {
  return (
    <>
      {isTimeWindowOpem && (
        <div className="time-window-overlay">
          <div className="time-window">
            <h2>Setze eine Erinnerung:</h2>
            <p>
              H:
              <input className="time-input" type="number" min="0" max="23"
                value={hours}
                onChange={(e) =>setHours(e.target.value) }
              />
              Min:
              <input className="time-input" type="number" min="0" max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </p>
            <p>
              <button onClick={() => setIsTimeWindowOpen(false)}>Close</button>
              <button onClick={addTodo}>Speichern</button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
