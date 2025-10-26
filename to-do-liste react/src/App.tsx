import "./App.css";
import { LoginPage } from "./pages/login/loginPage";
import { Route, Routes } from "react-router-dom";
import { TodoPage } from "./pages/todo/todoPage";
import { useState, useEffect } from "react";
import { RegistrationPage } from "./pages/Registration/registrationPage";
import type { Account } from "./types";
import { ProjectPage } from "./pages/todo/projectPage";


function App() {
  const [accounts, setAccounts] = useState<Account[]>(
    JSON.parse(localStorage.getItem("accounts") || "[]")
  );

  const [currentAccountIndex, setCurrentAccountIndex] = useState<number>(
    Number(localStorage.getItem("currentAccountIndex")) || 0
  );

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isProjectSelected, setIsProjectSelected] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  

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
              userName={userName}
              setUserName={setUserName}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/todo"
          element={<TodoPage accounts={accounts} setAccounts={setAccounts} currentAccountIndex={currentAccountIndex} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isProjectSelected={isProjectSelected} setIsProjectSelected={setIsProjectSelected} currentProjectIndex={currentProjectIndex} setCurrentProjectIndex={setCurrentProjectIndex} />}
         />
        <Route
          path="/todo/:id"
          element={<ProjectPage accounts={accounts} setAccounts={setAccounts} currentAccountIndex={currentAccountIndex} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}  setIsProjectSelected={setIsProjectSelected} currentProjectIndex={currentProjectIndex} setCurrentProjectIndex={setCurrentProjectIndex}  />}
        />
        <Route
          path="/registration"
          element={
            <RegistrationPage
              accounts={accounts}
              setAccounts={setAccounts}
              setCurrentAccountIndex={setCurrentAccountIndex}
              userName={userName}
              setUserName={setUserName}
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
