import { Link, useNavigate } from "react-router-dom";
import type { LoginPageProps } from "../../types";
import "./loginPage.css";


export function LoginPage({
  accounts,
  setCurrentAccountIndex,
  userName,
  setUserName,
  password,
  setPassword,
}: LoginPageProps) {
  const navigate = useNavigate();

  

  function loginAccount() {
    const accountIndex = accounts.findIndex((a) => a.userName === userName);

    if (accountIndex !== -1) {
      setCurrentAccountIndex(accountIndex);
      if (password === accounts[accountIndex].password) {
        console.log("Erfolgreich eingeloggt");
        navigate("/todo");
      } else {
        alert("Falsches Passwort");
      }
    } else{alert("Es existiert kein Account mit diesem Benutzernamen");}
    setUserName("");
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
