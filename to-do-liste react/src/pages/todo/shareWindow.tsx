import type { ShareWindowProps } from "../../types";
import "./shareWindow.css";

export function ShareWindow({
  isShareWindowOpen,
  setIsShareWindowOpen,
  shareLink
}: ShareWindowProps) {
  return (
    <>
      {isShareWindowOpen && (
        <div className="share-window-overlay">
          <div className="share-window">
            <h2>Teile dein Projekt:</h2>
            <p>{shareLink}</p>
            <button
              onClick={() => setIsShareWindowOpen(false)}
            >Schließen</button>
          </div>
        </div>
      )}
    </>
  );
}