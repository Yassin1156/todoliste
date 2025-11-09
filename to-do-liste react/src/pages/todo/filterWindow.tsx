import { useState } from "react";
import type { FilterWindowProps } from "../../types";
import "./filterWindow.css";

type FilterKey = "erledigt" | "nichterledigt" | "fällig";

export function FilterWindow(
  { isFilterWindowOpen, setIsFilterWindowOpen }: FilterWindowProps
) {

  const [selected, setSelected] = useState<FilterKey | null>(null);

  const toggle = (key:FilterKey) => {
    setSelected(k => (k === key ? null : key));
  };

  return(
    <>
      {isFilterWindowOpen && (
        <div className="filter-window-overlay">
          <div className="filter-window">
            <h2>Filter Optionen</h2>
            <div className="filter-optionen">
              <ul>
                <li>
                  <input type="checkbox"
                    checked={selected === "erledigt"}
                    onChange={() => toggle("erledigt")}
                  />
                  Erledigt 
                </li>
                <li>
                  <input type="checkbox"
                    checked={selected === "nichterledigt"}
                    onChange={() => toggle("nichterledigt")}
                  />
                  Nicht Erledigt
                </li>
                <li>
                  <input type="checkbox"
                    checked={selected === "fällig"}
                    onChange={() => toggle("fällig")}
                  />
                  Jetzt fällig
                </li>
              </ul>
            </div>
            <button onClick={() => setIsFilterWindowOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}