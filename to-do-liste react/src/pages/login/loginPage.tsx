import { Link, useNavigate } from "react-router-dom";
import type { LoginPageProps } from "../../types";
import "./loginPage.css";


export function LoginPage({
  accounts,
  setCurrentAccountIndex,
  email,
  setEmail,
  password,
  setPassword,
}: LoginPageProps) {
  const navigate = useNavigate();

  

  function loginAccount() {
    const accountIndex = accounts.findIndex((a) => a.email === email);

    if (accountIndex !== -1) {
      setCurrentAccountIndex(accountIndex);
      if (password === accounts[accountIndex].password) {
        console.log("Erfolgreich eingeloggt");
        navigate("/todo");
      } else {
        alert("Falsches Passwort");
      }
    } else{alert("Es existiert kein Account mit dieser Email");}
    setEmail("");
    setPassword("");
  }
  

  return (
    <>
      <title>Login Page</title>

      <h1>Hier einloggen</h1>

      <div className="email-container">
        <p>
          email:{" "}
          <input
            type="email"
            placeholder="Bitte Email eingeben"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
      </div>

      <div className="password-container">
        <p>
          password:{" "}
          <input
            type="password"
            placeholder="Bitte password eingeben"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
      </div>

      <button onClick={loginAccount}>Einloggen</button>

      <p>
        Noch keinen Account? Dann klicken sie auf{" "}
        <Link to="/registration">jetzt registrieren</Link>
      </p>
    </>
  );
}
