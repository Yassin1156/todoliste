import { Link, useNavigate } from "react-router-dom";
import type { RegistrationPageProps } from "../../types";



export function RegistrationPage({
  accounts,
  setAccounts,
  setCurrentAccountIndex,
  email,
  setEmail,
  password,
  setPassword,
}: RegistrationPageProps) {
  const navigate = useNavigate();

  const addAccount = () => {
    const accountIndex = accounts.findIndex((a) => a.email === email);

    if (accountIndex >= 0) {
      alert("Es existiert bereits ein Account mit dieser Email");
    } else {
      setAccounts((account) => {
        const updatedAccounts =[...account, { email, password, projects: [] }];
        setCurrentAccountIndex(updatedAccounts.length - 1);
        return updatedAccounts;
      });
      console.log("Account erstellt");
      navigate("/todo");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <title>Registration Page</title>

      <h1>Hier registrieren</h1>

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

      <button onClick={addAccount}>Registrieren</button>

      <p>
        Schon einen Account? Dann hier <Link to="/">einloggen</Link>
      </p>
    </>
  );
}
