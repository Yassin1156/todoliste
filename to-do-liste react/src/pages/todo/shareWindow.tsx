import type { ShareWindowProps } from "../../types";
import "./shareWindow.css";

export function ShareWindow({
  isShareWindowOpen,
  setIsShareWindowOpen,
}: ShareWindowProps) {
  return (
    <>
      {isShareWindowOpen && (
        <div className="share-window-overlay">
          <div className="share-window">
            <h2>Teile dein Projekt:</h2>
            <p>Link zum Teilen:</p>
            <button
              onClick={() => setIsShareWindowOpen(false)}
            >Schließen</button>
          </div>
        </div>
      )}
    </>
  );
}