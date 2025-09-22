import "./App.css";
import { LoginPage } from "./pages/login/loginPage";
import { Route, Routes } from "react-router-dom";
import { TodoPage } from "./pages/todo/todoPage";
import { useState, useEffect } from "react";
import { RegistrationPage } from "./pages/Registration/registrationPage";
import type { Account } from "./types";

function App() {
  const [accounts, setAccounts] = useState<Account[]>(
    JSON.parse(localStorage.getItem("accounts") || "[]")
  );

  const [currentAccountIndex, setCurrentAccountIndex] = useState<number>(
    Number(localStorage.getItem("currentAccountIndex")) || 0
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem(
      "currentAccountIndex",
      JSON.stringify(currentAccountIndex)
    );
    console.log("Daten im localStorage gespeichert");
  }, [accounts, currentAccountIndex]);

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <LoginPage
              accounts={accounts}
              setCurrentAccountIndex={setCurrentAccountIndex}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/todo"
          element={<TodoPage accounts={accounts} setAccounts={setAccounts} currentAccountIndex={currentAccountIndex} />}
        />
        <Route
          path="/registration"
          element={
            <RegistrationPage
              accounts={accounts}
              setAccounts={setAccounts}
              setCurrentAccountIndex={setCurrentAccountIndex}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
