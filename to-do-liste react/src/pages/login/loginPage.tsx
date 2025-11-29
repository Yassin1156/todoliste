import { Link, useNavigate } from "react-router-dom";
import type { LoginPageProps } from "../../types";
import api from "../../api/client";
import "./loginPage.css";


export function LoginPage({
  userName,
  setUserName,
  password,
  setPassword,
  onLoginSuccess,
}: LoginPageProps) {
  const navigate = useNavigate();

  

async  function loginAccount() {
    try {
      const res = await api.post("/auth/login", {
        userName,
        password,
      });
      const { accountId } = res.data;
      onLoginSuccess(accountId, userName);


      console.log("Erfolgreich eingeloggt:", res.data);
      navigate("/todo");
    } catch (error) {
      console.error("Fehler beim Einloggen:", error);
      alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    }
    setPassword("");
  }
  

  return (
    <>
      <title>Login Page</title>

      
      
      <div className="login-container">
        <h1>Login</h1>
        <div className="email-container">
          <p className="text-p">
            Benutzernamen: 
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
          <p className="text-p">
            Passwort:
          </p>
          <p>
            <input
              type="password"
              placeholder="*******"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
        </div>

        <button onClick={loginAccount}>Einloggen</button>

        <p>
          Noch keinen Account? Dann klicken sie auf {""}
          <Link to="/registration">jetzt registrieren</Link>
        </p>
      </div>
    </>
  );
}
