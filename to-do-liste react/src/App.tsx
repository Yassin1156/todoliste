import "./App.css";
import { LoginPage } from "./pages/login/loginPage";
import { Route, Routes } from "react-router-dom";
import { TodoPage } from "./pages/todo/todoPage";
import { useState, useEffect } from "react";
import { RegistrationPage } from "./pages/Registration/registrationPage";
import { ProjectPage } from "./pages/todo/projectPage";
import api from "./api/client";




function App() {
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [accountId, setAccountId] = useState<string | null>(() =>
    localStorage.getItem("accountId")
  );

  const [userName, setUserName] = useState<string>(() =>
    localStorage.getItem("userName") || ""
  );
  const [password, setPassword] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isProjectSelected, setIsProjectSelected] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("accountId");
    localStorage.removeItem("userName");
    setAccountId(null);
    setProjects([]);
    setUserName("");
    setPassword("");
     
  };

  useEffect(() => {
    if (!accountId) {
      setProjects([]);
      return;
    }
    
    async function fetchProjects() {
      try {
        const res = await api.get("/projects", {
          params: { accountId },
        });
        setProjects(res.data);
      } catch (error) {
        console.error("Fehler beim Laden der Projekte:", error);
      }
    }
    fetchProjects();
  }, [accountId]);


  return (
    <>
      <Routes>
        <Route
          index
          element={
            <LoginPage
              userName={userName}
              setUserName={setUserName}
              password={password}
              setPassword={setPassword}
              onLoginSuccess={(accountId: string, userName: string) => {
                localStorage.setItem("accountId", accountId);
                localStorage.setItem("userName", userName);
                setAccountId(accountId);
                setUserName(userName);
              }}
            />
          }
        />
        <Route
          path="/todo"
          element={
            <TodoPage
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              isProjectSelected={isProjectSelected}
              setIsProjectSelected={setIsProjectSelected}
              currentProjectIndex={currentProjectIndex}
              setCurrentProjectIndex={setCurrentProjectIndex}
              projects={projects}
              setProjects={setProjects}
              userName={userName}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={
            <ProjectPage
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              setIsProjectSelected={setIsProjectSelected}
              currentProjectIndex={currentProjectIndex}
              setCurrentProjectIndex={setCurrentProjectIndex}
              projects={projects}
              setProjects={setProjects}
              userName={userName}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/registration"
          element={
            <RegistrationPage
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
