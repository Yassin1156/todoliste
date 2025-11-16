import type { FilterWindowProps} from "../../types";
import "./filterWindow.css";



export function FilterWindow(
  { 
    isFilterWindowOpen, setIsFilterWindowOpen, selected, setSelected 
  }: FilterWindowProps
) {



  return(
    <>
      {isFilterWindowOpen && (
        <div className="filter-window-overlay">
          <div className="filter-window">
            <h2>Filter Optionen</h2>
            <div className="filter-optionen">
              <ul>
                <li>
                  <input type="radio"
                    checked={selected === "alle"}
                    onChange={() => setSelected("alle")}
                  />
                  Alle
                </li>
                <li>
                  <input type="radio"
                    checked={selected === "erledigt"}
                    onChange={() => setSelected("erledigt")}
                  />
                  Erledigt 
                </li>
                <li>
                  <input type="radio"
                    checked={selected === "nichterledigt"}
                    onChange={() => setSelected("nichterledigt")}
                  />
                  Nicht Erledigt
                </li>
                <li>
                  <input type="radio"
                    checked={selected === "faellig"}
                    onChange={() => setSelected("faellig")}
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