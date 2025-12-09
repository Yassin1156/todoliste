import { useState } from "react";
import api from "../../api/client";
import "./shareWindow.css";

type ShareWindowProps = {
  isShareWindowOpen: boolean;
  setIsShareWindowOpen: (open: boolean) => void;
  shareLink: string;
  projectId?: string;
};

export function ShareWindow({
  isShareWindowOpen,
  setIsShareWindowOpen,
  shareLink,
  projectId,
}: ShareWindowProps) {
  const [targetUserName, setTargetUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isShareWindowOpen) {
    return null;
  }

  const handleClose = () => {
    setIsShareWindowOpen(false);
    setMessage(null);
    setError(null);
    setTargetUserName("");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setMessage("Link wurde in die Zwischenablage kopiert.");
      setError(null);
    } catch {
      setError("Konnte den Link nicht kopieren.");
      setMessage(null);
    }
  };

  const handleShare = async () => {
    if (!projectId) {
      setError("Projekt-ID fehlt. Bitte Seite neu laden.");
      setMessage(null);
      return;
    }

    if (!targetUserName.trim()) {
      setError("Bitte einen Benutzernamen eingeben.");
      setMessage(null);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      await api.post(`/projects/${projectId}/share`, {
        targetUserName: targetUserName.trim(),
      });

      setMessage(`Projekt wurde mit "${targetUserName.trim()}" geteilt.`);
      setError(null);
      setTargetUserName("");
    } catch (err) {
      console.error("Fehler beim Teilen des Projekts:", err);
      setError(
        "Fehler beim Teilen des Projekts. Nutzer existiert nicht oder Serverfehler."
      );
      setMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="share-overlay">
      <div className="share-modal">
        <div className="share-header">
          <h2>Projekt teilen</h2>
          <button className="share-close-button" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="share-section">
          <label>Projekt-Link</label>
          <div className="share-link-row">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="share-link-input"
            />
            <button onClick={handleCopyLink} className="share-copy-button">
              Kopieren
            </button>
          </div>
        </div>

        <div className="share-section">
          <label>Mit Benutzer teilen (Benutzername)</label>
          <input
            type="text"
            placeholder="z. B. max123"
            value={targetUserName}
            onChange={(e) => setTargetUserName(e.target.value)}
            className="share-username-input"
          />
          <button
            onClick={handleShare}
            disabled={isSubmitting}
            className="share-submit-button"
          >
            {isSubmitting ? "Teile..." : "Zugriff geben"}
          </button>
        </div>

        {message && <div className="share-message success">{message}</div>}
        {error && <div className="share-message error">{error}</div>}
      </div>
    </div>
  );
}
