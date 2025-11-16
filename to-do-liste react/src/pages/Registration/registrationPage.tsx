import { Link, useNavigate } from "react-router-dom";
import type { RegistrationPageProps } from "../../types";
import "../login/loginPage.css";



export function RegistrationPage({
  accounts,
  setAccounts,
  setCurrentAccountIndex,
  userName,
  setUserName,
  password,
  setPassword,
}: RegistrationPageProps) {
  const navigate = useNavigate();

  const addAccount = () => {
    const accountIndex = accounts.findIndex((a) => a.userName === userName);

    if (accountIndex >= 0) {
      alert("Es existiert bereits ein Account mit dieser Email");
    } else {
      setAccounts((account) => {
        const updatedAccounts =[...account, { id: crypto.randomUUID(), userName, password, projects: [] }];
        setCurrentAccountIndex(updatedAccounts.length - 1);
        return updatedAccounts;
      });
      console.log("Account erstellt");
      navigate("/");
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
