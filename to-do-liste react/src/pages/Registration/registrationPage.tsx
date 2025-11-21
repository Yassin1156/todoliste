import { Link, useNavigate } from "react-router-dom";
import type { RegistrationPageProps } from "../../types";
import api from "../../api/client";
import "../login/loginPage.css";



export function RegistrationPage({
  userName,
  setUserName,
  password,
  setPassword,
}: RegistrationPageProps) {
  const navigate = useNavigate();

  const addAccount = async () => {
    try {
      const res = await api.post("/auth/register", {
        userName,
        password,
      });
      console.log("Erfolgreich registriert:", res.data);
      navigate("/");

    } catch (error) {
      console.error("Fehler bei der Registrierung:", error);
      alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    }
    setUserName("");
    setPassword("");
  };

  return (
    <>
      <title>Registration Page</title>
      <div className="login-container">
        <h1>Registration</h1>
        <div className="email-container">
          <p>
            Benutzername:
          </p>
          <p>
            <input
              type="text"
              placeholder="Bitte den Benutzernamen eingeben"
              id="email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </p>
        </div>

        <div className="password-container">
          <p>
            Passwort:
          </p>
          <p>
            <input
              type="password"
              placeholder="********"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
        </div>

        <button onClick={addAccount}>Registrieren</button>

        <p>
          Schon einen Account? Dann hier <Link to="/">einloggen</Link>
        </p>
      </div>
    </>
  );
}
